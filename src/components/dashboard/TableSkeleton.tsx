import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

function TableRowSkeleton() {
  return (
    <TableRow className="hover:bg-transparent">
      {/* Patient */}
      <TableCell className="py-4 px-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full skeleton" />
          <div className="flex flex-col gap-1.5">
            <div className="w-28 h-4 rounded skeleton" />
            <div className="w-20 h-3 rounded skeleton" />
          </div>
        </div>
      </TableCell>

      {/* Assessment Type */}
      <TableCell className="py-4 px-5">
        <div className="w-16 h-4 rounded skeleton" />
      </TableCell>

      {/* Status */}
      <TableCell className="py-4 px-5">
        <div className="w-20 h-6 rounded-full skeleton" />
      </TableCell>

      {/* Score */}
      <TableCell className="py-4 px-5">
        <div className="w-8 h-4 rounded skeleton" />
      </TableCell>

      {/* Date */}
      <TableCell className="py-4 px-5">
        <div className="w-24 h-4 rounded skeleton" />
      </TableCell>

      {/* Actions */}
      <TableCell className="py-4 px-5">
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 rounded skeleton" />
          <div className="w-8 h-8 rounded skeleton" />
          <div className="w-8 h-8 rounded skeleton" />
        </div>
      </TableCell>
    </TableRow>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-50 hover:bg-gray-50">
          <TableHead className="py-3.5 px-5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            Patient
          </TableHead>
          <TableHead className="py-3.5 px-5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            Type
          </TableHead>
          <TableHead className="py-3.5 px-5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            Status
          </TableHead>
          <TableHead className="py-3.5 px-5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            Score
          </TableHead>
          <TableHead className="py-3.5 px-5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            Date
          </TableHead>
          <TableHead className="py-3.5 px-5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, i) => (
          <TableRowSkeleton key={i} />
        ))}
      </TableBody>
    </Table>
  )
}
