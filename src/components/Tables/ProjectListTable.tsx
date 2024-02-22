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
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  getSortedRowModel,
  flexRender,
  SortingState,
  getCoreRowModel,
} from "@tanstack/react-table";
import Scrollbars from "react-custom-scrollbars-2";
import { useState } from "react";

import { TableForDisciplineProps } from "../../interfaces/tableForDiscipline.interface";
import { ColumnDefExtended } from "../Dashboard/SubComponent/TableWithMore";
import { ICompletedProject } from "../../interfaces/projectTable.interface";
import { IProjectResult } from "../../interfaces/projectResult.interface";

import Pagination from "../Pagination/Pagination";
import RenderThumb from "../../scrollbar/RenderThumb";

const ProjectListTable: React.FC<TableForDisciplineProps> = ({
  columns,
  data,
  setCurrent,
  project,
  rowNavigate,
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
  const navigate = useNavigate();
  const handleClick = (index: number) => {
    const specificProject = project.result[index];

    navigate(
      `/${rowNavigate.path}/${
        specificProject[rowNavigate.slug as keyof IProjectResult]
      }`
    );
  };
  console.log("project", project);
  return (
    <Box mt={"30px"}>
      <Flex
        h="516px"
        direction="column"
        bg={"#08040459"}
        m={"0 20px"}
        borderRadius={"20px"}
        padding={"20px"}
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
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
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
                    <Tr
                      key={row.index}
                      onClick={() => handleClick(row.index)}
                      cursor={"pointer"}
                      _hover={{ color: "red" }}
                    >
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
          {project && (
            <Pagination
              current={project.pagination.currentPage}
              pageCount={project.pagination.totalPages}
              setCurrent={setCurrent}
            />
          )}
        </Flex>
      </Flex>
      <Box h={"20px"} color={"transparent"}></Box>
    </Box>
  );
};

export default ProjectListTable;
