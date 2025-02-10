import { Button } from "@/_components/ui/button";
import { DeleteFriendsInput, FriendStatus, Profiles, UpdateFriendsInput, Users } from "@/_lib/graphql/API";
import { useUsers } from "@/_lib/hooks/useUsers";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useProfileContext } from "../../Profile/context";
import { useFriends } from "@/_lib/hooks/useFriends";
import { useUserContext } from "../../User/context";

export function FriendDetailsModal({
  profile,
  status,
  setIsFriendDetailsModalOpen,
  setSelectedFriendProfile,
  setFriendProfiles,
}:{
  profile: Profiles,
  status:FriendStatus,
  setIsFriendDetailsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedFriendProfile: React.Dispatch<React.SetStateAction<Profiles | null>>
  setFriendProfiles: React.Dispatch<React.SetStateAction<Profiles[]>>
}) {
  const {currentProfile, otherProfiles} = useProfileContext();
  const { user } = useUserContext();
  const [friendData,setFriendData] = useState<Users>();
  const [friendStatus,setFriendStatus] = useState<string>(status);
  const [usingProfileId,setUsingProfileId] = useState<string | null>(currentProfile?.profileId ?? null);
  const { loading, fetchUser } = useUsers();
  const { modifyFriend, removeFriend } = useFriends();

  useEffect(() => {
    const fetchFriendData = async () => {
      if (profile.userId) {
        await fetchUser(profile.userId)
        .then((response) => {
          if (response) {
            setFriendData(response);
          }
        })
      }
    }
    fetchFriendData();
  }, [profile.userId]);

  const handleCloseModal = () => {
    setIsFriendDetailsModalOpen(false);
    setSelectedFriendProfile(null);
  }

  const handleSave = async () => {
    if (!currentProfile || !usingProfileId || !user) {
      return;
    }
    if(friendStatus === FriendStatus.REMOVED){
      const deleteInputFromMine:DeleteFriendsInput = {
        userId: user.userId,
        friendId: profile.userId,
      }
      const deleteInputFromFriend:DeleteFriendsInput = {
        userId: profile.userId,
        friendId: user.userId,
      }
      await Promise.all([
        removeFriend(deleteInputFromMine),
        removeFriend(deleteInputFromFriend),
      ]);
      setFriendProfiles((prev) => prev.filter((p) => p.profileId !== profile.profileId));
      setIsFriendDetailsModalOpen(false);
      setSelectedFriendProfile(null);
      return;
    }
    
    const input:UpdateFriendsInput = {
      userId: user.userId,
      friendId: profile.userId,
      status: friendStatus as FriendStatus,
      userProfileId: usingProfileId,
      friendProfileId: profile.profileId,
      updatedAt: new Date().toISOString(),
    }
    await modifyFriend(input);
    if(usingProfileId !== currentProfile.profileId){
      setFriendProfiles((prev) => prev.filter((p) => p.profileId !== profile.profileId));
      setSelectedFriendProfile(null);
      setIsFriendDetailsModalOpen(false);
    }
  }

  if (loading||!friendData) {
    return <p>loading...</p>
  }

  return (
  <div className="text-white flex flex-col space-y-6 max-w-full break-words overflow-hidden">
    <div className="flex items-center space-x-2 w-full border-b border-neutral-700 pb-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCloseModal}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      {friendData?.username && (
        <h3 className="text-xl font-bold">{profile.name}<span className="text-sm">({friendData?.username})</span></h3>
      )}
    </div>
    <div>
      <p className="bg-gray5 px-3 py-2 rounded-md break-words  w-[525px]"><span className="text-white1">自己紹介:</span>{profile.bio}</p>
    </div>
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm">現在の割り当てているプロフィール</p>
        {usingProfileId ? (
          <select
            className="w-full bg-gray5 px-3 py-2 outline-none rounded-md truncate transition-colors duration-300 hover:bg-gray3"
            value={usingProfileId}
            onChange={(e) => setUsingProfileId(e.target.value)}
          >
            <option value={currentProfile?.profileId}>{currentProfile?.name}</option>
            {otherProfiles.map((profile) => (
              <option
                key={profile.profileId}
                value={profile.profileId}
              >
                {profile.name}
              </option>
            ))}
          </select>
        ):(
          <p className="w-full bg-gray5 px-3 py-2 rounded-md">プロフィールがありません</p>
        )}
      </div>
      <div className="space-y-2">
        <p>status:</p>
        <select
          className="w-full bg-gray5 px-3 py-2 outline-none rounded-md truncate transition-colors duration-300 hover:bg-gray3"
          value={friendStatus}
          onChange={(e) => setFriendStatus(e.target.value)}
        >
          {Object.values(FriendStatus).map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
    </div>
    <div className="flex justify-end py-2">
      <button
        className="bg-gray5 px-3 py-2 rounded-md hover:bg-gray1 hover:bg-opacity-30 transition-colors duration-300"
        onClick={handleSave}
      >
        保存
      </button>
    </div>
  </div>
  )
}