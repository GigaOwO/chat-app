import { Skeleton } from "@/_components/ui/skeleton"

export function ProfileSwitcherSkeleton() {
  return (
    <div className="flex gap-2">
      {[...Array(4)].map((_, i) => (
        <div 
          key={i} 
          className="bg-gray2 h-12 w-12 rounded-lg flex items-center justify-center"
        >
          <Skeleton className="w-6 h-6 rounded-full" />
        </div>
      ))}
    </div>
  )
}