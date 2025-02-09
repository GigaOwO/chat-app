'use client';

import { useFriends } from "@/_lib/hooks/useFriends";
import { useProfileContext } from "../../Profile/context";
import { useEffect, useState } from "react";
import { Friends, Profiles } from "@/_lib/graphql/API";
import { useProfiles } from "@/_lib/hooks/useProfiles";
import { Avatar, AvatarFallback } from "@/_components/ui/avatar";
import { ProfileImage } from "@/_components/ProfileImage";
import { FriendDetailsModal } from "./ProfileSelectorModal";

export function FetchFriend() {
  const [friendProfiles, setFriendProfiles] = useState<Profiles[]>([]);
  const [friendDetails,setFriendDetails] = useState<Friends[]>([]);
  const [isFriendDetailsModalOpen, setIsFriendDetailsModalOpen] = useState(false);
  const [selectedFriendProfile, setSelectedFriendProfile] = useState<Profiles | null>(null);
  const { currentProfile } = useProfileContext();
  const { fetchProfilesByProfileId } = useProfiles();
  const { fetchFriendsByUserProfileId } = useFriends();

  useEffect(() => {
    const fetchFriends = async () => {
      if (currentProfile) {
        await fetchFriendsByUserProfileId(currentProfile.profileId)
        .then((response) => {
          if (response?.items) {
            setFriendDetails(response.items.filter((f): f is Friends => f !== null));
          }
        })
      }
    }
    fetchFriends();
  }, [currentProfile, fetchFriendsByUserProfileId]);

  useEffect(() => {
    const loadProfiles = async () => {
      if (friendDetails.length > 0) {
        const profileIds = friendDetails.map((friend) => friend?.friendProfileId);
        const profiles = (await Promise.all(profileIds.map((profileId) => fetchProfilesByProfileId(profileId,1))))
        if(profiles.length > 0){
          setFriendProfiles(profiles[0]?.items?.filter((p): p is Profiles => p !== null) || []);
        }
      }
    };
    loadProfiles();
  }, [friendDetails, fetchProfilesByProfileId]);

  const handleSelectFriend = (profile: Profiles) => {
    setSelectedFriendProfile(profile)
    setIsFriendDetailsModalOpen(true);
  }

  if (isFriendDetailsModalOpen && selectedFriendProfile){
    return (
      <FriendDetailsModal
        profile={selectedFriendProfile}
        status={friendDetails.filter((f: Friends) => f?.friendProfileId === selectedFriendProfile.profileId)[0]?.status || null}
        setIsFriendDetailsModalOpen={() => setIsFriendDetailsModalOpen(false)}
        setSelectedFriendProfile={setSelectedFriendProfile}
        setFriendProfiles={setFriendProfiles}
      />
    )
  }

  return (
    <div className="space-y-4">
      <h5>フレンド人数: {friendProfiles.length}</h5>
      {friendProfiles.map((profile) => (
        <div className="flex items-center space-x-3" key={profile.profileId} onClick={()=>handleSelectFriend(profile)}>
          <Avatar className="h-10 w-10">
            {profile.avatarKey ? (
              <ProfileImage
                path={profile.avatarKey}
                alt={profile.name}
                fallbackText={profile.name.charAt(0).toUpperCase()}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <AvatarFallback className='bg-zinc-700 text-zinc-100 text-xs'>
                {profile.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="text-white">{profile?.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}