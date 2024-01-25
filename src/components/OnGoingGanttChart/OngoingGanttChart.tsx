import Scrollbars from "react-custom-scrollbars-2";
import { Box, Stack, Divider, AbsoluteCenter } from "@chakra-ui/react";

import RenderThumb from "../../scrollbar/RenderThumb";
import GanttChartRender from "../Charts/GanttChart/GanttChartRender";

const OngoingGanttChart = () => {
  return (
    <Scrollbars
      autoHide={true}
      autoHideTimeout={1000}
      style={{
        backgroundColor: "#272a2f",
      }}
      renderThumbVertical={RenderThumb}
    >
      <Stack>
        <Box position="relative" padding="10">
          <Divider borderColor={"red.500"} />
          <AbsoluteCenter
            bg="red.500"
            color={"white"}
            px="8"
            fontSize={"20px"}
            borderRadius={"99px"}
          >
            PROGRESS OF ON-GOING PROJECT
          </AbsoluteCenter>
        </Box>

        <Box
          m={"0px 20px"}
          p={"10px"}
          bg={"#fff"}
          borderRadius={"20px"}
          color={"#1a1d21"}
        >
          <GanttChartRender />
        </Box>
      </Stack>
    </Scrollbars>
  );
};
export default OngoingGanttChart;
