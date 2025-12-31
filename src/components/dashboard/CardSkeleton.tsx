function AssessmentCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full skeleton" />
          <div className="flex flex-col gap-1.5">
            <div className="w-28 h-4 rounded skeleton" />
            <div className="w-20 h-3 rounded skeleton" />
          </div>
        </div>
        <div className="w-20 h-6 rounded-full skeleton" />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col gap-1">
          <div className="w-12 h-3 rounded skeleton" />
          <div className="w-16 h-4 rounded skeleton" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-10 h-3 rounded skeleton" />
          <div className="w-8 h-4 rounded skeleton" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-8 h-3 rounded skeleton" />
          <div className="w-20 h-4 rounded skeleton" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
        <div className="flex-1 h-9 rounded-md skeleton" />
        <div className="w-9 h-9 rounded-md skeleton" />
        <div className="w-9 h-9 rounded-md skeleton" />
      </div>
    </div>
  )
}

export function CardListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="md:hidden flex flex-col gap-3 mt-6">
      {Array.from({ length: count }).map((_, i) => (
        <AssessmentCardSkeleton key={i} />
      ))}
    </div>
  )
}
