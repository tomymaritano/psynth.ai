import { cn, getScoreColors, getScoreRange } from '@/lib/utils'

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
  const range = getScoreRange(score)

  // SVG arc calculation for semicircle gauge
  // Arc goes from 0% (left) to 100% (right) on a semicircle
  const radius = 70
  const strokeWidth = 12
  const centerX = 80
  const centerY = 80

  // Calculate the arc path - score angle converts percentage to degrees
  const scoreAngle = 180 - (score / 100) * 180

  // Path for the background arc (full semicircle)
  const backgroundArc = describeArc(centerX, centerY, radius, 180, 0)

  // Path for the score arc
  const scoreArc = score > 0 ? describeArc(centerX, centerY, radius, 180, scoreAngle) : ''

  // Color based on score range
  const strokeColor = {
    high: '#10B981',   // success-500
    medium: '#F59E0B', // warning-500
    low: '#EF4444',    // error-500
  }[range]

  return (
    <div className="flex flex-col items-center">
      {/* SVG Gauge */}
      <div className="relative">
        <svg width="160" height="100" viewBox="0 0 160 100" aria-hidden="true">
          {/* Background arc */}
          <path
            d={backgroundArc}
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Score arc */}
          {score > 0 && (
            <path
              d={scoreArc}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* Score in center */}
        <div className="absolute inset-0 flex items-end justify-center pb-2">
          <span className={cn('text-3xl font-bold', colors.text)}>{score}</span>
        </div>
      </div>

      {/* Interpretation */}
      {interpretation && (
        <p className="text-sm text-gray-600 mt-2 text-center">{interpretation}</p>
      )}
    </div>
  )
}

// Helper function to describe an SVG arc
function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)
  const largeArcFlag = startAngle - endAngle <= 180 ? '0' : '1'

  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
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
