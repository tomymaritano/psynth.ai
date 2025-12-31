import { cn } from '@/lib/utils'
import { ArrowUp, ArrowDown, Users, CheckCircle, Clock, FileText } from 'lucide-react'
import type { ReactNode } from 'react'

type StatsVariant = 'primary' | 'success' | 'warning' | 'purple'

interface StatsCardProps {
  label: string
  value: number | string
  trend?: number
  variant?: StatsVariant
  icon?: 'total' | 'completed' | 'progress' | 'patients'
}

const variantStyles: Record<StatsVariant, { icon: string; iconBg: string }> = {
  primary: {
    icon: 'text-primary-600',
    iconBg: 'bg-primary-50',
  },
  success: {
    icon: 'text-success-500',
    iconBg: 'bg-success-50',
  },
  warning: {
    icon: 'text-warning-500',
    iconBg: 'bg-warning-50',
  },
  purple: {
    icon: 'text-[#9333EA]',
    iconBg: 'bg-[#F3E8FF]',
  },
}

const iconMap: Record<string, ReactNode> = {
  total: <FileText className="w-5 h-5" strokeWidth={2} />,
  completed: <CheckCircle className="w-5 h-5" strokeWidth={2} />,
  progress: <Clock className="w-5 h-5" strokeWidth={2} />,
  patients: <Users className="w-5 h-5" strokeWidth={2} />,
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
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        {/* Icon */}
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', styles.iconBg)}>
          <span className={styles.icon}>{iconMap[icon]}</span>
        </div>

        {/* Trend */}
        {trend !== undefined && trend !== 0 && (
          <div
            className={cn(
              'flex items-center gap-1 text-xs font-medium',
              isPositive && 'text-success-500',
              isNegative && 'text-error-500'
            )}
          >
            {isPositive ? (
              <ArrowUp className="w-3.5 h-3.5" strokeWidth={2} />
            ) : (
              <ArrowDown className="w-3.5 h-3.5" strokeWidth={2} />
            )}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>

      {/* Value */}
      <div className="text-[32px] font-bold text-gray-900 leading-none tracking-tight">
        {value}
      </div>

      {/* Label */}
      <div className="text-[13px] text-gray-500">{label}</div>
    </div>
  )
}
