import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import type { FilterState, AssessmentTypeOption, StatusOption, AssessmentStatus, AssessmentTypeCode } from '@/types'
import { Search, Calendar, X, Check } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'
import { cn } from '@/lib/utils'

type DatePreset = 'all' | '7' | '30' | '90'

interface FilterBarProps {
  filters: FilterState
  assessmentTypes: AssessmentTypeOption[]
  statusOptions: StatusOption[]
  onSearchChange: (search: string) => void
  onStatusChange: (status: AssessmentStatus | '') => void
  onTypeChange: (type: AssessmentTypeCode | '') => void
  onDateRangeChange: (start: Date | null, end: Date | null) => void
  onClearFilters: () => void
}

const datePresets: { value: DatePreset; label: string; days: number | null }[] = [
  { value: 'all', label: 'All time', days: null },
  { value: '7', label: 'Last 7 days', days: 7 },
  { value: '30', label: 'Last 30 days', days: 30 },
  { value: '90', label: 'Last 90 days', days: 90 },
]

function getDatePresetFromFilter(dateRange: FilterState['dateRange']): DatePreset {
  if (!dateRange?.start) return 'all'

  const now = new Date()
  const diffDays = Math.round((now.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays <= 7) return '7'
  if (diffDays <= 30) return '30'
  if (diffDays <= 90) return '90'
  return 'all'
}

export function FilterBar({
  filters,
  assessmentTypes,
  statusOptions,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  onDateRangeChange,
  onClearFilters,
}: FilterBarProps) {
  // Local state for immediate search input feedback
  const [localSearch, setLocalSearch] = useState(filters.search)
  const debouncedSearch = useDebounce(localSearch, 300)

  // Date filter state
  const [datePreset, setDatePreset] = useState<DatePreset>(() => getDatePresetFromFilter(filters.dateRange))
  const [isDateOpen, setIsDateOpen] = useState(false)

  // Sync debounced search with parent
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      onSearchChange(debouncedSearch)
    }
  }, [debouncedSearch, filters.search, onSearchChange])

  // Sync local search when filters are cleared externally
  useEffect(() => {
    if (filters.search === '' && localSearch !== '') {
      setLocalSearch('')
    }
  }, [filters.search, localSearch])

  // Sync date preset when filters change externally
  useEffect(() => {
    setDatePreset(getDatePresetFromFilter(filters.dateRange))
  }, [filters.dateRange])

  const handleDatePresetChange = (preset: DatePreset) => {
    setDatePreset(preset)
    setIsDateOpen(false)

    if (preset === 'all') {
      onDateRangeChange(null, null)
    } else {
      const days = datePresets.find(p => p.value === preset)?.days || 30
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - days)
      onDateRangeChange(start, end)
    }
  }

  const hasActiveFilters = filters.search || filters.status || filters.type || filters.dateRange
  const currentDateLabel = datePresets.find(p => p.value === datePreset)?.label || 'All time'

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-wrap">
      {/* Search with debounce */}
      <div className="relative flex-1 min-w-[240px] max-w-[320px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <Input
          type="text"
          placeholder="Search patients or assessments..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
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

        {/* Date Filter */}
        <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "h-[38px] gap-2 text-sm font-medium border-gray-300 hover:border-gray-400",
                datePreset !== 'all' ? "text-primary-700 border-primary-300 bg-primary-50" : "text-gray-700"
              )}
              aria-label="Filter by date range"
            >
              <Calendar className="w-4 h-4" />
              <span>{currentDateLabel}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[180px] p-1" align="start">
            <div className="flex flex-col">
              {datePresets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => handleDatePresetChange(preset.value)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors",
                    datePreset === preset.value ? "text-primary-700 font-medium" : "text-gray-700"
                  )}
                >
                  {preset.label}
                  {datePreset === preset.value && (
                    <Check className="w-4 h-4 text-primary-600" />
                  )}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setLocalSearch('')
              setDatePreset('all')
              onClearFilters()
            }}
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
