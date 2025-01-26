"use client"

import { padding, text, width } from "@/_lib/tailwindcss";
import { useState } from "react";
import { DeleteProfileModal } from "./modal";

export function DeleteProfile({userId,profileId}:{userId:string,profileId:string}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <button
        className={`bg-red-600 text-white rounded-sm ${text.S} ${padding.S} ${width.S}`}
        onClick={()=>setIsModalOpen(true)}
      >
        削除
      </button>
      {isModalOpen && (
        <DeleteProfileModal userId={userId} profileId={profileId} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
}