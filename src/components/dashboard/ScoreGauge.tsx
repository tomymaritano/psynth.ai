import { cn, getScoreColors } from '@/lib/utils'

interface ScoreGaugeProps {
  score: number | null
  interpretation?: string | null
}

export function ScoreGauge({ score, interpretation }: ScoreGaugeProps) {
  if (score === null) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="text-4xl font-bold text-gray-300">—</div>
        <p className="text-sm text-gray-500 mt-2">Score not available</p>
      </div>
    )
  }

  const colors = getScoreColors(score)

  // Design reference: 140×70px gauge with 20px arc thickness
  // Outer radius: 70, Inner radius: 50, Stroke center: 60
  const radius = 60
  const strokeWidth = 20
  const centerX = 70
  const centerY = 70

  // Score fills from RIGHT (green) to LEFT (red)
  // At 72%: fills 72% of semicircle from the green side
  const fillAngle = (score / 100) * 180  // 72% -> 129.6°
  const endAngle = fillAngle             // Where the fill ends (from the left)

  // Background: full semicircle (180° to 0°)
  const backgroundArc = describeArc(centerX, centerY, radius, 180, 0)

  // Score: arc from right (0°) to endAngle, going counter-clockwise through top
  const scoreArc = score > 0 ? describeArc(centerX, centerY, radius, 0, endAngle, true) : ''

  return (
    <div className="flex flex-col items-center">
      {/* SVG Gauge - matches design: 140×70 */}
      <div className="relative w-[140px] h-[70px]">
        <svg
          width="140"
          height="70"
          viewBox="0 0 140 70"
          aria-hidden="true"
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="scoreGradient" x1="0" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          {/* Background arc (gray) */}
          <path
            d={backgroundArc}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            strokeLinecap="butt"
          />
          {/* Score arc (gradient) */}
          {score > 0 && (
            <path
              d={scoreArc}
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth={strokeWidth}
              strokeLinecap="butt"
            />
          )}
        </svg>

        {/* Score value - positioned at bottom center */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[-8px]">
          <span className="text-[28px] font-bold text-gray-900">{score}</span>
        </div>
      </div>

      {/* Labels */}
      <p className="text-[13px] text-gray-500 mt-4">Composite Score</p>
      {interpretation && (
        <p className={cn('text-sm font-semibold mt-1', colors.text)}>{interpretation}</p>
      )}
    </div>
  )
}

// Helper: describe SVG arc path
function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  counterClockwise: boolean = false
): string {
  const start = polarToCartesian(x, y, radius, startAngle)
  const end = polarToCartesian(x, y, radius, endAngle)
  const largeArcFlag = Math.abs(startAngle - endAngle) > 180 ? 1 : 0
  const sweepFlag = counterClockwise ? 0 : 1
  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, sweepFlag, end.x, end.y
  ].join(' ')
}

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY - radius * Math.sin(angleInRadians),
  }
}
