"use client"

import { useCookie } from "@/(aurora)/_hooks/cookie/useCookie"
import { useCrypto } from "@/(aurora)/_hooks/Crypto/useCrypto";
import { Profiles } from "@/_lib/graphql/API"
import { redirect } from "next/navigation";

export default function SelectProfile({profiles,next}:{profiles:Profiles[],next:string}) {
  const { encrypt } = useCrypto();
  const { setCookie } = useCookie();
  const handleSelectProfile = async (profileId:string) => {
    const value = await encrypt(profileId);
    if(value){
      await setCookie("profileId", value, 60*60*24*7);
      return redirect(next);
    }
  }
  return (
    <div
      className="bg-white text-black py-10 px-12 rounded-md  border-[1px] border-neutral-800 shadow-lg"
    >
      <h1 className="text-2xl font-bold mb-4">プロフィールを選択</h1>
      <div className="grid grid-cols-4 gap-4">
        {profiles.map((profile) => (
          <div
            key={profile.profileId}
            className="flex flex-col items-center bg-neutral-200 p-4 rounded-md hover:bg-neutral-400 cursor-pointer"
            onClick={() => handleSelectProfile(profile.profileId)}
          >
            {profile.avatarKey ? (
              <div className="w-40 h-40 bg-neutral-400 flex justify-center items-center rounded-full">iconの写真</div>
            ):(
              <div className="w-40 h-40 bg-neutral-400 flex justify-center items-center rounded-full">Preview</div>
            )}
            <div className="w-full truncate">
              <h2>名前: {profile.name}</h2>
              <p>自己紹介: {profile.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}