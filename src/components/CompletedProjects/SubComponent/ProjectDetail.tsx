import {
  Box,
  Divider,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { MdOutlineDateRange } from "react-icons/md";
import { IoTimer } from "react-icons/io5";
import { LuAlignHorizontalJustifyStart } from "react-icons/lu";
import { GiFinishLine, GiTargetShot } from "react-icons/gi";
import { useState, useMemo, useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useGetTimeSheetQuery } from "../../../services/ongoingApi";
import { IProjectResult } from "../../../interfaces/projectResult.interface";
import { ITimeSheetResult } from "../../../interfaces/timeSheetResult.interface";
import { menuButtonStyle } from "../../../style/dashboardStyle";

import Contribution from "../../Charts/Contribution";
import ContributeByPerson from "../../Charts/ProjectDetailChart/ContribueByPerson";
import ContributeByTask from "../../Charts/ProjectDetailChart/ContributeByTask";
import ContributeChart from "../../Charts/ProjectDetailChart/ContributeChart";
import LoadingPage from "../../../pages/LoadingPage";
import InforInsideDetail from "./InforInsideDetail";

interface ProjectDetailProps {
  project: IProjectResult;
}
export type DataForRender = { [key: string]: number };

interface ChartData {
  TSHours: DataForRender;
  tstask: DataForRender;
  tsperson: DataForRender;
  teams: { [key: string]: string[] };
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const toast = useToast();
  const [contribute, setContribute] = useState("team");
  const {
    data: timeSheetData,
    error,
    isError,
    isLoading,
  } = useGetTimeSheetQuery({
    projectId: project.ProjectId,
  });
  const chartData: ChartData = useMemo(() => {
    if (timeSheetData?.result) {
      const TSHour: DataForRender = {},
        tstas: DataForRender = {},
        tsperso: DataForRender = {},
        team: { [key: string]: string[] } = {};
      timeSheetData.result.forEach((cur: ITimeSheetResult) => {
        const needHoursTSHour = TSHour[cur["UserDiscipline"]] || 0;
        TSHour[cur["UserDiscipline"]] = needHoursTSHour + cur["TSHour"];

        const needHoursTstas = tstas[cur["TaskId"]] || 0;
        tstas[cur["TaskId"]] = needHoursTstas + cur["TSHour"];

        const needHoursTsperso = tsperso[cur["FullName"]] || 0;
        tsperso[cur["FullName"]] = needHoursTsperso + cur["TSHour"];

        const needArrTeam = team[cur["UserDiscipline"]] || [];
        team[cur["UserDiscipline"]] = needArrTeam.includes(cur["FullName"])
          ? needArrTeam
          : [...needArrTeam, cur["FullName"]];
      });
      return {
        TSHours: TSHour,
        tstask: tstas,
        tsperson: tsperso,
        teams: team,
      };
    }
    return {
      TSHours: {},
      tstask: {},
      tsperson: {},
      teams: {},
    };
  }, [timeSheetData?.result]);

  const handleSelectChart = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.target.value === "team"
      ? setContribute("team")
      : e.target.value === "task"
      ? setContribute("task")
      : setContribute("person");
  };

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

  return (
    <Box>
      <Flex
        w={"full"}
        h={"50px"}
        bg={"#404040"}
        color={"#fff"}
        align={"center"}
        fontSize={"24px"}
        padding={"10px"}
      >
        {project.ProjectName.toUpperCase()}
      </Flex>
      <Flex justify={"space-between"} mr={"10px"} mt={"20px"}>
        <InforInsideDetail
          text={"Used"}
          value={`${project.UsedHours} HOURS`}
          icon={<IoTimer fontSize={"36px"} />}
        />

        <InforInsideDetail
          text={"StartDate"}
          value={new Date(project.StartDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
          icon={<LuAlignHorizontalJustifyStart fontSize={"36px"} />}
        />

        {project.CompletedDate ? (
          <InforInsideDetail
            text={"FinishDate"}
            value={new Date(project.CompletedDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
            icon={<GiFinishLine fontSize={"36px"} />}
          />
        ) : (
          <InforInsideDetail
            text={"TargetDate"}
            value={new Date(project.TargetDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
            icon={<MdOutlineDateRange fontSize={"36px"} />}
          />
        )}

        <InforInsideDetail
          text={"Target"}
          value={`${project.TotalHours} HOURS`}
          icon={<GiTargetShot fontSize={"36px"} />}
        />
      </Flex>

      <Flex
        justify={"space-evenly"}
        align={"center"}
        gap={"40px"}
        m={"40px 20px 0"}
        minHeight={"450px"}
      >
        <Contribution teams={chartData.teams} />

        <Box
          w={"50%"}
          position={"relative"}
          bg={"#1a1d21"}
          padding={"10px"}
          borderRadius={"20px"}
          border={"2px solid #7d7373"}
        >
          <Menu closeOnSelect={false}>
            <MenuButton
              as={IconButton}
              fontSize={"18px"}
              icon={<HamburgerIcon />}
              {...menuButtonStyle}
              position={"absolute"}
              top={2}
              right={2}
            />
            <MenuList minW={"30px"} h={"30px"}>
              <Select
                icon={<></>}
                zIndex={2}
                minW={"110px"}
                height={"30px"}
                mt={"-8px"}
                onChange={handleSelectChart}
              >
                <option value="team">TEAM</option>
                <option value="person">PERSON</option>
                <option value="task">TASK</option>
              </Select>
            </MenuList>
          </Menu>
          <Flex
            flexDirection={"column"}
            align={"flex-start"}
            justify={"center"}
            minH={"450px"}
            maxH={"450px"}
          >
            <Box w={"80%"}>
              {isLoading ? (
                <LoadingPage />
              ) : contribute === "team" ? (
                <ContributeChart totalhour={chartData.TSHours} />
              ) : contribute === "task" ? (
                <ContributeByTask taskhour={chartData.tstask} />
              ) : (
                <ContributeByPerson personhour={chartData.tsperson} />
              )}
            </Box>
            <Text
              mt={"30px"}
              fontWeight={"bold"}
              fontSize={"20PX"}
              alignSelf={"center"}
              color={"#e7dede"}
            >
              THE CONTRIBUTION (HOURS)
            </Text>
          </Flex>
        </Box>
      </Flex>

      <Divider mt={"20px"} mb={"20px"}></Divider>
    </Box>
  );
};
export default ProjectDetail;
