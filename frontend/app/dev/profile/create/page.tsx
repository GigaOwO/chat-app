"use client"

import { useProfiles } from "@/(aurora)/_hooks/Profiles/useProfiles";

const debugData = {
  userId: process.env.NEXT_PUBLIC_DEBUG_KMJAK_USER_ID!,
  name: process.env.NEXT_PUBLIC_DEBUG_PROFILE_NAME!,
  isActive: true,
  bio: process.env.NEXT_PUBLIC_DEBUG_PROFILE_BIO!,
}

export default function Profile(){
  const { createNewProfile } = useProfiles({ userId: debugData.userId });
  const handleCreateProfile = async () => {
    await createNewProfile({name:debugData.name, isActive:debugData.isActive, bio:debugData.bio});
  }
  return (
    <div className="bg-gray-800 h-screen w-screen text-white flex flex-col justify-center items-center">
      <section className="mx-auto pb-40">
        <h1 className="text-3xl">create profile</h1>
        <button className="px-3 py-2 bg-blue-400 rounded-sm" onClick={handleCreateProfile}>click here</button>
      </section>
    </div>
  );
}