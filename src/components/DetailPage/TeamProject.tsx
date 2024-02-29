import Scrollbars from "react-custom-scrollbars-2";
import { useParams } from "react-router-dom";
import { Flex, Box, Text, useToast } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useGetOngoingProjectQuery } from "../../services/ongoingApi.js";
import { ColumnDefExtended } from "../Dashboard/SubComponent/TableWithMore.js";
import { ICompletedProject } from "../../interfaces/projectTable.interface.js";
import { IProjectResult } from "../../interfaces/projectResult.interface.js";

import RenderThumb from "../../scrollbar/RenderThumb.js";
import ProjectListTable from "../Tables/ProjectListTable.js";
import DisciplineMemberTable from "./DisciplineMemberTable.js";
import LoadingPage from "../../pages/LoadingPage.js";

const TeamProject = () => {
  const [page, setPage] = useState(1);
  const params = useParams();
  const toast = useToast();

  const {
    data: projectsByTeam,
    error,
    isError,
    isLoading,
  } = useGetOngoingProjectQuery({
    discipline: params.name,
    pageNumber: page,
  });
  console.log("team", projectsByTeam);
  let data: ICompletedProject[] = [];
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
        width: "290px",
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
        width: "160px",
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
        width: "160px",
      },
      {
        id: "CompletedDate",
        accessorKey: "CompletedDate",
        cell: ({ getValue }) => (
          <Text noOfLines={1} display={"block"}>
            {getValue()
              ? new Date(getValue() as string).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
              : "On-going"}
          </Text>
        ),
        header: () => "Completed Date",
        width: "160px",
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
        width: "125px",
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
        width: "155px",
      },
    ],
    []
  );

  data = projectsByTeam?.result.map((pjTeam: IProjectResult) => {
    return {
      project: pjTeam.ProjectName,
      StartDate: new Date(pjTeam.StartDate).getTime(),
      TargetDate: new Date(pjTeam.TargetDate).getTime(),
      CompletedDate: new Date(pjTeam.CompletedDate).getTime(),
      members: pjTeam.FilterMembers.length,
      target: pjTeam.TotalHours,
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
    <Scrollbars
      autoHide={true}
      autoHideTimeout={1000}
      style={{ backgroundColor: "#272a2f" }}
      renderThumbVertical={RenderThumb}
    >
      <Flex
        mt={"20px"}
        mb={"20px"}
        fontSize={"20px"}
        fontWeight={"bold"}
        align={"center"}
        justify={"center"}
        color={"#e7dede"}
      >
        <Text>
          LIST OF MEMBERS OF THE {(params.name as string).toUpperCase()}{" "}
          DISCIPLINE
        </Text>
      </Flex>
      <DisciplineMemberTable Discipline={params.name as string} />
      <Flex
        mt={"20px"}
        mb={"20px"}
        fontSize={"20px"}
        fontWeight={"bold"}
        align={"center"}
        justify={"center"}
        color={"#e7dede"}
      >
        <Text>
          PROJECTS IN WHICH TEAM {(params.name as string).toUpperCase()}{" "}
          PARTICIPATES
        </Text>
      </Flex>
      <Box>
        <ProjectListTable
          columns={columns}
          data={data}
          setCurrent={setPage}
          project={projectsByTeam}
          rowNavigate={{ path: "projectdetail", slug: "ProjectId" }}
        />
      </Box>
    </Scrollbars>
  );
};
export default TeamProject;
