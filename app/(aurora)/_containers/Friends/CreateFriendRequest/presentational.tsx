'use client';

import { Input } from '@/_components/ui/input';
import { Button } from '@/_components/ui/button';
import { useFriendRequests } from '@/_lib/hooks/useFriendRequests';
import { useUsers } from '@/_lib/hooks/useUsers';
import { Alert, AlertDescription } from '@/_components/ui/alert';
import { CreateFriendRequestsInput, UsersConnection, FriendRequestStatus } from '@/_lib/graphql/API';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { v4 as uuidv4 } from "uuid";

interface CreateFriendRequestFormProps {
  senderId: string;
  senderName: string;
}

export function CreateFriendRequestForm({ senderId }: CreateFriendRequestFormProps) {
  const [users, setUsers] = useState<UsersConnection|null|undefined>();
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { searchUsersByUsername: searchUsers, loading } = useUsers();
  const { addFriendRequest } = useFriendRequests();

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
    const user = users?.items?.find((user) => user?.username === selectedUsername);
    if (!user) return;

    try {
      const requestId = uuidv4();
      const input: CreateFriendRequestsInput = {
        requestId,
        receiverId: user.sub!,
        senderId,
        senderProfileId: "profileId",
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
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="ユーザー名で検索"
          onChange={(e) => handleSearch(e.target.value)}
          value={username}
        />

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>

      {users && !loading && (
        <ul className="space-y-2">
          {users.items!.map((user) => (
            <li
              key={user!.sub}
              className="flex items-center justify-between p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
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
  );
}