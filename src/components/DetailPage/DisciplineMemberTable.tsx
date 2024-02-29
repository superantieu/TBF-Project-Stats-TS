import { useGetAllUsersQuery } from "../../services/ongoingApi";
import { Text, Box, useToast } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { FetchBaseQueryError, skipToken } from "@reduxjs/toolkit/query";

import { ICompletedProject } from "../../interfaces/projectTable.interface";
import { IUsersResult } from "../../interfaces/usersResult.interface";
import { ColumnDefExtended } from "../Dashboard/SubComponent/TableWithMore";

import ProjectListTable from "../Tables/ProjectListTable";
import LoadingPage from "../../pages/LoadingPage";

interface DisciplineMemberTableProps {
  Discipline: string;
}

const DisciplineMemberTable: React.FC<DisciplineMemberTableProps> = ({
  Discipline,
}) => {
  const toast = useToast();
  const [page, setPage] = useState(1);

  const {
    data: DisciplineMember,
    error,
    isError,
    isLoading,
  } = useGetAllUsersQuery(
    Discipline
      ? {
          discipline: Discipline,
          pageNumber: page,
          employed: 1,
        }
      : skipToken
  );

  let data: ICompletedProject[] = [];
  const columns = useMemo<ColumnDefExtended<ICompletedProject>[]>(
    () => [
      {
        id: "UserId",
        accessorKey: "UserId",
        cell: ({ getValue }) => (
          <Text noOfLines={1} display={"block"}>
            {getValue() as string}
          </Text>
        ),
        header: () => "Member Id",
        width: "120px",
      },
      {
        id: "FullName",
        accessorKey: "FullName",
        cell: ({ getValue }) => (
          <Text noOfLines={1} display={"block"}>
            {getValue() as string}
          </Text>
        ),
        header: () => "Full Name",
        width: "200px",
      },
      {
        id: "JobTitle",
        accessorKey: "JobTitle",
        cell: ({ getValue }) => (
          <Text noOfLines={1} display={"block"}>
            {getValue() as string}
          </Text>
        ),
        header: () => "Job Title",
        width: "160px",
      },
    ],
    []
  );

  data = DisciplineMember?.result.map((member: IUsersResult) => {
    return {
      UserId: member.UserId,
      FullName: member.FullName,
      JobTitle: member.JobTitle,
    };
  });

  useEffect(() => {
    if (isError) {
      toast({
        status: "error",
        duration: 2500,
        position: "top-right",
        title: "ABC",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        description: ((error as FetchBaseQueryError)?.data as any)?.title,
      });
    }
  }, [isError, error, toast]);

  if (isLoading) {
    data = [];
    return <LoadingPage />;
  }
  return (
    <Box>
      <ProjectListTable
        columns={columns}
        data={data}
        setCurrent={setPage}
        project={DisciplineMember}
        rowNavigate={{ path: "users", slug: "UserId" }}
      />
    </Box>
  );
};
export default DisciplineMemberTable;
