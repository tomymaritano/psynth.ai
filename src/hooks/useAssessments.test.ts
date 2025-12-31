import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAssessments } from './useAssessments'

describe('useAssessments hook', () => {
  // Test 1: Combined filters work correctly
  describe('combined filters', () => {
    it('should filter by search term', () => {
      const { result } = renderHook(() => useAssessments())

      act(() => {
        result.current.setSearch('Emily')
      })

      expect(result.current.allFilteredData.length).toBeGreaterThan(0)
      expect(
        result.current.allFilteredData.every(a =>
          a.patient.name.toLowerCase().includes('emily')
        )
      ).toBe(true)
    })

    it('should filter by status', () => {
      const { result } = renderHook(() => useAssessments())

      act(() => {
        result.current.setStatus('completed')
      })

      expect(result.current.allFilteredData.length).toBeGreaterThan(0)
      expect(
        result.current.allFilteredData.every(a => a.status === 'completed')
      ).toBe(true)
    })

    it('should filter by type', () => {
      const { result } = renderHook(() => useAssessments())

      act(() => {
        result.current.setType('mmpi')
      })

      expect(result.current.allFilteredData.length).toBeGreaterThan(0)
      expect(
        result.current.allFilteredData.every(a => a.typeCode === 'mmpi')
      ).toBe(true)
    })

    it('should combine multiple filters', () => {
      const { result } = renderHook(() => useAssessments())

      act(() => {
        result.current.setStatus('completed')
      })
      act(() => {
        result.current.setType('mmpi')
      })

      expect(
        result.current.allFilteredData.every(
          a => a.status === 'completed' && a.typeCode === 'mmpi'
        )
      ).toBe(true)
    })

    it('should return empty array when no results match', () => {
      const { result } = renderHook(() => useAssessments())

      act(() => {
        result.current.setSearch('nonexistent-patient-xyz')
      })

      expect(result.current.allFilteredData.length).toBe(0)
      expect(result.current.data.length).toBe(0)
    })
  })

  // Test 2: Pagination respects limits
  describe('pagination', () => {
    it('should return 5 items per page', () => {
      const { result } = renderHook(() => useAssessments())

      expect(result.current.data.length).toBeLessThanOrEqual(5)
      expect(result.current.pagination.pageSize).toBe(5)
    })

    it('should navigate to next page', () => {
      const { result } = renderHook(() => useAssessments())

      const initialFirstItem = result.current.data[0]

      act(() => {
        result.current.setPage(2)
      })

      expect(result.current.pagination.currentPage).toBe(2)
      expect(result.current.data[0]).not.toEqual(initialFirstItem)
    })

    it('should not navigate beyond last page', () => {
      const { result } = renderHook(() => useAssessments())
      const totalPages = Math.ceil(
        result.current.pagination.totalItems / result.current.pagination.pageSize
      )

      act(() => {
        result.current.setPage(totalPages + 10)
      })

      // Should stay at page 1 since the invalid page was rejected
      expect(result.current.pagination.currentPage).toBe(1)
    })

    it('should not navigate to page 0 or negative', () => {
      const { result } = renderHook(() => useAssessments())

      act(() => {
        result.current.setPage(0)
      })

      expect(result.current.pagination.currentPage).toBe(1)

      act(() => {
        result.current.setPage(-1)
      })

      expect(result.current.pagination.currentPage).toBe(1)
    })

    it('should reset to page 1 when filters change', () => {
      const { result } = renderHook(() => useAssessments())

      act(() => {
        result.current.setPage(2)
      })

      expect(result.current.pagination.currentPage).toBe(2)

      act(() => {
        result.current.setSearch('test')
      })

      expect(result.current.pagination.currentPage).toBe(1)
    })
  })

  // Test 3: Search by name AND by ID
  describe('search functionality', () => {
    it('should search by patient name', () => {
      const { result } = renderHook(() => useAssessments())

      act(() => {
        result.current.setSearch('Emily')
      })

      expect(result.current.allFilteredData.length).toBeGreaterThan(0)
      expect(
        result.current.allFilteredData.some(a =>
          a.patient.name.toLowerCase().includes('emily')
        )
      ).toBe(true)
    })

    it('should search by assessment ID', () => {
      const { result } = renderHook(() => useAssessments())

      act(() => {
        result.current.setSearch('ASM-2024')
      })

      expect(result.current.allFilteredData.length).toBeGreaterThan(0)
      expect(
        result.current.allFilteredData.some(a =>
          a.id.toLowerCase().includes('asm-2024')
        )
      ).toBe(true)
    })

    it('should search by patient ID', () => {
      const { result } = renderHook(() => useAssessments())

      act(() => {
        result.current.setSearch('PAT-')
      })

      expect(result.current.allFilteredData.length).toBeGreaterThan(0)
      expect(
        result.current.allFilteredData.some(a =>
          a.patient.id.toLowerCase().includes('pat-')
        )
      ).toBe(true)
    })

    it('should be case insensitive', () => {
      const { result } = renderHook(() => useAssessments())

      act(() => {
        result.current.setSearch('EMILY')
      })

      const upperCaseResults = result.current.allFilteredData.length

      act(() => {
        result.current.setSearch('emily')
      })

      expect(result.current.allFilteredData.length).toBe(upperCaseResults)
    })

    it('should show all results when search is empty', () => {
      const { result } = renderHook(() => useAssessments())
      const totalWithoutFilter = result.current.allFilteredData.length

      act(() => {
        result.current.setSearch('test')
      })

      act(() => {
        result.current.setSearch('')
      })

      expect(result.current.allFilteredData.length).toBe(totalWithoutFilter)
    })
  })

  // Test 4: Selection/deselection of assessment
  describe('assessment selection', () => {
    it('should select an assessment', () => {
      const { result } = renderHook(() => useAssessments())
      const firstAssessment = result.current.data[0]

      act(() => {
        result.current.selectAssessment(firstAssessment)
      })

      expect(result.current.selectedAssessment).toEqual(firstAssessment)
    })

    it('should deselect by passing null', () => {
      const { result } = renderHook(() => useAssessments())
      const firstAssessment = result.current.data[0]

      act(() => {
        result.current.selectAssessment(firstAssessment)
      })

      expect(result.current.selectedAssessment).not.toBeNull()

      act(() => {
        result.current.selectAssessment(null)
      })

      expect(result.current.selectedAssessment).toBeNull()
    })

    it('should allow selecting a different assessment', () => {
      const { result } = renderHook(() => useAssessments())
      const firstAssessment = result.current.data[0]
      const secondAssessment = result.current.data[1]

      act(() => {
        result.current.selectAssessment(firstAssessment)
      })

      act(() => {
        result.current.selectAssessment(secondAssessment)
      })

      expect(result.current.selectedAssessment).toEqual(secondAssessment)
    })
  })

  // Additional: Clear filters
  describe('clear filters', () => {
    it('should reset all filters', () => {
      const { result } = renderHook(() => useAssessments())

      act(() => {
        result.current.setSearch('test')
        result.current.setStatus('completed')
        result.current.setType('mmpi')
      })

      act(() => {
        result.current.clearFilters()
      })

      expect(result.current.filters.search).toBe('')
      expect(result.current.filters.status).toBe('')
      expect(result.current.filters.type).toBe('')
    })
  })
})
