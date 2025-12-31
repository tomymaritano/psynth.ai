import type { Assessment } from '@/types'
import { formatDate, getInitials } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { StatusBadge } from './StatusBadge'
import { ScoreBar } from './ScoreBar'
import { Eye, Download, MoreHorizontal } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface AssessmentTableProps {
  assessments: Assessment[]
  onSelect: (assessment: Assessment) => void
}

export function AssessmentTable({ assessments, onSelect }: AssessmentTableProps) {
  return (
    <div className="hidden md:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="font-semibold text-gray-700">Patient</TableHead>
            <TableHead className="font-semibold text-gray-700">Assessment Type</TableHead>
            <TableHead className="font-semibold text-gray-700">Status</TableHead>
            <TableHead className="font-semibold text-gray-700 w-[180px]">Score</TableHead>
            <TableHead className="font-semibold text-gray-700">Date</TableHead>
            <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assessments.map((assessment) => (
            <TableRow
              key={assessment.id}
              className="cursor-pointer hover:bg-gray-50 transition-colors"
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
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary-100 text-primary-700 text-sm font-medium">
                      {getInitials(assessment.patient.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">{assessment.patient.name}</p>
                    <p className="text-xs text-gray-500">{assessment.patient.id}</p>
                  </div>
                </div>
              </TableCell>

              {/* Assessment Type */}
              <TableCell>
                <div>
                  <p className="font-medium text-gray-900">{assessment.type}</p>
                  <p className="text-xs text-gray-500">{assessment.id}</p>
                </div>
              </TableCell>

              {/* Status */}
              <TableCell>
                <StatusBadge status={assessment.status} />
              </TableCell>

              {/* Score */}
              <TableCell>
                <ScoreBar score={assessment.score} />
              </TableCell>

              {/* Date */}
              <TableCell>
                <p className="text-sm text-gray-600">{formatDate(assessment.date)}</p>
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => onSelect(assessment)}
                    aria-label="View assessment"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    aria-label="Download assessment"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        aria-label="More options"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="text-error-500">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
