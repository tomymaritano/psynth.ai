/**
 * Utility Functions for AssessFlow Dashboard
 * 
 * These are optional helper functions candidates can use.
 * Feel free to modify or create your own implementations.
 */

import type { 
  Assessment, 
  FilterState, 
  ScoreRange, 
  AssessmentStatus 
} from './types';

// ============================================
// Score Utilities
// ============================================

/**
 * Determines the score range category based on the numeric score
 * Used for color-coding score displays
 * 
 * @param score - The numeric score (0-100)
 * @returns The score range category
 * 
 * @example
 * getScoreRange(72) // returns 'high'
 * getScoreRange(45) // returns 'medium'
 * getScoreRange(28) // returns 'low'
 */
export function getScoreRange(score: number): ScoreRange {
  // High: >= 60 (green)
  // Medium: 40-59 (yellow/warning)
  // Low: < 40 (red/error)
  if (score >= 60) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

/**
 * Returns Tailwind classes for score-based colors
 * 
 * @param score - The numeric score (0-100)
 * @returns Object with Tailwind color classes for bar and text
 */
export function getScoreColors(score: number): { bar: string; text: string } {
  const range = getScoreRange(score);
  
  // Map score ranges to Tailwind color classes
  const colorMap = {
    high: {
      bar: 'bg-emerald-500',   // --color-success-500
      text: 'text-emerald-700' // --color-success-700
    },
    medium: {
      bar: 'bg-amber-500',     // --color-warning-500
      text: 'text-amber-700'   // --color-warning-700
    },
    low: {
      bar: 'bg-red-500',       // --color-error-500
      text: 'text-red-700'     // --color-error-700
    }
  };
  
  return colorMap[range];
}

// ============================================
// Date Utilities
// ============================================

/**
 * Formats an ISO date string to display format
 * 
 * @param isoDate - ISO date string (e.g., "2024-12-08T14:30:00Z")
 * @returns Formatted date string (e.g., "Dec 8, 2024")
 * 
 * @example
 * formatDate("2024-12-08T14:30:00Z") // returns "Dec 8, 2024"
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Formats an ISO date string to time format
 * 
 * @param isoDate - ISO date string
 * @returns Formatted time string (e.g., "2:30 PM")
 * 
 * @example
 * formatTime("2024-12-08T14:30:00Z") // returns "2:30 PM"
 */
export function formatTime(isoDate: string): string {
  const date = new Date(isoDate);
  
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Formats an ISO date string to combined date and time
 * 
 * @param isoDate - ISO date string
 * @returns Combined format (e.g., "Dec 8, 2024 • 2:30 PM")
 */
export function formatDateTime(isoDate: string): string {
  return `${formatDate(isoDate)} • ${formatTime(isoDate)}`;
}

/**
 * Checks if a date is within the last N days
 * 
 * @param isoDate - ISO date string to check
 * @param days - Number of days to look back
 * @returns True if the date is within the specified range
 */
export function isWithinDays(isoDate: string, days: number): boolean {
  const date = new Date(isoDate);
  const now = new Date();
  const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  
  return date >= cutoff;
}

// ============================================
// Filter Utilities
// ============================================

/**
 * Filters assessments based on the current filter state
 * 
 * @param assessments - Array of assessments to filter
 * @param filters - Current filter state
 * @returns Filtered array of assessments
 */
export function filterAssessments(
  assessments: Assessment[],
  filters: FilterState
): Assessment[] {
  return assessments.filter(assessment => {
    // Search filter - checks patient name and assessment ID
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        assessment.patient.name.toLowerCase().includes(searchLower) ||
        assessment.patient.id.toLowerCase().includes(searchLower) ||
        assessment.id.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }
    
    // Status filter
    if (filters.status && assessment.status !== filters.status) {
      return false;
    }
    
    // Type filter
    if (filters.type && assessment.typeCode !== filters.type) {
      return false;
    }
    
    // Date range filter (optional)
    if (filters.dateRange?.start || filters.dateRange?.end) {
      const assessmentDate = new Date(assessment.date);
      
      if (filters.dateRange.start && assessmentDate < filters.dateRange.start) {
        return false;
      }
      
      if (filters.dateRange.end && assessmentDate > filters.dateRange.end) {
        return false;
      }
    }
    
    return true;
  });
}

// ============================================
// Pagination Utilities
// ============================================

/**
 * Paginates an array of items
 * 
 * @param items - Array of items to paginate
 * @param page - Current page number (1-indexed)
 * @param pageSize - Number of items per page
 * @returns Paginated array
 */
export function paginateItems<T>(
  items: T[],
  page: number,
  pageSize: number
): T[] {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  
  return items.slice(startIndex, endIndex);
}

/**
 * Calculates total number of pages
 * 
 * @param totalItems - Total number of items
 * @param pageSize - Number of items per page
 * @returns Total number of pages
 */
export function getTotalPages(totalItems: number, pageSize: number): number {
  return Math.ceil(totalItems / pageSize);
}

/**
 * Generates an array of page numbers for pagination display
 * Shows first, last, and pages around current page
 * 
 * @param currentPage - Current page number
 * @param totalPages - Total number of pages
 * @param maxVisible - Maximum number of page buttons to show
 * @returns Array of page numbers or null for ellipsis
 */
export function getPageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 7
): (number | null)[] {
  if (totalPages <= maxVisible) {
    // Show all pages if total is small
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  
  const pages: (number | null)[] = [];
  
  // Always show first page
  pages.push(1);
  
  // Calculate range around current page
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  
  // Add ellipsis after first page if needed
  if (start > 2) {
    pages.push(null);
  }
  
  // Add pages around current
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  // Add ellipsis before last page if needed
  if (end < totalPages - 1) {
    pages.push(null);
  }
  
  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }
  
  return pages;
}

// ============================================
// Status Utilities
// ============================================

/**
 * Returns the display label for a status
 * 
 * @param status - Assessment status value
 * @returns Human-readable status label
 */
export function getStatusLabel(status: AssessmentStatus): string {
  const labels: Record<AssessmentStatus, string> = {
    'completed': 'Completed',
    'in-progress': 'In Progress',
    'pending': 'Pending',
    'cancelled': 'Cancelled'
  };
  
  return labels[status];
}

/**
 * Returns Tailwind classes for status badge styling
 * 
 * @param status - Assessment status value
 * @returns Object with background and text color classes
 */
export function getStatusColors(status: AssessmentStatus): { 
  bg: string; 
  text: string; 
  dot: string 
} {
  const colorMap: Record<AssessmentStatus, { bg: string; text: string; dot: string }> = {
    'completed': {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      dot: 'bg-emerald-500'
    },
    'in-progress': {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      dot: 'bg-blue-500'
    },
    'pending': {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      dot: 'bg-amber-500'
    },
    'cancelled': {
      bg: 'bg-gray-100',
      text: 'text-gray-600',
      dot: 'bg-gray-400'
    }
  };
  
  return colorMap[status];
}

// ============================================
// String Utilities
// ============================================

/**
 * Generates initials from a full name
 * 
 * @param name - Full name string
 * @returns Two-letter initials
 * 
 * @example
 * getInitials("Emily Martinez") // returns "EM"
 * getInitials("John") // returns "JO"
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(' ').filter(Boolean);
  
  if (parts.length === 0) return '??';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Truncates a string to a maximum length with ellipsis
 * 
 * @param str - String to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated string with ellipsis if needed
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength - 3) + '...';
}

// ============================================
// Class Name Utilities
// ============================================

/**
 * Conditionally joins class names together
 * Similar to the `clsx` or `classnames` library
 * 
 * @param classes - Class names or conditional class objects
 * @returns Joined class string
 * 
 * @example
 * cn('base-class', isActive && 'active', { 'disabled': isDisabled })
 * // returns "base-class active" if isActive is true and isDisabled is false
 */
export function cn(
  ...classes: (string | boolean | undefined | null | Record<string, boolean>)[]
): string {
  return classes
    .flatMap(cls => {
      if (!cls) return [];
      if (typeof cls === 'string') return cls;
      if (typeof cls === 'object') {
        return Object.entries(cls)
          .filter(([, value]) => value)
          .map(([key]) => key);
      }
      return [];
    })
    .join(' ');
}
