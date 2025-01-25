"use client"

import { useRef, useState } from "react"
import Image from 'next/image'
import { useProfiles } from "@/(aurora)/_hooks/Profiles/useProfiles";
import { CreateProfilesInput, UpdateProfilesInput } from "@/_lib/graphql/API";
import { Profiles } from "@/_lib/graphql/API"

export default function UpdateProfileForm({profile}:{profile:Profiles}) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [name, setName] = useState<string>(profile.name);
  const [order, setOrder] = useState<number>(profile.order);
  const [bio, setBio] = useState<string|null>(profile.bio||null);
  const ref = useRef<HTMLInputElement>(null);

  const { modifyProfile ,loading } = useProfiles();

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

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input: UpdateProfilesInput= {
      profileId: profile.profileId,
      userId: profile.userId,
      name,
      order,
      bio,
      updatedAt: new Date().toISOString(),
    };
    await modifyProfile(input);
  }

  const openFile = () => {
    ref.current?.click();
  };

  if(loading){
    return <p>loading...</p>
  }
  return (
    <form
      onSubmit={handleUpdateProfile}
      className="bg-white text-black w-[850px] py-10 px-12 rounded-md  border-[1px] border-neutral-800 shadow-lg"
    >
      <div className="flex justify-between">
        <div className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="name">name</label>
            <input
              className="w-80 p-2 rounded-sm outline-none border-[1px] border-neutral-800 opacity-40 focus:opacity-100 transition-opacity"
              type="text"
              placeholder="Name"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="order">order</label>
            <input
              className="w-80 p-2 rounded-sm outline-none border-[1px] border-neutral-800 opacity-40 focus:opacity-100 transition-opacity"
              type="number"
              placeholder="order"
              id="order"
              onChange={(e) => setOrder(Number(e.target.value))}
              value={order}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="bio">bio</label>
            <input
              className="w-80 p-2 rounded-sm outline-none border-[1px] border-neutral-800 opacity-40 focus:opacity-100 transition-opacity"
              type="text"
              placeholder="bio"
              id="bio"
              onChange={(e) => setBio(e.target.value)}
              value={bio||""}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          {imagePreview ? (
            <Image
              src={imagePreview!}
              alt="avatar"
              width={250}
              height={250}
            />
          ):(
            <div className="w-[250px] h-[250px] bg-gray-200 flex justify-center items-center">
              <p>icon preview</p>
            </div>
          )}
          <input
            className="hidden"
            type="file"
            id="avatar"
            onChange={handleSetImage}
            ref={ref}
          />
          <p
            onClick={openFile}
            className="text-center w-36 mx-auto py-1 cursor-pointer border-[1px] border-neutral-700 rounded-sm"
          >
            アイコンを変更
          </p>
        </div>
      </div>
      <button type="submit" className=" px-2 py-1 border-[1px] border-neutral-700 rounded-sm">プロフィールを変更</button>
    </form>
  )
}