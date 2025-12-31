import type { AssessmentStatus } from '@/types'
import { cn, getStatusColors, getStatusLabel } from '@/lib/utils'

interface StatusBadgeProps {
  status: AssessmentStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const colors = getStatusColors(status)
  const label = getStatusLabel(status)

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
        colors.bg,
        colors.text
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', colors.dot)} />
      {label}
    </span>
  )
}
