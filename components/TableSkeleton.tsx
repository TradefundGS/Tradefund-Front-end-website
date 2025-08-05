import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton: React.FC = () => {
  return (
    <div className="w-full border border-gray-200 rounded-lg shadow-md p-4">
      <table className="w-full">
        <thead>
          <tr>
            {Array.from({ length: 10 }).map((_, index) => (
              <th key={index} className="py-2">
                <Skeleton className="h-4 w-3/4" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <tr key={rowIndex} className="border-t">
              {Array.from({ length: 10 }).map((_, colIndex) => (
                <td key={colIndex} className="py-3 px-2">
                  <Skeleton
                    className={`h-4 ${
                      colIndex % 2 === 0 ? "w-full" : "w-2/3"
                    }`} // Alternate between full width and 2/3 width for a more dynamic layout
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
