import { Scrollbars } from "react-custom-scrollbars-2";
import {
  Flex,
  Switch,
  FormControl,
  FormLabel,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Select,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { setChoose } from "../../redux/chooseSlice";
import { useGetOngoingProjectQuery } from "../../services/ongoingApi";
import { IProjectResult } from "../../interfaces/projectResult.interface";
import {
  chartTitleStyle,
  enableChartStyle,
  formControlStyle,
  menuButtonStyle,
  selectStyle,
} from "../../style/dashboardStyle";

import TotalProjectChart from "../Charts/DashBoardChart/TotalProjectChart";
import RenderThumb from "../../scrollbar/RenderThumb";
import StatsOverall from "./SubComponent/StatsOverall";
import TableMore from "./SubComponent/TableWithMore";
import ContributeLocation from "../Charts/DashBoardChart/ContributeLocation";
import ContributeBySize from "../Charts/DashBoardChart/ContributeBySize";
import ContributeByDifficulty from "../Charts/DashBoardChart/ContributeByDifficulty";
import ChooseProjects from "./SubComponent/ChooseProjects";
import Divide from "./SubComponent/Divide";

interface AdditionChart {
  locateChart: string[];
  sizeChart: string[];
  difficultyChart: string[];
}

const Dashboard = () => {
  const [enable, setEnable] = useState({
    locate: false,
    size: false,
    difficulty: false,
  });
  const [orderBy, setOrderBy] = useState("");
  const dispatch = useDispatch();
  //
  const {
    data: totalOngoProjects,
    error,
    isError,
    isLoading,
  } = useGetOngoingProjectQuery({
    isCompleted: 0,
    pageSize: 50,
  });
  //
  const additionChart: AdditionChart = useMemo(() => {
    if (totalOngoProjects?.result) {
      const locateChartt = [] as string[];
      const sizeChartt = [] as string[];
      const difficultyChartt = [] as string[];
      (totalOngoProjects.result as IProjectResult[]).map((totalOngo) => {
        locateChartt.push(totalOngo.Location);
        sizeChartt.push(totalOngo.Size);
        difficultyChartt.push(totalOngo.Difficulty);
      });
      return {
        locateChart: locateChartt,
        sizeChart: sizeChartt,
        difficultyChart: difficultyChartt,
      };
    }
    return {
      locateChart: [],
      sizeChart: [],
      difficultyChart: [],
    };
  }, [totalOngoProjects?.result]);
  useEffect(() => {}, [enable]);
  //
  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnable({ ...enable, [e.target.id]: e.target.checked });
  };
  const handlleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderBy(e.target.value);
    dispatch(setChoose([]));
  };

  return (
    <Scrollbars
      autoHide={true}
      autoHideTimeout={1000}
      style={{
        backgroundColor: "#272a2f",
      }}
      renderThumbVertical={RenderThumb}
    >
      <Box w={"full"} h={"full"} mt={"20px"} mb={"20px"} position={"relative"}>
        <Divide title={"ON-GOING PROJECTS"} />

        <Flex
          justify={"space-between"}
          align={"center"}
          gap={"60px 40px"}
          m={"0 20px 10px"}
          flexWrap={"wrap"}
        >
          <Box
            w={"100%"}
            bg={"#08040459"}
            borderRadius={"20px"}
            minH={"515px"}
            position={"relative"}
            onContextMenu={handleContextMenu}
          >
            <TotalProjectChart
              sortColumn={orderBy === "" ? "StartDate" : orderBy}
            />
            <Menu closeOnSelect={false}>
              <MenuButton
                {...menuButtonStyle}
                as={Button}
                border={"1px solid #fff"}
                borderRadius={"15px"}
                padding={"5px"}
                h={"30px"}
                position={"absolute"}
                bottom={"10px"}
                left={"-10px"}
              >
                Choose
              </MenuButton>

              <MenuList maxW={"1000px"} zIndex={99}>
                <MenuItem>
                  <Text fontSize={"16px"} fontWeight={"bold"}>
                    Choose the projects you want to display
                  </Text>
                </MenuItem>
                <ChooseProjects />
              </MenuList>
            </Menu>
            <Select
              position="absolute"
              onChange={handlleSelect}
              {...selectStyle}
            >
              <option value="StartDate">Newest</option>
              <option value="StartDate desc">Oldest</option>
            </Select>
          </Box>
          {enable.locate && (
            <Flex {...enableChartStyle} flexDirection="column">
              <Box>
                <ContributeLocation
                  Location={additionChart.locateChart}
                  error={error as FetchBaseQueryError}
                  isError={isError}
                  isLoading={isLoading}
                />
              </Box>
              <Text {...chartTitleStyle}>THE CONTRIBUTION BY Location</Text>
            </Flex>
          )}
          {enable.size && (
            <Flex {...enableChartStyle} flexDirection="column">
              <Box>
                <ContributeBySize
                  size={additionChart.sizeChart}
                  error={error as FetchBaseQueryError}
                  isError={isError}
                  isLoading={isLoading}
                />
              </Box>
              <Text {...chartTitleStyle}>THE CONTRIBUTION BY PROJECT size</Text>
            </Flex>
          )}
          {enable.difficulty && (
            <Flex {...enableChartStyle} flexDirection="column">
              <Box>
                <ContributeByDifficulty
                  Difficulty={additionChart.difficultyChart}
                  error={error as FetchBaseQueryError}
                  isError={isError}
                  isLoading={isLoading}
                />
              </Box>
              <Text {...chartTitleStyle}>
                THE CONTRIBUTION BY PROJECT Difficulty
              </Text>
            </Flex>
          )}
        </Flex>
        <Menu closeOnSelect={false}>
          <MenuButton
            position={"absolute"}
            zIndex={2}
            top={605}
            as={IconButton}
            icon={<HamburgerIcon />}
            {...menuButtonStyle}
          />
          <MenuList>
            <MenuItem>
              <Text fontSize={"16px"} fontWeight={"bold"}>
                Enable Contribution Chart
              </Text>
            </MenuItem>
            <MenuItem pl={"20px"}>
              <FormControl {...formControlStyle}>
                <FormLabel htmlFor="locate" mb="0">
                  Project Location
                </FormLabel>
                <Switch
                  id="locate"
                  isChecked={enable.locate}
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
            </MenuItem>
            <MenuItem pl={"20px"}>
              <FormControl {...formControlStyle}>
                <FormLabel htmlFor="size" mb="0">
                  Project size
                </FormLabel>
                <Switch
                  id="size"
                  isChecked={enable.size}
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
            </MenuItem>
            <MenuItem pl={"20px"}>
              <FormControl {...formControlStyle}>
                <FormLabel htmlFor="difficulty" mb="0">
                  Project Difficulty
                </FormLabel>
                <Switch
                  id="difficulty"
                  isChecked={enable.difficulty}
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
            </MenuItem>
          </MenuList>
        </Menu>
        <StatsOverall />
        <TableMore />
      </Box>
    </Scrollbars>
  );
};

export default Dashboard;
