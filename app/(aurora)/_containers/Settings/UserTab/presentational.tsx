'use client'

import { useState } from "react";
import { UserContext } from "../../User/context";
export function UserTabPresentation ({user}:{user:UserContext|null;}){
  const [username, setUsername] = useState<string>(user?.username||"");
  const [mode, setMode] = useState<"username"|"mail"|"password">("username");
  switch(mode){
    case "username":
      return (
        <div className="text-white space-y-8">
          <section className="space-y-6">
            <h3 className="text-xl font-medium w-full border-b border-gray1 pb-2">マイアカウント</h3>
            <div className="">
              <h5>ユーザーID</h5>
              <input
                type="text"
                value={username}
                className="outline-none bg-gray5 w-60 px-2 py-1 rounded-md border border-gray6 focus:border-gray1 transition-colors duration-300"
                onChange={(e)=>setUsername(e.target.value)}
              />
            </div>
          </section>
          <section className="space-y-6">
            <h3 className="text-xl font-medium w-full border-b border-gray1 pb-2">アカウントのセキュリティ</h3>
            <div className="flex justify-between items-start mt-6">
              <div className="">
                <h5 className="font-bold text-base">メールアドレス</h5>
                <p className="text-xs leading-4">{user?.mail}</p>
              </div>
              <button
                className="px-3 py-1 border border-gray1 rounded-md hover:bg-gray5 transition-colors duration-200"
                onClick={()=>setMode("mail")}>メールアドレスを変更</button>
            </div>
            <div className="flex justify-between items-start mt-6">
              <div className="">
                <h5 className="font-semibold text-base">パスワード</h5>
                <p className="text-xs">アカウントにログインするためのパスワードを変更します</p>
              </div>
              <button
                className="px-3 py-1 border border-gray1 rounded-md hover:bg-gray5 transition-colors duration-200"
                onClick={()=>setMode("password")}
              >パスワードを変更</button>
            </div>
          </section>
        </div>
      )
    case "mail":
      return <p>mail</p>
    case "password":
      return <p>password</p>
    default:
      return null;
    }
}