import { Outlet } from "react-router-dom";
import { Flex, Grid, GridItem, Box } from "@chakra-ui/react";

import SideBar from "./components/Sidebar/SideBar";
import HeaderBar from "./components/Headers/HeaderBar";

import "gantt-task-react/dist/index.css";

function App() {
  return (
    <Box bg={"#000"} overflowX={"hidden"}>
      <HeaderBar />

      <Flex
        w="full"
        h="calc(100dvh - 60px)"
        maxHeight="100dvh"
        justify={"center"}
      >
        <Grid
          w={"86vw"}
          templateColumns="repeat(12, 1fr)"
          columnGap={4}
          templateRows="auto 1fr auto"
          h={"full"}
        >
          <GridItem colSpan={2}>
            <SideBar />
          </GridItem>
          <GridItem colSpan={10} height={"full"} overflow={"hidden"} w={"full"}>
            <Outlet />
          </GridItem>
        </Grid>
      </Flex>
    </Box>
  );
}

export default App;
