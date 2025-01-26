"use client"

import { useRef, useState } from "react"
import Image from 'next/image'
import { useProfiles } from "@/(aurora)/_hooks/Profiles/useProfiles";
import { CreateProfilesInput } from "@/_lib/graphql/API";
import { flex, input, opacity, padding, text } from "@/_lib/tailwindcss";

export default function CreateProfileForm({userId}:{userId:string}) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [order, setOrder] = useState<number>(0);
  const [bio, setBio] = useState<string|null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const { addProfile,loading } = useProfiles();

  const handleSetImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if(reader.result?.slice(0,10) !== "data:image"){
        return;
      }
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  const handleAddProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input:CreateProfilesInput = {
      profileId: `${userId}-${Date.now()}`,
      userId,
      name,
      order,
      bio,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    await addProfile(input);
  }

  const openFile = () => {
    ref.current?.click();
  };

  if(loading){
    return <p>loading...</p>
  }
  return (
    <form
      onSubmit={handleAddProfile}
      className={`bg-white text-black w-[360px] md:w-[675px] rounded-md border-[1px] border-neutral-800 shadow-lg ${text.M} ${padding.XL}`}
    >
      <div className="md:flex md:justify-between">
        <div className={`mb-5 md:mb-0 space-y-3 md:space-y-5`}>
          <div className={`${flex.col}`}>
            <label htmlFor="name">name</label>
            <input
              className={`rounded-sm border-[1px] border-neutral-800 ${padding.S} ${opacity.focus} ${input.L}`}
              type="text"
              placeholder="Name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={`${flex.col}`}>
            <label htmlFor="order">order</label>
            <input
              className={`rounded-sm border-[1px] border-neutral-800 ${padding.S} ${opacity.focus} ${input.L}`}
              type="number"
              placeholder="order"
              id="order"
              onChange={(e) => setOrder(Number(e.target.value))}
            />
          </div>
          <div className={`${flex.col}`}>
            <label htmlFor="bio">bio</label>
            <input
              className={`rounded-sm border-[1px] border-neutral-800 ${padding.S} ${opacity.focus} ${input.L}`}

              type="text"
              placeholder="bio"
              id="bio"
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>
        <div className={`gap-5 ${flex.col}`}>
          <div className={`md:items-center ${flex.col}`}>
            {imagePreview ? (
              <Image
                src={imagePreview!}
                alt="avatar"
                width={175}
                height={175}
              />
            ):(
              <div className={`w-60 h-60 md:w-[175px] md:h-[175px] bg-gray-200 justify-center items-center ${flex.row}`}>
                <p>icon preview</p>
              </div>
            )}
          </div>
          <input
            className="hidden"
            type="file"
            id="avatar"
            onChange={handleSetImage}
            ref={ref}
          />
          <p
            onClick={openFile}
            className={`text-center w-60 md:w-44 md:mx-auto cursor-pointer border-[1px] border-neutral-700 rounded-sm ${padding.S } ${opacity.hover} ${text.S}`}
          >
            アイコンを変更
          </p>
        </div>
      </div>
      <div className="mt-4 md:mt-6">
        <button type="submit" className={`border-[1px] border-neutral-700 rounded-sm w-60 md:w-44 ${padding.S} ${opacity.hover} ${text.S}`}>プロフィールを作成</button>
      </div>
    </form>
  )
}