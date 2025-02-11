'use client'

import React, { ChangeEvent, useState } from "react";
import { UserContext } from "../../User/context";
import { LogoutButton } from "@/_components/LogoutButton";
import { updateUserAttributes, UpdateUserAttributesInput, confirmUserAttribute, updatePassword } from "aws-amplify/auth";
import { Button } from "@/_components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useUsers } from "@/_lib/hooks/useUsers";
import { UpdateUsersInput } from "@/_lib/graphql/API";
import { useDebouncedCallback } from "use-debounce";

export function UserTabPresentation ({user,setUser}:{user:UserContext|null,setUser:(user:UserContext)=>void;}){
  const [username, setUsername] = useState<string>(user?.username||"");
  const [newEmail, setNewEmail] = useState<string>(user?.mail||"");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mode, setMode] = useState<"username"|"mail"|"confirmMail"|"password">("username");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [currentPasswordMode, setCurrentPasswordMode] = useState<"password"|"text">("password");
  const [newPasswordMode, setNewPasswordMode] = useState<"password"|"text">("password");
  const [confirmPasswordMode, setConfirmPasswordMode] = useState<"password"|"text">("password");
  const [message, setMessage] = useState<string|null>(null);
  const [isPossibleName, setIsPossibleName] = useState<boolean>(true);
  const { modifyUser } = useUsers();

  const changeUserName = useDebouncedCallback(async () => {
    if(user?.userId === undefined){
      setMessage("user is not found");
      return;
    }
    const input: UpdateUsersInput = {
      sub: user?.userId,
      username,
      updatedAt: new Date().toISOString(),
    }
    const res = await modifyUser(input);
    if(res !== null){
      setMessage(null);
      setIsPossibleName(true);
      setUser({...user,username});

      const input : UpdateUserAttributesInput = {
        userAttributes:{
          preferred_username: username
        }
      }
      await updateUserAttributes(input);
    }else{
      setMessage("ユーザー名は既に使用されています");
      setIsPossibleName(false);
    }
  }, 300);

  const handleChangeUserName = async (e:ChangeEvent<HTMLInputElement>)=>{
    setUsername(e.target.value);
    await changeUserName();
  }

  const handleChangeMail = async (e:React.FormEvent)=>{
    e.preventDefault();
    setIsLoading(true);
    try{
      const input: UpdateUserAttributesInput = {
        userAttributes: {
          email: newEmail
        }
      }
      await updateUserAttributes(input);
      setMessage(null);
      setMode("confirmMail");
    }catch(e){
      setMessage((e as Error).message);
    }
    setIsLoading(false);
  }

  const handleConfirmMail = async (e:React.FormEvent)=>{
    e.preventDefault();
    setIsLoading(true);
    try {
      if(user?.userId === undefined) throw new Error("user is not found");
      await confirmUserAttribute({
        userAttributeKey: 'email',
        confirmationCode: verificationCode
      });
      const input: UpdateUsersInput = {
        sub: user?.userId,
        email: newEmail,
        updatedAt: new Date().toISOString(),
      }
      await modifyUser(input);
      setMode("username");
      setUser({...user,mail:newEmail});
      setVerificationCode("");
      setMessage(null);
    }catch(e){
      setMessage((e as Error).message);
    }
    setIsLoading(false);
  }

  const handleChangePassword = async (e:React.FormEvent)=>{
    e.preventDefault();
    setIsLoading(true);
    try{
      if(newPassword.length==0 || confirmPassword.length==0 || currentPassword.length==0){
        setMessage("パスワードを入力してください");
        setIsLoading(false);
        return;
      }
      if(newPassword !== confirmPassword){
        setMessage("パスワードが一致しません");
        setIsLoading(false);
        return;
      }
      await updatePassword({
        oldPassword: currentPassword,
        newPassword
      });
      setMessage(null);
      setMode("username");
    }catch(e){
      setMessage((e as Error).message);
    }
    setIsLoading(false);
  }

  const onCloseEmailChange = ()=>{
    setMode("username");
    setMessage(null);
  }

  const onCloseConfirmMail = ()=>{
    setMode("mail");
    setMessage(null);
  }

  const onClosePasswordChange = ()=>{
    setMode("username");
    setMessage(null);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  const togglePasswordMode = (mode:"current"|"new"|"confirm")=>{
    switch(mode){
      case "current":
        setCurrentPasswordMode(currentPasswordMode === "password" ? "text" : "password");
        break;
      case "new":
        setNewPasswordMode(newPasswordMode === "password" ? "text" : "password");
        break;
      case "confirm":
        setConfirmPasswordMode(confirmPasswordMode === "password" ? "text" : "password");
        break;
    }
  }

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
                className={`outline-none bg-gray5 w-60 px-2 py-1 rounded-md border transition-colors duration-300 ${isPossibleName ? 'border-green-500' : 'border-red-500'}`}
                onChange={handleChangeUserName}
              />
              <p className="text-sm text-red-500 pt-1 h-5">{message}</p>
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
                onClick={()=>setMode("mail")}
              >
                メールアドレスを変更
              </button>
            </div>
            <div className="flex justify-between items-start mt-6">
              <div className="">
                <h5 className="font-semibold text-base">パスワード</h5>
                <p className="text-xs">アカウントにログインするためのパスワードを変更します</p>
              </div>
              <button
                className="px-3 py-1 border border-gray1 rounded-md hover:bg-gray5 transition-colors duration-200"
                onClick={()=>setMode("password")}
              >
                パスワードを変更
              </button>
            </div>
          </section>
          <LogoutButton />
        </div>
      )
    case "mail":
      return (
        <div className="text-white space-y-8">
          <section className="">
            <div className="flex items-center justify-start">
              <Button
                variant="ghost"
                size="icon"
                onClick={onCloseEmailChange}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-xl font-medium">メールアドレスを変更</h3>
            </div>
            <p className="text-sm text-red-500">{message}</p>
          </section>
          <section className="flex flex-col space-y-3">
            <p>現在のメールアドレス: {user?.mail}</p>
            <label htmlFor="email">新しいメールアドレス</label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="email"
                value={newEmail}
                className="outline-none bg-gray5 w-72 px-2 py-1 rounded-md border border-gray6 focus:border-gray1 transition-colors duration-300"
                onChange={(e)=>setNewEmail(e.target.value)}
              />
              <Button
                type="submit"
                disabled={isLoading}
                className='bg-gray2 hover:bg-gray3'
                onClick={handleChangeMail}
              >
                {isLoading ? '変更...' : '変更'}
              </Button>
            </div>
          </section>
        </div>
      )
    case "confirmMail":
      return (
        <div className="text-white space-y-8">
          <section className="flex items-center justify-start">
            <Button
              variant="ghost"
              size="icon"
              onClick={onCloseConfirmMail}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-xl font-medium">メールアドレスを変更</h3>
          </section>
          <section>
            <label htmlFor="confirmationCode">
              <p><span className="font-bold text-lg">{newEmail}宛に</span>確認メールを送信しました。</p>
              <p>メール内の確認コードを入力してください。</p>
              <p className="h-8 w-full text-sm text-red-500">{message}</p>
            </label>
            <div className="flex flex-col space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="confirmationCode"
                  className="outline-none bg-gray5 w-72 px-2 py-1 rounded-md border border-gray6 focus:border-gray1 transition-colors duration-300"
                  value={verificationCode}
                  onChange={(e)=>setVerificationCode(e.target.value)}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className='bg-gray2 hover:bg-gray3'
                  onClick={handleConfirmMail}
                >
                  {isLoading ? '確認中...' : '確認'}
                </Button>
              </div>
            </div>
          </section>
          <section>
            <p className="text-sm text-red-700">この画面を離れると、再度戻ることはできません。</p>
            <p className="text-sm text-red-700">メールアドレスを変更するには、もう一度同じメールアドレスを入力し、変更手続きをやり直してください。</p>
          </section>
        </div>
      )
    case "password":
      return (
        <div className="text-white space-y-8">
          <section>
            <div className="flex items-center justify-start">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClosePasswordChange}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-xl font-medium">パスワードを変更</h3>
            </div>
            <p className="text-sm text-red-500">{message}</p>
          </section>
          <section className="flex flex-col space-y-3">
            <div className="flex gap-x-2 items-center justify-start">
              <label htmlFor="currentPassword">現在のパスワード:</label>
              <input
                type={currentPasswordMode}
                id="currentPassword"
                value={currentPassword}
                className="outline-none bg-gray5 w-72 px-2 py-1 rounded-md border border-gray6 focus:border-gray1 transition-colors duration-300"
                onChange={(e)=>setCurrentPassword(e.target.value)}
              />
              <p
                onClick={()=>togglePasswordMode("current")}
                className="cursor-pointer w-8 h-8 rounded-md hover:ring-1 flex items-center justify-center"
              >
                {currentPassword === "password" ? '🔒' : '🔓'}
              </p>
            </div>
            <div className="flex gap-x-2 items-center justify-start">
              <label htmlFor="newPassword">新しいパスワード:</label>
              <input
                type={newPasswordMode}
                id="newPassword"
                value={newPassword}
                className="outline-none bg-gray5 w-72 px-2 py-1 rounded-md border border-gray6 focus:border-gray1 transition-colors duration-300"
                onChange={(e)=>setNewPassword(e.target.value)}
              />
              <p
                onClick={()=>togglePasswordMode("new")}
                className="cursor-pointer w-8 h-8 rounded-md hover:ring-1 flex items-center justify-center"
              >
                {newPassword === "password" ? '🔒' : '🔓'}
              </p>
            </div>
            <div className="flex gap-x-2 items-center justify-start">
              <label htmlFor="confirmPassword">確認用パスワード:</label>
              <input
                type={confirmPasswordMode}
                id="confirmPassword"
                value={confirmPassword}
                className="outline-none bg-gray5 w-72 px-2 py-1 rounded-md border border-gray6 focus:border-gray1 transition-colors duration-300"
                onChange={(e)=>setConfirmPassword(e.target.value)}
              />
              <p
                onClick={()=>togglePasswordMode("confirm")}
                className="cursor-pointer w-8 h-8 rounded-md hover:ring-1 flex items-center justify-center"
              >
                {confirmPasswordMode === "password" ? '🔒' : '🔓'}
              </p>
            </div>
          </section>
          <Button
            type="submit"
            disabled={isLoading}
            className='bg-gray2 hover:bg-gray3'
            onClick={handleChangePassword}
          >
            {isLoading ? '更新中...' : '更新中'}
          </Button>
        </div>
      )
    default:
      return null;
    }
}