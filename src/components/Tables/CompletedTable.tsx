import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Td,
  Th,
  Tr,
  Flex,
} from "@chakra-ui/react";
import { BaseSyntheticEvent, useState } from "react";
import {
  useReactTable,
  getSortedRowModel,
  flexRender,
  SortingState,
  getCoreRowModel,
} from "@tanstack/react-table";
import Scrollbars from "react-custom-scrollbars-2";

import { ColumnDefExtended } from "../Dashboard/SubComponent/TableWithMore";
import { TableWithPaginationProps } from "../../interfaces/tableWithNavigate.interface";
import { ICompletedProject } from "../../interfaces/projectTable.interface";

import Pagination from "../Pagination/Pagination";
import ExpectTimeChart from "../Charts/DashBoardChart/ExpectTimeChart";
import RenderThumb from "../../scrollbar/RenderThumb";
import Divide from "../Dashboard/SubComponent/Divide";

const TableWithPagination: React.FC<TableWithPaginationProps> = ({
  columns,
  data,
  current,
  pageCount,
  setCurrent,
  chartData,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  const handleContextMenu = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <Box mt={"30px"}>
      <Divide title={"COMPLETED PROJECTS"} />
      <Box
        bg={"#08040459"}
        borderRadius={"20px"}
        m={"0 20px 10px 20px"}
        padding={"0 20px"}
        onContextMenu={handleContextMenu}
      >
        <ExpectTimeChart data={chartData} />
      </Box>
      <Flex
        h="380px"
        direction="column"
        bg={"#08040459"}
        m={"0 20px"}
        borderRadius={"20px"}
        padding={"5px 20px 10px"}
      >
        <TableContainer overflow={"hidden"} flex="1">
          <Table variant={"striped"} colorScheme="whiteAlpha" color={"#fff"}>
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <Th color={"red.400"} px="8px" key={header.id}>
                        <Box
                          {...{
                            onClick: header.column.getToggleSortingHandler(),
                            cursor: "pointer",
                            userSelect: "none",
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </Box>
                      </Th>
                    ))}
                  </Tr>
                );
              })}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell, index) => {
                      return (
                        <Td
                          px="8px"
                          py="0"
                          h="0"
                          borderBottom={0}
                          key={cell.id}
                        >
                          <Box
                            h="0"
                            w={
                              (
                                table.getHeaderGroups()[0].headers[index].column
                                  .columnDef as ColumnDefExtended<ICompletedProject>
                              ).width
                            }
                          />
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
          <Scrollbars
            autoHide={true}
            autoHideTimeout={1000}
            style={{
              backgroundColor: "#272a2f",
              width: "100%",
              height: "calc(100% - 40px)",
            }}
            renderThumbVertical={RenderThumb}
          >
            <Table
              variant={"striped"}
              colorScheme="whiteAlpha"
              color={"#fff"}
              w={"full"}
            >
              <Thead h="0">
                {table.getHeaderGroups().map((headerGroup) => (
                  <Tr h="0" key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <Th
                        h="0"
                        py="0"
                        key={header.id}
                        colSpan={header.colSpan}
                      ></Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <Tr key={row.id}>
                      {row.getVisibleCells().map((cell, index) => {
                        return (
                          <Td padding={"8px"} key={cell.id}>
                            <Box
                              w={
                                (
                                  table.getHeaderGroups()[0].headers[index]
                                    .column
                                    .columnDef as ColumnDefExtended<ICompletedProject>
                                ).width
                              }
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </Box>
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </Scrollbars>
        </TableContainer>

        <Flex align={"center"} justify={"center"} h="64px">
          <Pagination
            current={current}
            pageCount={pageCount}
            setCurrent={setCurrent}
          />
        </Flex>
      </Flex>
      <Box h={"20px"} color={"transparent"}></Box>
    </Box>
  );
};

export default TableWithPagination;
