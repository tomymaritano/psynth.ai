import { cn, getScoreColors } from '@/lib/utils'

interface ScoreBarProps {
  score: number | null
  showLabel?: boolean
  size?: 'sm' | 'md'
}

export function ScoreBar({ score, showLabel = true, size = 'sm' }: ScoreBarProps) {
  if (score === null) {
    return <span className="text-gray-400 text-[13px] font-semibold">—</span>
  }

  const colors = getScoreColors(score)
  const height = size === 'sm' ? 'h-1.5' : 'h-2'

  return (
    <div className="flex items-center gap-2.5">
      <div className={cn('w-[60px] bg-gray-200 rounded-full overflow-hidden', height)}>
        <div
          className={cn('h-full rounded-full transition-all duration-300', colors.bar)}
          style={{ width: `${score}%` }}
        />
      </div>
      {showLabel && (
        <span className={cn('text-[13px] font-semibold min-w-[36px]', colors.text)}>
          {score}
        </span>
      )}
    </div>
  )
}
