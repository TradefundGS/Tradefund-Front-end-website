// components/PaginationComponent.tsx
"use client"

import { Button } from "@/components/ui/button"

interface PaginationComponentProps {
  canPreviousPage: boolean
  canNextPage: boolean
  previousPage: () => void
  nextPage: () => void
  selectedRowCount: number
  totalRowCount: number
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
  selectedRowCount,
  totalRowCount,
}) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        {/* {selectedRowCount} of {totalRowCount} row(s) selected. */}
      </div>
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={previousPage}
          disabled={!canPreviousPage}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={!canNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default PaginationComponent
