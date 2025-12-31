import type { Assessment } from '@/types'
import { formatDate, getInitials, getScoreColors } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { StatusBadge } from './StatusBadge'
import { ScoreGauge } from './ScoreGauge'
import { X, Download, FileEdit, IdCard, Calendar } from 'lucide-react'
import { useEffect } from 'react'

interface AssessmentDetailProps {
  assessment: Assessment | null
  onClose: () => void
}

export function AssessmentDetail({ assessment, onClose }: AssessmentDetailProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (assessment) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [assessment, onClose])

  if (!assessment) return null

  return (
    <Sheet open={!!assessment} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        className="w-full sm:w-[480px] sm:max-w-[480px] overflow-y-auto p-0 flex flex-col"
        aria-label={`Assessment details for ${assessment.patient.name}`}
      >
        {/* Header */}
        <SheetHeader className="flex-shrink-0 border-b border-gray-200 px-6 py-5">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold text-gray-900">
              Assessment Details
            </SheetTitle>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all duration-150"
              aria-label="Close panel"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
        </SheetHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Patient Header */}
          <div className="flex items-center gap-4 pb-6 border-b border-gray-200 mb-6">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="bg-primary-100 text-primary-700 text-xl font-semibold">
                {getInitials(assessment.patient.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {assessment.patient.name}
              </h3>
              <div className="flex items-center gap-3 text-[13px] text-gray-500">
                <span className="flex items-center gap-1">
                  <IdCard className="w-3.5 h-3.5" strokeWidth={2} />
                  {assessment.patient.id}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
                  {formatDate(assessment.date)}
                </span>
              </div>
            </div>
          </div>

          {/* Assessment Information Section */}
          <div className="mb-6">
            <h4 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Assessment Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500">Assessment Type</span>
                <span className="text-sm font-medium text-gray-900">{assessment.type}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500">Status</span>
                <StatusBadge status={assessment.status} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500">Administered By</span>
                <span className="text-sm font-medium text-gray-900">
                  {assessment.administeredBy.name}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500">Duration</span>
                <span className="text-sm font-medium text-gray-900">
                  {assessment.duration || '—'}
                </span>
              </div>
            </div>
          </div>

          {/* Overall Score Section */}
          <div className="mb-6">
            <h4 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Overall Score
            </h4>
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <ScoreGauge
                score={assessment.score}
                interpretation={assessment.scoreInterpretation}
              />
            </div>
          </div>

          {/* Subscale Scores */}
          {assessment.subscales && assessment.subscales.length > 0 && (
            <div className="mb-6">
              <h4 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Subscale Scores
              </h4>
              <div className="flex flex-col gap-4">
                {assessment.subscales.map((subscale, index) => {
                  const percentage = Math.round((subscale.score / subscale.maxScore) * 100)
                  const colors = getScoreColors(percentage)
                  return (
                    <div key={index} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{subscale.name}</span>
                        <span className="text-sm font-semibold text-gray-900">{subscale.score}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-400 ${colors.bar}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Clinician Notes */}
          {assessment.notes && (
            <div>
              <h4 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Clinician Notes
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileEdit className="w-4 h-4 text-gray-500" strokeWidth={2} />
                  <span className="text-[13px] font-semibold text-gray-700">
                    {assessment.administeredBy.name}
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {assessment.notes}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex-shrink-0 border-t border-gray-200 bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between gap-3">
            <button className="flex-1 inline-flex items-center justify-center gap-2 px-[18px] py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 hover:border-gray-400 transition-all duration-150">
              <Download className="w-4 h-4" strokeWidth={2} />
              Download Report
            </button>
            <button className="flex-1 inline-flex items-center justify-center gap-2 px-[18px] py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-md shadow-sm transition-all duration-150">
              <FileEdit className="w-4 h-4" strokeWidth={2} />
              Edit Assessment
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
