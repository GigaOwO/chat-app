'use client';

import { Button } from '@/_components/ui/button';
import { useFriendRequests } from '@/_lib/hooks/useFriendRequests';
import { useUsers } from '@/_lib/hooks/useUsers';
import { Alert, AlertDescription } from '@/_components/ui/alert';
import {
  CreateFriendRequestsInput,
  UsersConnection,
  FriendRequestStatus,
  Profiles,
} from '@/_lib/graphql/API';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { v4 as uuidv4 } from "uuid";
import { useProfiles } from '@/_lib/hooks/useProfiles';

interface CreateFriendRequestFormProps {
  senderId: string;
}

export function CreateFriendRequestForm({
  senderId,
}: CreateFriendRequestFormProps) {
  const [users, setUsers] = useState<UsersConnection|null|undefined>();
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [profiles, setProfiles] = useState<Profiles[]>([]);
  const [selectedProfileId, setSelectedProfileId] = useState<string>("");
  const { searchUsersByUsername: searchUsers } = useUsers();
  const { addFriendRequest } = useFriendRequests();
  const { fetchProfilesByUserId } = useProfiles();
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const response = await fetchProfilesByUserId(senderId);
        if (response?.items) {
          setProfiles(response.items.filter((p): p is Profiles => p !== null));
        }
      } catch (err) {
        console.error('Error loading profiles:', err);
        setError('プロファイルの読み込みに失敗しました');
      }
    };
    loadProfiles();
  }, [senderId, fetchProfilesByUserId]);
  
  const search = useDebouncedCallback((username: string) => {
    if (username.trim()) {
      searchUsers(username, 10)
        .then(setUsers)
        .catch(() => setError('ユーザーの検索に失敗しました'));
    } else {
      setUsers(null);
    }
  }, 300);

  const handleSearch = (username: string) => {
    setUsername(username);
    setError(null);
    search(username);
  };

  const handleSubmit = async (selectedUsername: string) => {
    if (!selectedProfileId) {
      setError('プロファイルが選択されていません');
      return;
    }

    const user = users?.items?.find((user) => user?.username === selectedUsername);
    if (!user) return;

    try {
      const requestId = uuidv4();
      const input: CreateFriendRequestsInput = {
        requestId,
        receiverId: user.sub!,
        senderId,
        senderProfileId: selectedProfileId,
        status: FriendRequestStatus.PENDING,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const result = await addFriendRequest(input);
      if (result) {
        setUsername('');
        setUsers(null);
        setError(null);
      } else {
        setError('フレンドリクエストの送信に失敗しました');
      }
    } catch (err) {
      setError('フレンドリクエストの送信中にエラーが発生しました' + err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor='searchUser'>ユーザーID</label>
        <input
          type="text"
          placeholder="ユーザー名で検索"
          onChange={(e) => handleSearch(e.target.value)}
          value={username}
          className='bg-gray5 border-gray6 flex h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:bg-gray3'
          id='searchUser'
        />

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
      <div className="space-y-2">
        <h3>自分のプロフィール</h3>
        <select
          className='bg-gray5 border-gray6 outline-none px-3 py-2 rounded-lg w-full border focus:bg-gray3'
          required
          value={selectedProfileId}
          onChange={(e) => setSelectedProfileId(e.target.value)}
        >
          <option
            disabled
            value=""
          >
            割り当てるプロフィールを選択してください
          </option>
          {profiles.map((profile) => (
            <option
              key={profile.profileId}
              value={profile.profileId}
            >
              {profile.name}
            </option>
          ))}
        </select>
      </div>
      <div className="">
        {users && (
          <ul className="space-y-2">
            {users.items!.map((user) => (
              <li
                key={user!.sub}
                className="flex items-center justify-between p-3 rounded-lg bg-gray5 hover:bg-gray3 transition-colors"
              >
                <span>{user!.username}</span>
                <Button
                  size="sm"
                  onClick={() => handleSubmit(user!.username!)}
                >
                  リクエストを送信
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}