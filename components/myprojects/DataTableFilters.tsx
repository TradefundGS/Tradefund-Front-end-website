// components/DataTableFilters.tsx
"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

interface DataTableFiltersProps {
  emailFilterValue: string
  onEmailFilterChange: (value: string) => void
  columns: any
  onColumnVisibilityChange: (columnId: string, value: boolean) => void
}

const DataTableFilters: React.FC<DataTableFiltersProps> = ({
  emailFilterValue,
  onEmailFilterChange,
  columns,
  onColumnVisibilityChange,
}) => {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Filter Name..."
        value={emailFilterValue}
        onChange={(event) => onEmailFilterChange(event.target.value)}
        className="max-w-sm"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {columns
            .filter((column: any) => column.getCanHide())
            .map((column: any) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => onColumnVisibilityChange(column.id, !!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default DataTableFilters
