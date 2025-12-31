import type { PaginationState } from '@/types'
import { cn, getPageNumbers, getTotalPages } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  pagination: PaginationState
  onPageChange: (page: number) => void
}

export function Pagination({ pagination, onPageChange }: PaginationProps) {
  const { currentPage, pageSize, totalItems } = pagination
  const totalPages = getTotalPages(totalItems, pageSize)
  const pageNumbers = getPageNumbers(currentPage, totalPages)

  if (totalItems === 0) return null

  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  return (
    <div className="hidden md:flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
      {/* Results Info */}
      <span className="text-[13px] text-gray-500">
        Showing {startItem}-{endItem} of {totalItems} assessments
      </span>

      {/* Page Controls */}
      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            'w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 text-sm font-medium transition-all duration-150',
            currentPage === 1
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-100 hover:border-gray-400'
          )}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={2} />
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((pageNum, index) =>
          pageNum === null ? (
            <button
              key={`ellipsis-${index}`}
              className="w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 text-sm font-medium"
              disabled
            >
              ...
            </button>
          ) : (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={cn(
                'w-9 h-9 flex items-center justify-center rounded-md border text-sm font-medium transition-all duration-150',
                pageNum === currentPage
                  ? 'bg-primary-600 border-primary-600 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:border-gray-400'
              )}
              aria-label={`Page ${pageNum}`}
              aria-current={pageNum === currentPage ? 'page' : undefined}
            >
              {pageNum}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            'w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 text-sm font-medium transition-all duration-150',
            currentPage === totalPages
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-100 hover:border-gray-400'
          )}
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}

// Mobile pagination component
export function MobilePagination({ pagination, onPageChange }: PaginationProps) {
  const { currentPage, pageSize, totalItems } = pagination
  const totalPages = getTotalPages(totalItems, pageSize)

  if (totalItems === 0) return null

  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  return (
    <div className="md:hidden flex flex-col items-center gap-3 py-4">
      {/* Results Info */}
      <span className="text-[13px] text-gray-500">
        Showing {startItem}-{endItem} of {totalItems} assessments
      </span>

      {/* Simple prev/next controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            'px-4 py-2 flex items-center gap-1 rounded-md border border-gray-300 bg-white text-gray-700 text-sm font-medium transition-all duration-150',
            currentPage === 1
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-100 hover:border-gray-400'
          )}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={2} />
          Previous
        </button>

        <span className="px-4 text-sm text-gray-500">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            'px-4 py-2 flex items-center gap-1 rounded-md border border-gray-300 bg-white text-gray-700 text-sm font-medium transition-all duration-150',
            currentPage === totalPages
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-gray-100 hover:border-gray-400'
          )}
          aria-label="Next page"
        >
          Next
          <ChevronRight className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
