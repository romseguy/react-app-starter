import { useSortBy, useTable } from "react-table";
import tw, { styled } from "twin.macro";

export const StyledTable = styled.table`
  thead th {
    ${tw`pr-5`}
  }
  tbody > tr {
    td {
      ${tw`pr-5`}
    }
    ${tw`border-t cursor-pointer`}
    &:hover {
      background-color: ${({ bg }) => bg};
    }
  }
`;

export const Table = (props) => {
  // extract props for useTable hook config
  const { columns, data, initialState } = props;

  if (!columns || !data) return null;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState,
    },
    useSortBy
  );

  return (
    <StyledTable {...getTableProps()} {...props}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              //console.log(column);
              return (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};
