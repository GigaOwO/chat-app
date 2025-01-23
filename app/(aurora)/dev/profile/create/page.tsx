import CreateProfileForm from "@/(aurora)/_containers/CreateProfileForm/presentational";
export default async function Profile() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 bg-white">
      <CreateProfileForm />
    </div>
  );
}

