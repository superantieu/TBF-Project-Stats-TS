import {
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import Scrollbars from "react-custom-scrollbars-2";

import RenderThumb from "../../scrollbar/RenderThumb";

interface TaskTableProps {
  data: { taskName: string; taskHour: number }[];
}
const TaskTable: React.FC<TaskTableProps> = ({ data }) => {
  return (
    <Flex
      h="400px"
      direction="column"
      bg={"#08040459"}
      m={"0 20px"}
      borderRadius={"20px"}
      padding={"20px"}
    >
      <TableContainer overflow={"hidden"} flex="1">
        <Table variant={"striped"} colorScheme="whiteAlpha" color={"#fff"}>
          <Thead>
            <Tr>
              <Th px="8px" color={"red.400"} w={"300px"}>
                Task Name
              </Th>
              <Th px="8px" color={"red.400"}>
                Task Hour
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td px="8px" py="0" h="0" borderBottom={0}></Td>
            </Tr>
          </Tbody>
        </Table>
        <Scrollbars
          autoHide={true}
          autoHideTimeout={1000}
          style={{
            backgroundColor: "#272a2f",
            width: "100%",
            height: "calc(100% - 40px)",
          }}
          renderThumbVertical={RenderThumb}
        >
          <Table
            variant={"striped"}
            colorScheme="whiteAlpha"
            color={"#fff"}
            w={"full"}
          >
            <Thead h="0">
              <Tr>
                <Th h="0" py="0"></Th>
                <Th h="0" py="0"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((dt: any, index) => {
                return (
                  <Tr key={index}>
                    <Td
                      padding={"8px"}
                      maxW={"200px"}
                      overflow={"hidden"}
                      textOverflow={"ellipsis"}
                      whiteSpace={"nowrap"}
                    >
                      {dt["taskName"]}
                    </Td>
                    <Td padding={"8px"}>{dt["taskHour"]}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Scrollbars>
      </TableContainer>
    </Flex>
  );
};
export default TaskTable;
