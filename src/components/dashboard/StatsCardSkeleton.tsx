export function StatsCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3">
      {/* Icon row */}
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-lg skeleton" />
        <div className="w-12 h-4 rounded skeleton" />
      </div>

      {/* Value */}
      <div className="w-16 h-8 rounded skeleton" />

      {/* Label */}
      <div className="w-24 h-4 rounded skeleton" />
    </div>
  )
}

export function StatsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCardSkeleton />
      <StatsCardSkeleton />
      <StatsCardSkeleton />
      <StatsCardSkeleton />
    </div>
  )
}
