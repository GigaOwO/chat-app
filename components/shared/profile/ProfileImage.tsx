import { Avatar, AvatarImage, AvatarFallback } from '../../ui/avatar';

interface ProfileImageProps {
  src?: string | null;
  fallback?: string;
  className?: string;
}

export function ProfileImage({ src, fallback = 'User', className }: ProfileImageProps) {
  return (
    <Avatar className={className}>
      {src ? (
        <AvatarImage src={src} alt="Profile picture" />
      ) : null}
      <AvatarFallback>{fallback.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
