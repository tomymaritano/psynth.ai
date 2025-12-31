import type { Assessment } from '@/types'
import { formatDate, formatTime, getInitials } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { StatusBadge } from './StatusBadge'
import { ScoreBar } from './ScoreBar'
import { Eye, Download, MoreVertical } from 'lucide-react'

interface AssessmentCardProps {
  assessment: Assessment
  onSelect: (assessment: Assessment) => void
}

export function AssessmentCard({ assessment, onSelect }: AssessmentCardProps) {
  return (
    <div
      className="bg-white rounded-xl border border-gray-200 p-4"
      role="button"
      tabIndex={0}
      onClick={() => onSelect(assessment)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(assessment)
        }
      }}
      aria-label={`View details for ${assessment.patient.name}'s ${assessment.type} assessment`}
    >
      {/* Header: Patient + Status */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarFallback className="bg-gray-100 text-gray-600 text-sm font-semibold">
              {getInitials(assessment.patient.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm text-gray-900">{assessment.patient.name}</p>
            <p className="text-xs text-gray-500">{assessment.patient.id}</p>
          </div>
        </div>
        <StatusBadge status={assessment.status} />
      </div>

      {/* Body: Info Rows */}
      <div className="flex flex-col gap-3 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Assessment</span>
          <span className="text-sm font-medium text-gray-800">{assessment.type}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Score</span>
          <ScoreBar score={assessment.score} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Date</span>
          <span className="text-sm font-medium text-gray-800">
            {formatDate(assessment.date)} • {formatTime(assessment.date)}
          </span>
        </div>
      </div>

      {/* Footer: Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onSelect(assessment)
          }}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-300 text-gray-700 text-[13px] font-medium rounded-md hover:bg-gray-50 transition-all duration-150"
        >
          <Eye className="w-3.5 h-3.5" strokeWidth={2} />
          View Details
        </button>
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all duration-150"
            aria-label="Download"
          >
            <Download className="w-4 h-4" strokeWidth={2} />
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all duration-150"
            aria-label="More options"
          >
            <MoreVertical className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  )
}

interface AssessmentCardListProps {
  assessments: Assessment[]
  onSelect: (assessment: Assessment) => void
}

export function AssessmentCardList({ assessments, onSelect }: AssessmentCardListProps) {
  return (
    <div className="md:hidden flex flex-col gap-3 mt-6">
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
