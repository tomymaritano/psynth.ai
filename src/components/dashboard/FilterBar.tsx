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
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-wrap">
      {/* Search */}
      <div className="relative flex-1 min-w-[240px] max-w-[320px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <Input
          type="text"
          placeholder="Search patients or assessments..."
          value={filters.search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-[38px] h-[38px] text-sm border-gray-300 focus:border-primary-500 focus:ring-primary-100"
          aria-label="Search assessments"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {/* Status Filter */}
        <Select
          value={filters.status || 'all'}
          onValueChange={(value) => onStatusChange(value === 'all' ? '' : value as AssessmentStatus)}
        >
          <SelectTrigger
            className="w-[140px] h-[38px] text-sm font-medium border-gray-300"
            aria-label="Filter by status"
          >
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
          <SelectTrigger
            className="w-[160px] h-[38px] text-sm font-medium border-gray-300"
            aria-label="Filter by assessment type"
          >
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
        <Button
          variant="outline"
          className="h-[38px] gap-2 text-sm font-medium text-gray-700 border-gray-300 hover:border-gray-400"
        >
          <Calendar className="w-4 h-4 text-gray-500" />
          <span>Last 30 days</span>
        </Button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-[38px] text-gray-500 hover:text-gray-700"
            aria-label="Clear all filters"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  )
}
