"use client"

import { useFriendRequests } from '@/(aurora)/_hooks/FriendRequests/useFriendRequests';
import { useUsers } from '@/(aurora)/_hooks/Users/useUsers';
import { CreateFriendRequestsInput, UsersConnection, FriendRequestStatus } from '@/_lib/graphql/API';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { v4 as uuidv4 } from "uuid";


export function CreateFriendRequestForm({senderId, senderName}:{senderId:string, senderName:string}) {
  const [users, setUsers] = useState<UsersConnection|null|undefined>();
  const [username, setUsername] = useState<string>('');

  const { searchUsers,loading } = useUsers();
  const { addFriendRequest } = useFriendRequests();
  const search = useDebouncedCallback((username:string) => {
    console.log('search', senderName);
    searchUsers({username, ne:senderName, limit:10}).then(setUsers);
  }, 300);

  const handleSearch = async (username: string) => {
    setUsername(username);
    search(username);
  };
  const handleSubmit = async () => {
    const user = users?.items?.find((user) => user?.username === username);
    if(!user) return;
    const requestId = uuidv4();
    const input:CreateFriendRequestsInput = {
      requestId,
      receiverId: user.sub!,
      senderId,
      senderProfileId: "profileId",
      status: FriendRequestStatus.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    if(await addFriendRequest(input)!=null) {
      setUsername('');
      setUsers(null);
    }else{
    }
  };
  return (
    <div className="">
      <h1>フレンドリクエスト</h1>
      <input
        type="text"
        placeholder="ユーザー名"
        onChange={(e) => handleSearch(e.target.value)}
        value={username}
      />
      <button onClick={handleSubmit}>送信</button>
      {users && !loading && (
        <ul>
          {users.items!.map((user) => (
            <li key={user!.sub} onClick={()=>handleSearch(user!.username)}>{user!.username}</li>
          ))}
        </ul>
      )}
    </div>
  )
}