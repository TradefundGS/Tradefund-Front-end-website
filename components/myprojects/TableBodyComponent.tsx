import { flexRender, Row } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface TableBodyComponentProps {
  rows: Row<any>[];
  columns: any[];
}

const TableBodyComponent: React.FC<TableBodyComponentProps> = ({ rows, columns, isLoading }) => {
  if (isLoading) {
    // Render skeleton rows
    return (
      <tbody>
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <tr key={rowIndex} className="bg-white">
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                <Skeleton className="h-3 w-full rounded" /> {/* Skeleton for each cell */}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
  return (
    <tbody className="divide-y divide-gray-200 bg-white">
      {rows.length ? (
        rows.map((row: Row<any>) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="sm:table-row flex flex-col sm:flex-row sm:items-center">
            {row.getVisibleCells().map(cell => (
              <TableCell
                key={cell.id}
                className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0"
              >
                <span className="sm:hidden font-semibold">{cell.column.columnDef.header}</span> {/* Column name for mobile */}
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </tbody>
  );
};

export default TableBodyComponent;
