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

export function CurrentProfileSkeleton() {
  return (
    <div className="p-2 flex items-center gap-3 w-full bg-gray2 shadow-lg border-[1px] border-[#2B2B2B] rounded-sm">
      <Skeleton className="w-[32px] h-[32px] rounded-full" />
      <Skeleton className="h-4 w-24" />
    </div>
  )
}