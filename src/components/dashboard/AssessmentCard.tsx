import type { Assessment } from '@/types'
import { formatDate, getInitials } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { StatusBadge } from './StatusBadge'
import { ScoreBar } from './ScoreBar'
import { ChevronRight } from 'lucide-react'

interface AssessmentCardProps {
  assessment: Assessment
  onSelect: (assessment: Assessment) => void
}

export function AssessmentCard({ assessment, onSelect }: AssessmentCardProps) {
  return (
    <button
      className="w-full bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      onClick={() => onSelect(assessment)}
      aria-label={`View details for ${assessment.patient.name}'s ${assessment.type} assessment`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Patient Info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarFallback className="bg-primary-100 text-primary-700 text-sm font-medium">
              {getInitials(assessment.patient.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-medium text-gray-900 truncate">{assessment.patient.name}</p>
            <p className="text-xs text-gray-500">{assessment.patient.id}</p>
          </div>
        </div>

        {/* Status Badge */}
        <StatusBadge status={assessment.status} />
      </div>

      {/* Assessment Info */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">{assessment.type}</p>
            <p className="text-xs text-gray-500">{assessment.id}</p>
          </div>
          <p className="text-sm text-gray-500">{formatDate(assessment.date)}</p>
        </div>

        {/* Score */}
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <ScoreBar score={assessment.score} size="md" />
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
          </div>
        </div>
      </div>
    </button>
  )
}

interface AssessmentCardListProps {
  assessments: Assessment[]
  onSelect: (assessment: Assessment) => void
}

export function AssessmentCardList({ assessments, onSelect }: AssessmentCardListProps) {
  return (
    <div className="md:hidden space-y-3">
      {assessments.map((assessment) => (
        <AssessmentCard
          key={assessment.id}
          assessment={assessment}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
