import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { FilterState, AssessmentTypeOption, StatusOption, AssessmentStatus, AssessmentTypeCode } from '@/types'
import { Search, Calendar, X } from 'lucide-react'

interface FilterBarProps {
  filters: FilterState
  assessmentTypes: AssessmentTypeOption[]
  statusOptions: StatusOption[]
  onSearchChange: (search: string) => void
  onStatusChange: (status: AssessmentStatus | '') => void
  onTypeChange: (type: AssessmentTypeCode | '') => void
  onClearFilters: () => void
}

export function FilterBar({
  filters,
  assessmentTypes,
  statusOptions,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  onClearFilters,
}: FilterBarProps) {
  const hasActiveFilters = filters.search || filters.status || filters.type

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search by patient or ID..."
          value={filters.search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
          aria-label="Search assessments"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {/* Status Filter */}
        <Select
          value={filters.status || 'all'}
          onValueChange={(value) => onStatusChange(value === 'all' ? '' : value as AssessmentStatus)}
        >
          <SelectTrigger className="w-[140px]" aria-label="Filter by status">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select
          value={filters.type || 'all'}
          onValueChange={(value) => onTypeChange(value === 'all' ? '' : value as AssessmentTypeCode)}
        >
          <SelectTrigger className="w-[180px]" aria-label="Filter by assessment type">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {assessmentTypes.map((option) => (
              <SelectItem key={option.code} value={option.code}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date Filter (Static/Placeholder) */}
        <Button variant="outline" className="gap-2" disabled>
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">Last 30 days</span>
        </Button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Clear all filters"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  )
}
