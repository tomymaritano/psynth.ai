import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Users, CheckCircle, Clock, FileText } from 'lucide-react'
import type { ReactNode } from 'react'

type StatsVariant = 'primary' | 'success' | 'warning' | 'purple'

interface StatsCardProps {
  label: string
  value: number | string
  trend?: number
  variant?: StatsVariant
  icon?: 'total' | 'completed' | 'progress' | 'patients'
}

const variantStyles: Record<StatsVariant, { bg: string; icon: string; iconBg: string }> = {
  primary: {
    bg: 'bg-white',
    icon: 'text-primary-600',
    iconBg: 'bg-primary-50',
  },
  success: {
    bg: 'bg-white',
    icon: 'text-success-500',
    iconBg: 'bg-success-50',
  },
  warning: {
    bg: 'bg-white',
    icon: 'text-warning-500',
    iconBg: 'bg-warning-50',
  },
  purple: {
    bg: 'bg-white',
    icon: 'text-purple-500',
    iconBg: 'bg-purple-50',
  },
}

const iconMap: Record<string, ReactNode> = {
  total: <FileText className="h-5 w-5" />,
  completed: <CheckCircle className="h-5 w-5" />,
  progress: <Clock className="h-5 w-5" />,
  patients: <Users className="h-5 w-5" />,
}

export function StatsCard({
  label,
  value,
  trend,
  variant = 'primary',
  icon = 'total',
}: StatsCardProps) {
  const styles = variantStyles[variant]
  const isPositive = trend && trend > 0
  const isNegative = trend && trend < 0

  return (
    <div
      className={cn(
        'rounded-xl border border-gray-200 p-5 shadow-sm transition-shadow hover:shadow-md',
        styles.bg
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn('rounded-lg p-2.5', styles.iconBg)}>
          <span className={styles.icon}>{iconMap[icon]}</span>
        </div>

        {trend !== undefined && trend !== 0 && (
          <div
            className={cn(
              'flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5',
              isPositive && 'text-success-700 bg-success-50',
              isNegative && 'text-error-700 bg-error-50'
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{label}</p>
      </div>
    </div>
  )
}
