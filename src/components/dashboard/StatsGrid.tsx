import type { DashboardStats } from '@/types'
import { StatsCard } from './StatsCard'

interface StatsGridProps {
  stats: DashboardStats
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        label="Total Assessments"
        value={stats.totalAssessments}
        trend={stats.totalAssessmentsTrend}
        variant="primary"
        icon="total"
      />
      <StatsCard
        label="Completed"
        value={stats.completed}
        trend={stats.completedTrend}
        variant="success"
        icon="completed"
      />
      <StatsCard
        label="In Progress"
        value={stats.inProgress}
        trend={stats.inProgressTrend}
        variant="warning"
        icon="progress"
      />
      <StatsCard
        label="Active Patients"
        value={stats.activePatients}
        variant="purple"
        icon="patients"
      />
    </div>
  )
}
