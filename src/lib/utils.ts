import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Assessment, FilterState, AssessmentStatus } from "@/types"

// ============================================
// Class Name Utilities (ShadCN)
// ============================================

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ============================================
// Score Utilities
// ============================================

export type ScoreRange = 'high' | 'medium' | 'low'

export function getScoreRange(score: number): ScoreRange {
  if (score >= 60) return 'high'
  if (score >= 40) return 'medium'
  return 'low'
}

export function getScoreColors(score: number): { bar: string; text: string } {
  const range = getScoreRange(score)

  const colorMap = {
    high: {
      bar: 'bg-success-500',
      text: 'text-success-700'
    },
    medium: {
      bar: 'bg-warning-500',
      text: 'text-warning-700'
    },
    low: {
      bar: 'bg-error-500',
      text: 'text-error-700'
    }
  }

  return colorMap[range]
}

// ============================================
// Date Utilities
// ============================================

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate)

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export function formatTime(isoDate: string): string {
  const date = new Date(isoDate)

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

export function formatDateTime(isoDate: string): string {
  return `${formatDate(isoDate)} • ${formatTime(isoDate)}`
}

export function isWithinDays(isoDate: string, days: number): boolean {
  const date = new Date(isoDate)
  const now = new Date()
  const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

  return date >= cutoff
}

// ============================================
// Filter Utilities
// ============================================

export function filterAssessments(
  assessments: Assessment[],
  filters: FilterState
): Assessment[] {
  return assessments.filter(assessment => {
    // Search filter - checks patient name and assessment ID
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchesSearch =
        assessment.patient.name.toLowerCase().includes(searchLower) ||
        assessment.patient.id.toLowerCase().includes(searchLower) ||
        assessment.id.toLowerCase().includes(searchLower)

      if (!matchesSearch) return false
    }

    // Status filter
    if (filters.status && assessment.status !== filters.status) {
      return false
    }

    // Type filter
    if (filters.type && assessment.typeCode !== filters.type) {
      return false
    }

    // Date range filter (optional)
    if (filters.dateRange?.start || filters.dateRange?.end) {
      const assessmentDate = new Date(assessment.date)

      if (filters.dateRange.start && assessmentDate < filters.dateRange.start) {
        return false
      }

      if (filters.dateRange.end && assessmentDate > filters.dateRange.end) {
        return false
      }
    }

    return true
  })
}

// ============================================
// Pagination Utilities
// ============================================

export function paginateItems<T>(
  items: T[],
  page: number,
  pageSize: number
): T[] {
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize

  return items.slice(startIndex, endIndex)
}

export function getTotalPages(totalItems: number, pageSize: number): number {
  return Math.ceil(totalItems / pageSize)
}

export function getPageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 7
): (number | null)[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages: (number | null)[] = []

  // Always show first page
  pages.push(1)

  // Calculate range around current page
  const start = Math.max(2, currentPage - 1)
  const end = Math.min(totalPages - 1, currentPage + 1)

  // Add ellipsis after first page if needed
  if (start > 2) {
    pages.push(null)
  }

  // Add pages around current
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  // Add ellipsis before last page if needed
  if (end < totalPages - 1) {
    pages.push(null)
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages)
  }

  return pages
}

// ============================================
// Status Utilities
// ============================================

export function getStatusLabel(status: AssessmentStatus): string {
  const labels: Record<AssessmentStatus, string> = {
    'completed': 'Completed',
    'in-progress': 'In Progress',
    'pending': 'Pending',
    'cancelled': 'Cancelled'
  }

  return labels[status]
}

export function getStatusColors(status: AssessmentStatus): {
  bg: string
  text: string
  dot: string
} {
  const colorMap: Record<AssessmentStatus, { bg: string; text: string; dot: string }> = {
    'completed': {
      bg: 'bg-success-50',
      text: 'text-success-700',
      dot: 'bg-success-500'
    },
    'in-progress': {
      bg: 'bg-info-50',
      text: 'text-info-700',
      dot: 'bg-info-500'
    },
    'pending': {
      bg: 'bg-warning-50',
      text: 'text-warning-700',
      dot: 'bg-warning-500'
    },
    'cancelled': {
      bg: 'bg-gray-100',
      text: 'text-gray-600',
      dot: 'bg-gray-400'
    }
  }

  return colorMap[status]
}

// ============================================
// String Utilities
// ============================================

export function getInitials(name: string): string {
  const parts = name.trim().split(' ').filter(Boolean)

  if (parts.length === 0) return '??'
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.substring(0, maxLength - 3) + '...'
}
