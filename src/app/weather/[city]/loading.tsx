import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-20" />
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
        </div>
      </div>

      {/* Current Weather Skeleton */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-20 w-32 mb-2" />
              <Skeleton className="h-6 w-40 mb-1" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-24 w-24 rounded-full" />
          </div>
        </CardContent>
      </Card>

      {/* Weather Details Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 text-center">
              <Skeleton className="h-8 w-8 mx-auto mb-2" />
              <Skeleton className="h-8 w-16 mx-auto mb-1" />
              <Skeleton className="h-4 w-20 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Forecast Skeleton */}
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center min-w-[80px]">
                <Skeleton className="h-4 w-12 mb-2" />
                <Skeleton className="h-8 w-8 mb-2" />
                <Skeleton className="h-5 w-8" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
