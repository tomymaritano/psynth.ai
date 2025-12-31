import { useAssessments } from '@/hooks/useAssessments'
import { Layout } from '@/components/layout'
import {
  StatsGrid,
  FilterBar,
  AssessmentTable,
  AssessmentCardList,
  Pagination,
  MobilePagination,
  EmptyState,
  AssessmentDetail,
} from '@/components/dashboard'
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
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Assessments</h1>
            <p className="text-sm text-gray-500">
              Manage and review patient psychological assessments
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-[18px] py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-md shadow-sm hover:shadow-md transition-all duration-150 sm:self-start">
            <Plus className="w-4 h-4" strokeWidth={2} />
            New Assessment
          </button>
        </div>

        {/* Stats Grid */}
        <div className="mb-6">
          <StatsGrid stats={stats} />
        </div>

        {/* Filter Bar */}
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
          {/* Desktop Table + Pagination */}
          <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
            <AssessmentTable
              assessments={data}
              onSelect={selectAssessment}
            />
            <Pagination
              pagination={pagination}
              onPageChange={setPage}
            />
          </div>

          {/* Mobile Cards */}
          <AssessmentCardList
            assessments={data}
            onSelect={selectAssessment}
          />

          {/* Mobile Pagination */}
          <MobilePagination
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
