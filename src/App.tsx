import { useAssessments } from '@/hooks/useAssessments'
import { Layout } from '@/components/layout'
import {
  StatsGrid,
  FilterBar,
  AssessmentTable,
  AssessmentCardList,
  Pagination,
  EmptyState,
  AssessmentDetail,
} from '@/components/dashboard'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

function App() {
  const {
    data,
    allFilteredData,
    stats,
    filters,
    pagination,
    assessmentTypes,
    statusOptions,
    selectedAssessment,
    setSearch,
    setStatus,
    setType,
    setPage,
    selectAssessment,
    clearFilters,
  } = useAssessments()

  const hasActiveFilters = !!(filters.search || filters.status || filters.type)
  const isEmpty = allFilteredData.length === 0

  return (
    <Layout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assessments</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and review patient psychological assessments
          </p>
        </div>
        <Button className="gap-2 bg-primary-600 hover:bg-primary-700 sm:self-start">
          <Plus className="h-4 w-4" />
          New Assessment
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="mb-6">
        <StatsGrid stats={stats} />
      </div>

      {/* Filter Bar */}
      <div className="mb-6">
        <FilterBar
          filters={filters}
          assessmentTypes={assessmentTypes}
          statusOptions={statusOptions}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onTypeChange={setType}
          onClearFilters={clearFilters}
        />
      </div>

      {/* Content */}
      {isEmpty ? (
        <EmptyState hasFilters={hasActiveFilters} onClearFilters={clearFilters} />
      ) : (
        <>
          {/* Desktop Table */}
          <AssessmentTable
            assessments={data}
            onSelect={selectAssessment}
          />

          {/* Mobile Cards */}
          <AssessmentCardList
            assessments={data}
            onSelect={selectAssessment}
          />

          {/* Pagination */}
          <Pagination
            pagination={pagination}
            onPageChange={setPage}
          />
        </>
      )}

      {/* Detail Panel */}
      <AssessmentDetail
        assessment={selectedAssessment}
        onClose={() => selectAssessment(null)}
      />
    </Layout>
  )
}

export default App
