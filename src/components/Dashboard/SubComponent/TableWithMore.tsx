import { useEffect, useMemo, useState } from "react";
import { Box, Text, useToast } from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useGetOngoingProjectQuery } from "../../../services/ongoingApi";
import { ICompletedProject } from "../../../interfaces/projectTable.interface";
import { IProjectResult } from "../../../interfaces/projectResult.interface";

import TableWithPagination from "../../Tables/CompletedTable";
import LoadingPage from "../../../pages/LoadingPage";

export type ColumnDefExtended<T> = ColumnDef<T, unknown> & { width: string };

const TableMore = () => {
  const toast = useToast();
  const [page, setPage] = useState(1);
  const {
    data: completedProjects,
    error,
    isError,
    isLoading,
  } = useGetOngoingProjectQuery({
    pageNumber: page,
    isCompleted: 1,
    pageSize: 10,
  });
  const columns = useMemo<ColumnDefExtended<ICompletedProject>[]>(
    () => [
      {
        id: "project",
        accessorKey: "project",
        cell: ({ getValue }) => (
          <Text noOfLines={1} display={"block"}>
            {getValue() as string}
          </Text>
        ),
        header: () => "Project",
        width: "240px",
      },
      {
        id: "StartDate",
        accessorKey: "StartDate",
        cell: ({ getValue }) => (
          <Text noOfLines={1} display={"block"}>
            {new Date(getValue() as string).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </Text>
        ),
        header: () => "Start Date",
        width: "150px",
      },
      {
        id: "TargetDate",
        accessorKey: "TargetDate",
        cell: ({ getValue }) => (
          <Text noOfLines={1} display={"block"}>
            {new Date(getValue() as string).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </Text>
        ),
        header: () => "Target Date",
        width: "150px",
      },
      {
        id: "CompletedDate",
        accessorKey: "CompletedDate",
        cell: ({ getValue }) => (
          <Text noOfLines={1} display={"block"}>
            {new Date(getValue() as string).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </Text>
        ),
        header: () => "Completed Date",
        width: "150px",
      },
      {
        id: "members",
        accessorKey: "members",
        cell: ({ getValue }) => (
          <Text noOfLines={1} display={"block"}>
            {getValue() as number}
          </Text>
        ),
        header: () => "Members",
        width: "115px",
      },
      {
        id: "used",
        accessorKey: "used",
        cell: ({ getValue }) => (
          <Text noOfLines={1} display={"block"}>
            {getValue() as number}
          </Text>
        ),
        header: () => "Used Hours",
        width: "120px",
      },
      {
        id: "target",
        accessorKey: "target",
        cell: ({ getValue }) => (
          <Text noOfLines={1} display={"block"}>
            {getValue() as number}
          </Text>
        ),
        header: () => "Target Hours",
        width: "125px",
      },
    ],
    []
  );

  let data: ICompletedProject[] = [];

  data = completedProjects?.result.map((complete: IProjectResult) => {
    return {
      project: complete.ProjectName,
      StartDate: new Date(complete.StartDate).getTime(),
      TargetDate: new Date(complete.TargetDate).getTime(),
      CompletedDate: new Date(complete.CompletedDate).getTime(),
      members: complete.FilterMembers.length,
      used: complete.UsedHours,
      target: complete.TotalHours,
    };
  });

  useEffect(() => {
    if (isError) {
      toast({
        status: "error",
        duration: 2500,
        position: "top-right",
        title: "ABC",
        description: ((error as FetchBaseQueryError)?.data as any)?.title,
      });
    }
  }, [isError]);
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <Box>
      <TableWithPagination
        columns={columns}
        data={data}
        current={completedProjects?.pagination.currentPage}
        pageCount={completedProjects?.pagination.totalPages}
        setCurrent={setPage}
        chartData={completedProjects?.result}
      />
    </Box>
  );
};
export default TableMore;
