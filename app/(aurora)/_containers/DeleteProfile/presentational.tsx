"use client"

import { useProfiles } from "@/(aurora)/_hooks/Profiles/useProfiles";
import { input, padding, text, width } from "@/_lib/tailwindcss";
import { redirect } from "next/navigation";
import { useState } from "react";

export function DeleteProfile({userId,profileId}:{userId:string,profileId:string}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const { removeProfile } = useProfiles();
  const handleDelete = async () => {
    await removeProfile({userId, profileId});
    redirect('/dev/profile/select');
  }
  return (
    <>
      <button
        className={`bg-red-600 text-white rounded-sm ${text.S} ${padding.S} ${width.S}`}
        onClick={()=>setIsModalOpen(true)}
      >
        削除
      </button>
      <section
        className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 ${isModalOpen ? 'block' : 'hidden'} ${text.S}`}
        onClick={() => setIsModalOpen(false)}
      />
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md space-y-4 ${padding.L} ${width.XXL} ${isModalOpen ? 'block' : 'hidden'}`}>
        <p className="text-black">このアカウントを削除するなら<br /><span className={`text-red-700 ${text.XL}`}>「削除」</span>と入力してください</p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`border-[1px] border-gray-300 text-black rounded-sm ${input.full} ${padding.S} ${text.M}`}
        />
        <button
          className={`text-white rounded-sm transition-colors duration-150 ${text.M} ${padding.S} ${width.full} ${inputValue === "削除" ? 'bg-red-600' : 'bg-gray-300'}`}
          onClick={handleDelete}
          disabled={inputValue !== "削除"}
        >
          削除
        </button>
      </div>
    </>
  );
}