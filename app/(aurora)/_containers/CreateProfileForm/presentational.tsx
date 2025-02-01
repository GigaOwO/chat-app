"use client";

import { useRef, useState } from "react"
import Image from 'next/image'
import { useProfiles } from "@/(aurora)/_hooks/Profiles/useProfiles";
import { CreateProfilesInput } from "@/_lib/graphql/API"
import { flex, input, opacity, padding, text } from "@/_lib/tailwindcss";
import { ThemeColorPicker } from "./ThemeColorPicker";

export default function CreateProfileForm({userId}: {userId: string}) {
  const [formData, setFormData] = useState({
    imagePreview: null as string | null,
    name: "",
    order: 0,
    bio: null as string | null,
    themeColor: "1D282E"
  });
  const ref = useRef<HTMLInputElement>(null);
  const { addProfile, loading } = useProfiles();

  const handleSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if(reader.result?.slice(0,10) !== "data:image"){
        return;
      }
      setFormData(prev => ({
        ...prev,
        imagePreview: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const customData = JSON.stringify({ themeColor: formData.themeColor });
    
    const input: CreateProfilesInput = {
      profileId: `${userId}-${Date.now()}`,
      userId,
      name: formData.name,
      order: formData.order,
      bio: formData.bio,
      customData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await addProfile(input);
  };

  const updateFormData = (field: string, value: string | number | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if(loading) {
    return <p>loading...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
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
              value={formData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
            />
          </div>
          <div className={`${flex.col}`}>
            <label htmlFor="order">order</label>
            <input
              className={`rounded-sm border-[1px] border-neutral-800 ${padding.S} ${opacity.focus} ${input.L}`}
              type="number"
              placeholder="order"
              id="order"
              value={formData.order}
              onChange={(e) => updateFormData("order", Number(e.target.value))}
            />
          </div>
          <div className={`${flex.col}`}>
            <label htmlFor="bio">bio</label>
            <input
              className={`rounded-sm border-[1px] border-neutral-800 ${padding.S} ${opacity.focus} ${input.L}`}
              type="text"
              placeholder="bio"
              id="bio"
              value={formData.bio || ""}
              onChange={(e) => updateFormData("bio", e.target.value)}
            />
          </div>
          <ThemeColorPicker 
            selectedColor={formData.themeColor} 
            onColorSelect={(color) => updateFormData("themeColor", color)}
          />
        </div>
        <div className={`gap-5 ${flex.col}`}>
          <div className={`md:items-center ${flex.col}`}>
            {formData.imagePreview ? (
              <Image
                src={formData.imagePreview}
                alt="avatar"
                width={175}
                height={175}
              />
            ) : (
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
          <button
            type="button"
            onClick={() => ref.current?.click()}
            className={`text-center w-60 md:w-44 md:mx-auto cursor-pointer border-[1px] border-neutral-700 rounded-sm ${padding.S} ${opacity.hover} ${text.S}`}
          >
            アイコンを変更
          </button>
        </div>
      </div>
      <div className="mt-4 md:mt-6">
        <button 
          type="submit" 
          className={`border-[1px] border-neutral-700 rounded-sm w-60 md:w-44 ${padding.S} ${opacity.hover} ${text.S}`}
        >
          プロフィールを作成
        </button>
      </div>
    </form>
  );
}