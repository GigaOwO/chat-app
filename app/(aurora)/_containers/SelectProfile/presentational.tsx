"use client"

import { useCookie } from "@/(aurora)/_hooks/cookie/useCookie"
import { useCrypto } from "@/(aurora)/_hooks/Crypto/useCrypto";
import { Profiles } from "@/_lib/graphql/API"
import { flex, padding, text } from "@/_lib/tailwindcss";
import { redirect } from "next/navigation";

export default function SelectProfile({profiles,next,children}:{profiles:Profiles[],next:string,children:React.ReactNode}) {
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
      className={`bg-white text-black py-10 px-12 rounded-md  border-[1px] border-neutral-800 shadow-lg ${text.M}`}
    >
      <h1 className={`font-bold mb-4 text-center ${text.XL}`}>プロフィールを選択</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {profiles.map((profile) => (
          <div
            key={profile.profileId}
            className={`items-center bg-neutral-100 rounded-md hover:bg-neutral-300 cursor-pointer ${flex.col} ${padding.S}`}
            onClick={() => handleSelectProfile(profile.profileId)}
          >
            {profile.avatarKey ? (
              <div className={`bg-neutral-200 w-28 h-28 justify-center items-center rounded-full my-3 ${flex.row}`}>iconの写真</div>
            ):(
              <div className={`bg-neutral-200 w-28 h-28 justify-center items-center rounded-full my-3 ${flex.row}`}>Preview</div>
            )}
            <div className="w-full truncate">
              <h2>名前: {profile.name}</h2>
              <p>自己紹介: {profile.bio}</p>
            </div>
          </div>
        ))}
        {children}
      </div>
    </div>
  )
}