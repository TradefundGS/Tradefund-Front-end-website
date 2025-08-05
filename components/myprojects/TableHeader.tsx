import { flexRender, HeaderGroup, Column } from "@tanstack/react-table";

interface TableHeaderComponentProps {
  headerGroups: HeaderGroup<any>[];
  toggleSorting: (column: Column<any, unknown>) => void;
}

const TableHeaderComponent: React.FC<TableHeaderComponentProps> = ({ headerGroups, toggleSorting }) => {
  return (
    <thead className="hidden sm:table-header-group">
      {headerGroups.map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              key={header.id}
              onClick={() => toggleSorting(header.column)}
            >
              {flexRender(
                header.column.columnDef.header,
                header.getContext()
              )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default TableHeaderComponent;
