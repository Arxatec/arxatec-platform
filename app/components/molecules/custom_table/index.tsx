interface ColumnConfig {
  width: string;
  header: {
    icon?: React.ReactNode;
    label: string;
  };
  accessor: string;
  align?: "left" | "center" | "right";
  renderCell?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  columns: ColumnConfig[];
  data: any[];
  onRowClick?: (row: any) => void;
  className?: string;
}

const statuses = {
  Completed: "text-green-400 bg-green-400/10",
  Error: "text-rose-400 bg-rose-400/10",
  Progress: "text-yellow-400 bg-yellow-400/10",
};

export const CustomTable = ({
  columns,
  data,
  onRowClick,
  className = "",
}: TableProps) => {
  const handleRowClick = (row: any) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <div
      className={`w-full shadow-sm hover:shadow-md transition-all ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left whitespace-nowrap mt-2 bg-white rounded-lg overflow-hidden">
          <colgroup>
            {columns.map((column, index) => (
              <col key={index} className={column.width} />
            ))}
          </colgroup>
          <thead className="border-b border-gray-100 text-sm/6 text-gray-500">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`py-4 px-4 font-semibold ${
                    column.align === "right"
                      ? "text-right"
                      : column.align === "center"
                      ? "text-center"
                      : "text-left"
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      column.align === "right"
                        ? "justify-end"
                        : column.align === "center"
                        ? "justify-center"
                        : "justify-start"
                    }`}
                  >
                    {column.header.icon}
                    {column.header.label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="divide-x divide-gray-100 hover:bg-gray-50 cursor-pointer transition-all"
                onClick={() => handleRowClick(row)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleRowClick(row);
                  }
                }}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`py-4 px-4 text-sm/6 break-words ${
                      column.align === "right"
                        ? "text-right"
                        : column.align === "center"
                        ? "text-center"
                        : "text-left"
                    }`}
                  >
                    {column.renderCell ? (
                      column.renderCell(row[column.accessor], row)
                    ) : (
                      <div className="whitespace-normal">
                        {row[column.accessor]}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
