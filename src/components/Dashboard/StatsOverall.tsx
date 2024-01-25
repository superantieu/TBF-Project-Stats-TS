import {
  Divider,
  Flex,
  Stack,
  Text,
  AbsoluteCenter,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useGetAllUsersQuery } from "../../services/ongoingApi";
import { IUsersResult } from "../../interfaces/usersResult.interface";

import LoadingPage from "../../pages/LoadingPage";

interface StatsOverAllProject {
  projectTeamSize: number;
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
    Employed: 1,
    pageSize: 500,
  });

  const statsOverAllProject: StatsOverAllProject = useMemo(() => {
    if (users?.result) {
      let manage: number = 0;
      let lead: number = 0;
      let arch: number = 0;
      let struc: number = 0;
      let mep: number = 0;
      (users.result as IUsersResult[]).forEach((x) => {
        if (["Architecture", "Structure", "MEP"].includes(x.discipline)) {
          if (
            ["Manager II", "Senior Manager I", "Senior Manager II"].includes(
              x.jobTitle
            )
          ) {
            manage++;
          } else if (x.jobTitle === "Manager I") {
            lead++;
          }
        }
        if (x.discipline === "Architecture") {
          arch++;
        }
        if (x.discipline === "Structure") {
          struc++;
        }
        if (x.discipline === "MEP") {
          mep++;
        }
      });

      return {
        projectTeamSize: arch + struc + mep,
        manager: manage,
        leader: lead,
        architecure: arch,
        structure: struc,
        mep: mep,
        staff: arch + struc + mep - manage - lead,
      };
    }
    return {
      projectTeamSize: 0,
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
        description: ((error as FetchBaseQueryError)?.data as any)?.title,
      });
    }
  }, [isError]);
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <Stack color={"#fff"}>
      <Box position="relative" padding="10" mt={"18PX"}>
        <Divider borderColor={"red.500"} />
        <AbsoluteCenter
          bg="red.500"
          color={"white"}
          px="8"
          borderRadius={"99px"}
        >
          STATS OVERALL ABOUT TEAM
        </AbsoluteCenter>
      </Box>
      <Flex
        align={"center"}
        justify={"space-between"}
        bg={"#08040459"}
        m={"0px 20px 20px 20px"}
        borderRadius={"20px"}
        padding={"10px 20px"}
        fontSize={"20px"}
      >
        <Stack align={"center"} justify={"center"}>
          <Text>Project Team Size</Text>
          <Text fontSize={"28px"} fontWeight={"bold"}>
            {statsOverAllProject.projectTeamSize}
          </Text>
        </Stack>
        <Divider orientation="vertical" borderColor={"red.500"} h={"70px"} />
        <Stack align={"center"} justify={"center"}>
          <Text>Architects</Text>
          <Text fontSize={"28px"} fontWeight={"bold"}>
            {statsOverAllProject.architecure}
          </Text>
        </Stack>
        <Stack align={"center"} justify={"center"}>
          <Text>Structures</Text>
          <Text fontSize={"28px"} fontWeight={"bold"}>
            {statsOverAllProject.structure}
          </Text>
        </Stack>
        <Stack align={"center"} justify={"center"}>
          <Text>MEP</Text>
          <Text fontSize={"28px"} fontWeight={"bold"}>
            {statsOverAllProject.mep}
          </Text>
        </Stack>
        <Divider orientation="vertical" borderColor={"red.500"} h={"70px"} />
        <Stack align={"center"} justify={"center"}>
          <Text>Staff</Text>
          <Text fontSize={"28px"} fontWeight={"bold"}>
            {statsOverAllProject.staff}
          </Text>
        </Stack>
        <Stack align={"center"} justify={"center"}>
          <Text>Team Leaders</Text>
          <Text fontSize={"28px"} fontWeight={"bold"}>
            {statsOverAllProject.leader}
          </Text>
        </Stack>
        <Stack align={"center"} justify={"center"}>
          <Text>Managers</Text>
          <Text fontSize={"28px"} fontWeight={"bold"}>
            {statsOverAllProject.manager}
          </Text>
        </Stack>
      </Flex>
    </Stack>
  );
};
export default StatsOverall;
