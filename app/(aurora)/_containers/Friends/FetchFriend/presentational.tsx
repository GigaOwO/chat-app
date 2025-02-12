'use client';

import { useFriends } from "@/_lib/hooks/useFriends";
import { useProfileContext } from "../../Profile/context";
import { useEffect, useState } from "react";
import { Friends, Profiles } from "@/_lib/graphql/API";
import { useProfiles } from "@/_lib/hooks/useProfiles";
import { Avatar, AvatarFallback } from "@/_components/ui/avatar";
import { ProfileImage } from "@/_components/ProfileImage";
import { FriendDetailsModal } from "./ProfileSelectorModal";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";

export function FetchFriend({ onclose }: { onclose: () => void }) {
  const router = useRouter();
  const [friendProfiles, setFriendProfiles] = useState<Profiles[]>([]);
  const [friendDetails, setFriendDetails] = useState<Friends[]>([]);
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
        const profileResponses = await Promise.all(
          profileIds.map((profileId) => fetchProfilesByProfileId(profileId, 1))
        );
        
        // 全てのプロフィール結果を処理
        const allProfiles = profileResponses
          .flatMap(response => response?.items || [])
          .filter((p): p is Profiles => p !== null);
        
        // プロフィールIDで重複を除去
        const uniqueProfiles = Array.from(
          new Map(allProfiles.map(profile => [profile.profileId, profile])).values()
        );
        
        setFriendProfiles(uniqueProfiles);
      }
    };
    loadProfiles();
  }, [friendDetails, fetchProfilesByProfileId]);

  const handleOpenSettings = (profile: Profiles) => {
    setSelectedFriendProfile(profile);
    setIsFriendDetailsModalOpen(true);
  };

  const handleChatStart = (userId: string) => {
    router.push(`/dm/${userId}`);
    onclose();
  };

  if (isFriendDetailsModalOpen && selectedFriendProfile) {
    return (
      <FriendDetailsModal
        profile={selectedFriendProfile}
        status={friendDetails.filter((f: Friends) => f?.friendProfileId === selectedFriendProfile.profileId)[0]?.status || null}
        setIsFriendDetailsModalOpen={() => setIsFriendDetailsModalOpen(false)}
        setSelectedFriendProfile={setSelectedFriendProfile}
        setFriendProfiles={setFriendProfiles}
      />
    );
  }

  return (
    <div className="space-y-4">
      <h5>フレンド人数: {friendProfiles.length}</h5>
      {friendProfiles.map((profile) => (
        <div className="flex items-center justify-between" key={profile.profileId}>
          <div 
            className="flex items-center space-x-3 flex-1 cursor-pointer hover:bg-gray3 p-2 rounded-lg transition-colors"
            onClick={() => handleChatStart(profile.userId)}
          >
            <Avatar className="h-10 w-10">
              {profile.avatarKey ? (
                <ProfileImage
                  path={profile.avatarKey}
                  alt={profile.name}
                  fallbackText={profile.name.charAt(0).toUpperCase()}
                  width={40}
                  height={40}
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenSettings(profile);
            }}
            className="p-2 rounded-full hover:bg-gray3 transition-colors"
          >
            <Settings size={20} className="text-gray1" />
          </button>
        </div>
      ))}
    </div>
  );
}
