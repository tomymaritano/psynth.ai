import type { Assessment } from '@/types'
import { formatDate, formatTime, getInitials } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { StatusBadge } from './StatusBadge'
import { ScoreBar } from './ScoreBar'
import { Eye, Download, MoreVertical, FileText } from 'lucide-react'

interface AssessmentTableProps {
  assessments: Assessment[]
  onSelect: (assessment: Assessment) => void
}

export function AssessmentTable({ assessments, onSelect }: AssessmentTableProps) {
  return (
    <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left py-3.5 px-5 pl-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Patient
            </th>
            <th className="text-left py-3.5 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Assessment Type
            </th>
            <th className="text-left py-3.5 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="text-left py-3.5 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Score
            </th>
            <th className="text-left py-3.5 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="text-left py-3.5 px-5 pr-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {assessments.map((assessment, index) => (
            <tr
              key={assessment.id}
              className={`cursor-pointer hover:bg-gray-50 transition-colors duration-100 ${
                index !== assessments.length - 1 ? 'border-b border-gray-100' : ''
              }`}
              onClick={() => onSelect(assessment)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelect(assessment)
                }
              }}
              role="button"
              aria-label={`View details for ${assessment.patient.name}'s ${assessment.type} assessment`}
            >
              {/* Patient */}
              <td className="py-4 px-5 pl-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gray-100 text-gray-600 text-sm font-semibold">
                      {getInitials(assessment.patient.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-sm text-gray-900">
                      {assessment.patient.name}
                    </span>
                    <span className="text-xs text-gray-500">{assessment.patient.id}</span>
                  </div>
                </div>
              </td>

              {/* Assessment Type */}
              <td className="py-4 px-5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-3.5 h-3.5 text-gray-600" strokeWidth={2} />
                  </div>
                  <span className="font-medium text-sm text-gray-800">{assessment.type}</span>
                </div>
              </td>

              {/* Status */}
              <td className="py-4 px-5">
                <StatusBadge status={assessment.status} />
              </td>

              {/* Score */}
              <td className="py-4 px-5">
                <ScoreBar score={assessment.score} />
              </td>

              {/* Date */}
              <td className="py-4 px-5">
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium text-sm text-gray-800">
                    {formatDate(assessment.date)}
                  </span>
                  <span className="text-xs text-gray-500">{formatTime(assessment.date)}</span>
                </div>
              </td>

              {/* Actions */}
              <td className="py-4 px-5 pr-6">
                <div
                  className="flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all duration-150"
                    onClick={() => onSelect(assessment)}
                    aria-label="View assessment"
                  >
                    <Eye className="w-4 h-4" strokeWidth={2} />
                  </button>
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all duration-150"
                    aria-label="Download assessment"
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  )
}
