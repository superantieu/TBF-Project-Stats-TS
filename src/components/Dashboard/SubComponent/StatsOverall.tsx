import { Divider, Flex, Stack, useToast } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useGetAllUsersQuery } from "../../../services/ongoingApi";
import { IUsersResult } from "../../../interfaces/usersResult.interface";

import LoadingPage from "../../../pages/LoadingPage";
import StatsPerTeam from "./StatsPerTeam";
import Divide from "./Divide";

interface StatsOverAllProject {
  projectTeamsize: number;
  manager: number;
  leader: number;
  architecure: number;
  structure: number;
  mep: number;
  staff: number;
}

const StatsOverall = () => {
  const toast = useToast();
  const {
    data: users,
    error,
    isError,
    isLoading,
  } = useGetAllUsersQuery({
    pageSize: 500,
    employed: 1,
  });
  console.log("user", users?.result);
  const statsOverAllProject: StatsOverAllProject = useMemo(() => {
    if (users?.result) {
      let manage: number = 0;
      let lead: number = 0;
      let arch: number = 0;
      let struc: number = 0;
      let mep: number = 0;
      (users.result as IUsersResult[]).forEach((x) => {
        if (["Architecture", "Structure", "MEP"].includes(x.Discipline)) {
          if (
            ["Manager II", "Senior Manager I", "Senior Manager II"].includes(
              x.JobTitle
            )
          ) {
            manage++;
          } else if (x.JobTitle === "Manager I") {
            lead++;
          }
        }
        if (x.Discipline === "Architecture") {
          arch++;
        }
        if (x.Discipline === "Structure") {
          struc++;
        }
        if (x.Discipline === "MEP") {
          mep++;
        }
      });

      return {
        projectTeamsize: arch + struc + mep,
        manager: manage,
        leader: lead,
        architecure: arch,
        structure: struc,
        mep: mep,
        staff: arch + struc + mep - manage - lead,
      };
    }
    return {
      projectTeamsize: 0,
      manager: 0,
      leader: 0,
      architecure: 0,
      structure: 0,
      mep: 0,
      staff: 0,
    };
  }, [users?.result]);

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
    return <LoadingPage />;
  }
  return (
    <Stack color={"#fff"}>
      <Divide title={"STATS OVERALL ABOUT TEAM"} />
      <Flex
        align={"center"}
        justify={"space-between"}
        bg={"#08040459"}
        m={"0px 20px 20px 20px"}
        borderRadius={"20px"}
        padding={"10px 20px"}
        fontSize={"20px"}
      >
        <StatsPerTeam
          title={"Project Team size"}
          value={statsOverAllProject.projectTeamsize}
        />
        <Divider orientation="vertical" borderColor={"red.500"} h={"70px"} />

        <StatsPerTeam
          title={"Architects"}
          value={statsOverAllProject.architecure}
        />
        <StatsPerTeam
          title={"Structures"}
          value={statsOverAllProject.structure}
        />
        <StatsPerTeam title={"MEP"} value={statsOverAllProject.mep} />

        <Divider orientation="vertical" borderColor={"red.500"} h={"70px"} />

        <StatsPerTeam title={"Staff"} value={statsOverAllProject.staff} />
        <StatsPerTeam
          title={"Team Leaders"}
          value={statsOverAllProject.leader}
        />
        <StatsPerTeam title={"Managers"} value={statsOverAllProject.manager} />
      </Flex>
    </Stack>
  );
};
export default StatsOverall;
