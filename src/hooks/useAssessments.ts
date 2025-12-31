import { useState, useMemo, useCallback } from 'react'
import type {
  Assessment,
  DashboardStats,
  FilterState,
  PaginationState,
  AssessmentStatus,
  AssessmentTypeCode,
  AssessmentTypeOption,
  StatusOption
} from '@/types'
import { filterAssessments, paginateItems, getTotalPages } from '@/lib/utils'
import assessmentData from '@/data/assessments.json'

const PAGE_SIZE = 5

interface UseAssessmentsReturn {
  // Data
  data: Assessment[]
  allFilteredData: Assessment[]
  stats: DashboardStats
  assessmentTypes: AssessmentTypeOption[]
  statusOptions: StatusOption[]

  // State
  filters: FilterState
  pagination: PaginationState
  selectedAssessment: Assessment | null
  isLoading: boolean

  // Actions
  setSearch: (search: string) => void
  setStatus: (status: AssessmentStatus | '') => void
  setType: (type: AssessmentTypeCode | '') => void
  setPage: (page: number) => void
  selectAssessment: (assessment: Assessment | null) => void
  clearFilters: () => void
}

const initialFilters: FilterState = {
  search: '',
  status: '',
  type: ''
}

export function useAssessments(): UseAssessmentsReturn {
  // Raw data from JSON
  const rawAssessments = assessmentData.assessments as Assessment[]
  const stats = assessmentData.stats as DashboardStats
  const assessmentTypes = assessmentData.assessmentTypes as AssessmentTypeOption[]
  const statusOptions = assessmentData.statusOptions as StatusOption[]

  // State
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null)
  const [isLoading] = useState(false) // Could be used for async data loading

  // Derived: filtered data
  const allFilteredData = useMemo(() => {
    return filterAssessments(rawAssessments, filters)
  }, [rawAssessments, filters])

  // Derived: paginated data
  const data = useMemo(() => {
    return paginateItems(allFilteredData, currentPage, PAGE_SIZE)
  }, [allFilteredData, currentPage])

  // Derived: pagination state
  const pagination: PaginationState = useMemo(() => ({
    currentPage,
    pageSize: PAGE_SIZE,
    totalItems: allFilteredData.length
  }), [currentPage, allFilteredData.length])

  // Reset to page 1 when filters change
  const updateFiltersAndResetPage = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }, [])

  // Actions
  const setSearch = useCallback((search: string) => {
    updateFiltersAndResetPage({ ...filters, search })
  }, [filters, updateFiltersAndResetPage])

  const setStatus = useCallback((status: AssessmentStatus | '') => {
    updateFiltersAndResetPage({ ...filters, status })
  }, [filters, updateFiltersAndResetPage])

  const setType = useCallback((type: AssessmentTypeCode | '') => {
    updateFiltersAndResetPage({ ...filters, type })
  }, [filters, updateFiltersAndResetPage])

  const setPage = useCallback((page: number) => {
    const totalPages = getTotalPages(allFilteredData.length, PAGE_SIZE)
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }, [allFilteredData.length])

  const selectAssessment = useCallback((assessment: Assessment | null) => {
    setSelectedAssessment(assessment)
  }, [])

  const clearFilters = useCallback(() => {
    updateFiltersAndResetPage(initialFilters)
  }, [updateFiltersAndResetPage])

  return {
    // Data
    data,
    allFilteredData,
    stats,
    assessmentTypes,
    statusOptions,

    // State
    filters,
    pagination,
    selectedAssessment,
    isLoading,

    // Actions
    setSearch,
    setStatus,
    setType,
    setPage,
    selectAssessment,
    clearFilters
  }
}
