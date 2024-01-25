import { useGetAllUsersQuery } from "../../services/ongoingApi";
import { Text, Box, useToast } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { FetchBaseQueryError, skipToken } from "@reduxjs/toolkit/query";

import { ICompletedProject } from "../../interfaces/projectTable.interface";
import { IUsersResult } from "../../interfaces/usersResult.interface";
import { ColumnDefExtended } from "../Dashboard/TableWithMore";

import ProjectListTable from "../Tables/ProjectListTable";
import LoadingPage from "../../pages/LoadingPage";

interface DisciplineMemberTableProps {
  discipline: string;
}

const DisciplineMemberTable: React.FC<DisciplineMemberTableProps> = ({
  discipline,
}) => {
  const toast = useToast();
  const [page, setPage] = useState(1);

  const {
    data: disciplineMember,
    error,
    isError,
    isLoading,
  } = useGetAllUsersQuery(
    discipline
      ? {
          Discipline: discipline,
          pageNumber: page,
          Employed: 1,
        }
      : skipToken
  );

  let data: ICompletedProject[] = [];
  const columns = useMemo<ColumnDefExtended<ICompletedProject>[]>(
    () => [
      {
        id: "userId",
        accessorKey: "userId",
        cell: ({ getValue }) => (
          <Text noOfLines={1} display={"block"}>
            {getValue() as string}
          </Text>
        ),
        header: () => "Member Id",
        width: "120px",
      },
      {
        id: "fullName",
        accessorKey: "fullName",
        cell: ({ getValue }) => (
          <Text noOfLines={1} display={"block"}>
            {getValue() as string}
          </Text>
        ),
        header: () => "Full Name",
        width: "200px",
      },
      {
        id: "jobTitle",
        accessorKey: "jobTitle",
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

  data = disciplineMember.result.map((member: IUsersResult) => {
    return {
      userId: member.userId,
      fullName: member.fullName,
      jobTitle: member.jobTitle,
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
    data = [];
    return <LoadingPage />;
  }
  return (
    <Box>
      <ProjectListTable
        columns={columns}
        data={data}
        setCurrent={setPage}
        project={disciplineMember}
        rowNavigate={{ path: "users", slug: "userId" }}
      />
    </Box>
  );
};
export default DisciplineMemberTable;
