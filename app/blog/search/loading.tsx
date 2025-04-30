import { Skeleton } from "@/components/ui/skeleton"

export default function SearchLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <Skeleton className="h-10 w-[300px] mx-auto mb-4" />
        <Skeleton className="h-6 w-[500px] mx-auto" />
      </div>

      <div className="mb-8 flex justify-center">
        <Skeleton className="h-10 w-[150px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex flex-col">
              <Skeleton className="h-[200px] w-full mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="flex justify-between mt-auto">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
