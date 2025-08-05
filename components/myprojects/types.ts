import { ReactNode } from "react"

export type TableColumn = {
  id: string
  header: ReactNode
  accessorKey?: string
}

export type TableRowData = {
  [key: string]: any
}

export type TableProps = {
  children: ReactNode
}

export type TableHeaderProps = {
  children: ReactNode
}

export type TableBodyProps = {
  children: ReactNode
}

export type TableRowProps = {
  children: ReactNode
  dataState?: string
}

export type TableHeadProps = {
  children: ReactNode
}

export type TableCellProps = {
  children: ReactNode
}

export type DropdownMenuProps = {
  children: ReactNode
}

export type DropdownMenuTriggerProps = {
  asChild: boolean
  children: ReactNode
}

export type DropdownMenuContentProps = {
  align?: 'start' | 'end'
  children: ReactNode
}

export type DropdownMenuLabelProps = {
  children: ReactNode
}

export type DropdownMenuItemProps = {
  children: ReactNode
  onClick?: () => void
}

export type DropdownMenuSeparatorProps = {
  children?: never
}
