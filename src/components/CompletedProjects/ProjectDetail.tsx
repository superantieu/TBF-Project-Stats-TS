import {
  Box,
  Button,
  Divider,
  Flex,
  Select,
  Text,
  useOutsideClick,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { MdOutlineDateRange } from "react-icons/md";
import { IoTimer } from "react-icons/io5";
import { LuAlignHorizontalJustifyStart } from "react-icons/lu";
import { GiFinishLine, GiTargetShot } from "react-icons/gi";
import { useState, useRef, useMemo, useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useGetTimeSheetQuery } from "../../services/ongoingApi";
import { IProjectResult } from "../../interfaces/projectResult.interface";
import { ITimeSheetResult } from "../../interfaces/timeSheetResult.interface";

import Contribution from "../Charts/Contribution";
import ContributeByPerson from "../Charts/ProjectDetailChart/ContribueByPerson";
import ContributeByTask from "../Charts/ProjectDetailChart/ContributeByTask";
import ContributeChart from "../Charts/ProjectDetailChart/ContributeChart";
import LoadingPage from "../../pages/LoadingPage";
import InforInsideDetail from "./InforInsideDetail";

interface ProjectDetailProps {
  project: IProjectResult;
}
export type DataForRender = { [key: string]: number };

interface ChartData {
  tshours: DataForRender;
  tstask: DataForRender;
  tsperson: DataForRender;
  teams: { [key: string]: string[] };
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const toast = useToast();
  const [contribute, setContribute] = useState("team");
  const ref = useRef<HTMLSelectElement | null>(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useOutsideClick({
    ref: ref,
    handler: () => setIsSelectOpen(false),
  });

  const {
    data: timeSheetData,
    error,
    isError,
    isLoading,
  } = useGetTimeSheetQuery({
    ProjectId: project.projectId,
    pageSize: 5000,
  });
  const chartData: ChartData = useMemo(() => {
    if (timeSheetData?.result) {
      let tshour: DataForRender = {},
        tstas: DataForRender = {},
        tsperso: DataForRender = {},
        team: { [key: string]: string[] } = {};
      timeSheetData.result.forEach((cur: ITimeSheetResult) => {
        const needHoursTshour = tshour[cur["userDiscipline"]] || 0;
        tshour[cur["userDiscipline"]] = needHoursTshour + cur["tshour"];

        const needHoursTstas = tstas[cur["taskId"]] || 0;
        tstas[cur["taskId"]] = needHoursTstas + cur["tshour"];

        const needHoursTsperso = tsperso[cur["userName"]] || 0;
        tsperso[cur["userName"]] = needHoursTsperso + cur["tshour"];

        const needArrTeam = team[cur["userDiscipline"]] || [];
        team[cur["userDiscipline"]] = needArrTeam.includes(cur["userName"])
          ? needArrTeam
          : [...needArrTeam, cur["userName"]];
      });
      return {
        tshours: tshour,
        tstask: tstas,
        tsperson: tsperso,
        teams: team,
      };
    }
    return {
      tshours: {},
      tstask: {},
      tsperson: {},
      teams: {},
    };
  }, [project, timeSheetData?.result]);

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
        description: ((error as FetchBaseQueryError)?.data as any)?.title,
      });
    }
  }, [isError]);

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
        {project.projectName.toUpperCase()}
      </Flex>
      <Flex justify={"space-between"} mr={"10px"} mt={"20px"}>
        <InforInsideDetail
          text={"Used"}
          value={`${project.usedHours} HOURS`}
          icon={<IoTimer fontSize={"36px"} />}
        />

        <InforInsideDetail
          text={"StartDate"}
          value={new Date(project.startDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
          icon={<LuAlignHorizontalJustifyStart fontSize={"36px"} />}
        />

        {project.completedDate ? (
          <InforInsideDetail
            text={"FinishDate"}
            value={new Date(project.completedDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
            icon={<GiFinishLine fontSize={"36px"} />}
          />
        ) : (
          <InforInsideDetail
            text={"TargetDate"}
            value={new Date(project.targetDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
            icon={<MdOutlineDateRange fontSize={"36px"} />}
          />
        )}

        <InforInsideDetail
          text={"Target"}
          value={`${project.totalHours} HOURS`}
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
          <Button
            position={"absolute"}
            top={0}
            right={0}
            w={"40px"}
            height={"40px"}
            borderRadius={"50%"}
            _hover={{ bg: "transparent" }}
            bg={"transparent"}
            onClick={() => setIsSelectOpen(true)}
          >
            <HamburgerIcon color={"#e7dede"} />
          </Button>
          <Select
            ref={ref}
            icon={<></>}
            mt={4}
            position={"absolute"}
            right={0}
            top={"20px"}
            bg={"#c9d2dd"}
            border={"1px solid #e7dede"}
            w={"110px"}
            height={"30px"}
            zIndex={"2"}
            onChange={handleSelectChart}
            display={isSelectOpen ? "block" : "none"}
          >
            <option value="team">TEAM</option>
            <option value="person">PERSON</option>
            <option value="task">TASK</option>
          </Select>

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
                <ContributeChart totalhour={chartData.tshours} />
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
