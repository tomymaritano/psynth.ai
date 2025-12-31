import { Button } from '@/components/ui/button'
import { FileSearch, Plus } from 'lucide-react'

interface EmptyStateProps {
  hasFilters: boolean
  onClearFilters?: () => void
}

export function EmptyState({ hasFilters, onClearFilters }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <FileSearch className="h-6 w-6 text-gray-400" />
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {hasFilters ? 'No assessments found' : 'No assessments yet'}
      </h3>

      <p className="text-gray-500 max-w-sm mx-auto mb-6">
        {hasFilters
          ? "Try adjusting your search or filter criteria to find what you're looking for."
          : 'Get started by creating your first patient assessment.'}
      </p>

      {hasFilters ? (
        <Button variant="outline" onClick={onClearFilters}>
          Clear Filters
        </Button>
      ) : (
        <Button className="gap-2 bg-primary-600 hover:bg-primary-700">
          <Plus className="h-4 w-4" />
          New Assessment
        </Button>
      )}
    </div>
  )
}
