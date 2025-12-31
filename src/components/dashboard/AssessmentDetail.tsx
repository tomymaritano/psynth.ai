import type { Assessment } from '@/types'
import { formatDate, formatDateTime, getInitials } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { StatusBadge } from './StatusBadge'
import { ScoreGauge } from './ScoreGauge'
import { ScoreBar } from './ScoreBar'
import { X, Download, Printer, Share2 } from 'lucide-react'
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
        className="w-full sm:max-w-lg overflow-y-auto p-0"
        aria-label={`Assessment details for ${assessment.patient.name}`}
      >
        {/* Header */}
        <SheetHeader className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold text-gray-900">
              Assessment Details
            </SheetTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
              aria-label="Close panel"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Patient Header */}
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="bg-primary-100 text-primary-700 text-lg font-semibold">
                {getInitials(assessment.patient.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {assessment.patient.name}
              </h3>
              <p className="text-sm text-gray-500">{assessment.patient.email}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                DOB: {formatDate(assessment.patient.dateOfBirth)}
              </p>
            </div>
          </div>

          {/* Assessment Info Grid */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Type</p>
              <p className="font-medium text-gray-900 mt-1">{assessment.type}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
              <div className="mt-1">
                <StatusBadge status={assessment.status} />
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Administered By</p>
              <p className="font-medium text-gray-900 mt-1">
                {assessment.administeredBy.name}
              </p>
              <p className="text-xs text-gray-500">{assessment.administeredBy.title}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Duration</p>
              <p className="font-medium text-gray-900 mt-1">
                {assessment.duration || '—'}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
              <p className="font-medium text-gray-900 mt-1">
                {formatDateTime(assessment.date)}
              </p>
            </div>
          </div>

          {/* Score Gauge */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-4 text-center">
              Overall Score
            </h4>
            <ScoreGauge
              score={assessment.score}
              interpretation={assessment.scoreInterpretation}
            />
          </div>

          {/* Subscale Scores */}
          {assessment.subscales && assessment.subscales.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-900">Subscale Scores</h4>
              <div className="space-y-3">
                {assessment.subscales.map((subscale, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{subscale.name}</span>
                      <span className="text-gray-500">
                        {subscale.score}/{subscale.maxScore}
                      </span>
                    </div>
                    <ScoreBar
                      score={Math.round((subscale.score / subscale.maxScore) * 100)}
                      showLabel={false}
                      size="md"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Clinician Notes */}
          {assessment.notes && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-900">Clinician Notes</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {assessment.notes}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" className="flex-1 gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
