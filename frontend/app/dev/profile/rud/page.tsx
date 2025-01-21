"use client"

export default function Profile(){
  return (
    <div className="bg-gray-800 h-screen w-screen text-white grid grid-cols-5 gap-4 items-center">
      <section className="mx-auto pb-40">
        <h1 className="text-3xl">get profile</h1>
        <button className="px-3 py-2 bg-blue-400 rounded-sm">click here</button>
      </section>
      <section className="mx-auto pb-40">
        <h1 className="text-3xl">get all profile</h1>
        <button className="px-3 py-2 bg-blue-400 rounded-sm">click here</button>
      </section>
      <section className="mx-auto pb-40">
        <h1 className="text-3xl">update profile</h1>
        <button className="px-3 py-2 bg-blue-400 rounded-sm">click here</button>
      </section>
      <section className="mx-auto pb-40">
        <h1 className="text-3xl">delete profile</h1>
        <button className="px-3 py-2 bg-blue-400 rounded-sm">click here</button>
      </section>
    </div>
  );
}