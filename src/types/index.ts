/**
 * TypeScript Type Definitions for AssessFlow Dashboard
 * 
 * These types match the structure of the mock data provided in assessments.json.
 * Candidates can use these directly or adapt them as needed.
 */

// ============================================
// Patient Types
// ============================================

/**
 * Represents a patient in the system
 */
export interface Patient {
  /** Unique patient identifier (e.g., "PAT-2024-0892") */
  id: string;
  /** Full name of the patient */
  name: string;
  /** Two-letter initials for avatar display */
  initials: string;
  /** Date of birth in ISO format */
  dateOfBirth: string;
  /** Patient's email address */
  email: string;
}

// ============================================
// Assessment Types
// ============================================

/**
 * Possible status values for an assessment
 */
export type AssessmentStatus = 'completed' | 'in-progress' | 'pending' | 'cancelled';

/**
 * Code values for different assessment types
 */
export type AssessmentTypeCode = 'mmpi' | 'beck' | 'anxiety' | 'personality';

/**
 * Represents a clinician/administrator
 */
export interface Clinician {
  /** Unique identifier for the clinician */
  id: string;
  /** Full name with title (e.g., "Dr. Rebecca Torres") */
  name: string;
  /** Professional title */
  title: string;
}

/**
 * Represents a subscale within an assessment
 */
export interface Subscale {
  /** Name of the subscale (e.g., "Validity Scale (L)") */
  name: string;
  /** Score achieved on this subscale */
  score: number;
  /** Maximum possible score */
  maxScore: number;
}

/**
 * Main assessment record
 */
export interface Assessment {
  /** Unique assessment identifier (e.g., "ASM-2024-001") */
  id: string;
  /** Patient who took this assessment */
  patient: Patient;
  /** Display name of assessment type (e.g., "MMPI-2") */
  type: string;
  /** Code for filtering (e.g., "mmpi") */
  typeCode: AssessmentTypeCode;
  /** Current status of the assessment */
  status: AssessmentStatus;
  /** Overall score (null if not completed) */
  score: number | null;
  /** Human-readable interpretation of score */
  scoreInterpretation: string | null;
  /** Date/time of assessment in ISO format */
  date: string;
  /** Duration of assessment (e.g., "1h 45m") or null if not completed */
  duration: string | null;
  /** Clinician who administered the assessment */
  administeredBy: Clinician;
  /** Individual subscale scores */
  subscales: Subscale[];
  /** Clinician notes about the assessment */
  notes: string;
}

// ============================================
// Dashboard Stats Types
// ============================================

/**
 * Statistics shown in the dashboard header cards
 */
export interface DashboardStats {
  /** Total number of assessments */
  totalAssessments: number;
  /** Percentage change in total assessments (positive or negative) */
  totalAssessmentsTrend: number;
  /** Number of completed assessments */
  completed: number;
  /** Percentage change in completed assessments */
  completedTrend: number;
  /** Number of assessments in progress */
  inProgress: number;
  /** Percentage change in in-progress assessments */
  inProgressTrend: number;
  /** Number of unique active patients */
  activePatients: number;
}

// ============================================
// Filter & UI Types
// ============================================

/**
 * Assessment type option for the type filter dropdown
 */
export interface AssessmentTypeOption {
  /** Code used for filtering */
  code: AssessmentTypeCode;
  /** Display name */
  name: string;
  /** Full descriptive name */
  fullName: string;
}

/**
 * Status option for the status filter dropdown
 */
export interface StatusOption {
  /** Value used for filtering */
  value: AssessmentStatus;
  /** Display label */
  label: string;
}

/**
 * Current filter state for the assessment list
 */
export interface FilterState {
  /** Search query string */
  search: string;
  /** Selected status filter (empty string = all) */
  status: AssessmentStatus | '';
  /** Selected type filter (empty string = all) */
  type: AssessmentTypeCode | '';
  /** Date range for filtering (optional implementation) */
  dateRange?: {
    start: Date | null;
    end: Date | null;
  };
}

/**
 * Pagination state
 */
export interface PaginationState {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Number of items per page */
  pageSize: number;
  /** Total number of items */
  totalItems: number;
}

// ============================================
// Complete Data Structure
// ============================================

/**
 * Complete data structure from the mock data file
 */
export interface AssessmentData {
  /** Dashboard statistics */
  stats: DashboardStats;
  /** List of all assessments */
  assessments: Assessment[];
  /** Available assessment types for filtering */
  assessmentTypes: AssessmentTypeOption[];
  /** Available status options for filtering */
  statusOptions: StatusOption[];
}

// ============================================
// Component Props Types (Examples)
// ============================================

/**
 * Props for the StatsCard component
 */
export interface StatsCardProps {
  /** Title/label for the stat */
  label: string;
  /** Main value to display */
  value: number;
  /** Trend percentage (positive or negative) */
  trend?: number;
  /** Icon variant */
  icon: 'document' | 'check' | 'clock' | 'users';
  /** Color theme for the icon */
  iconColor: 'blue' | 'green' | 'yellow' | 'purple';
}

/**
 * Props for the StatusBadge component
 */
export interface StatusBadgeProps {
  /** Status to display */
  status: AssessmentStatus;
}

/**
 * Props for the ScoreBar component
 */
export interface ScoreBarProps {
  /** Score value (0-100) */
  score: number | null;
  /** Whether to show the numeric value */
  showValue?: boolean;
}

/**
 * Props for the AssessmentTable component
 */
export interface AssessmentTableProps {
  /** List of assessments to display */
  assessments: Assessment[];
  /** Callback when a row is clicked */
  onRowClick: (assessment: Assessment) => void;
  /** Currently loading state */
  isLoading?: boolean;
}

/**
 * Props for the AssessmentDetail slide-over panel
 */
export interface AssessmentDetailProps {
  /** Assessment to display (null when closed) */
  assessment: Assessment | null;
  /** Whether the panel is open */
  isOpen: boolean;
  /** Callback to close the panel */
  onClose: () => void;
}

/**
 * Props for the FilterBar component
 */
export interface FilterBarProps {
  /** Current filter values */
  filters: FilterState;
  /** Callback when filters change */
  onFilterChange: (filters: FilterState) => void;
  /** Available assessment types */
  assessmentTypes: AssessmentTypeOption[];
  /** Available status options */
  statusOptions: StatusOption[];
}

/**
 * Props for the Pagination component
 */
export interface PaginationProps {
  /** Current pagination state */
  pagination: PaginationState;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
}

// ============================================
// Utility Types
// ============================================

/**
 * Helper type for score ranges
 */
export type ScoreRange = 'high' | 'medium' | 'low';

/**
 * Helper function type for determining score range
 */
export type GetScoreRange = (score: number) => ScoreRange;

/**
 * Sort direction
 */
export type SortDirection = 'asc' | 'desc';

/**
 * Sortable columns in the assessment table
 */
export type SortableColumn = 'patient' | 'type' | 'status' | 'score' | 'date';
