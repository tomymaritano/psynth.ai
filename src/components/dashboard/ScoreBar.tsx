import { cn, getScoreColors } from '@/lib/utils'

interface ScoreBarProps {
  score: number | null
  showLabel?: boolean
  size?: 'sm' | 'md'
}

export function ScoreBar({ score, showLabel = true, size = 'sm' }: ScoreBarProps) {
  if (score === null) {
    return <span className="text-gray-400 text-sm">—</span>
  }

  const colors = getScoreColors(score)
  const height = size === 'sm' ? 'h-1.5' : 'h-2'

  return (
    <div className="flex items-center gap-2">
      <div className={cn('flex-1 bg-gray-100 rounded-full overflow-hidden', height)}>
        <div
          className={cn('h-full rounded-full transition-all', colors.bar)}
          style={{ width: `${score}%` }}
        />
      </div>
      {showLabel && (
        <span className={cn('text-sm font-medium min-w-[2.5rem] text-right', colors.text)}>
          {score}%
        </span>
      )}
    </div>
  )
}
