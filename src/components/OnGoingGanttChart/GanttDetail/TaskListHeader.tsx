import { Flex, Text, Divider } from "@chakra-ui/react";

const TaskListHeader = ({}) => {
  return (
    <Flex
      align={"center"}
      justify={"flex-start"}
      border={"1px solid #e0e0e0"}
      h={"50px"}
      minW={"370px"}
      maxW={"370px"}
    >
      <Flex align={"center"} justify={"center"}>
        <Text minW={"170px"} maxWidth={"170px"} pl={"10px"}>
          Name
        </Text>
        <Divider orientation="vertical" borderColor={"red.500"} h={"30px"} />
      </Flex>
      <Flex align={"center"} justify={"space-between"}>
        <Text minW={"100"} maxWidth={"100px"} pl={"10px"}>
          Start
        </Text>
        <Divider orientation="vertical" borderColor={"red.500"} h={"30px"} />
      </Flex>

      <Text minW={"100"} maxWidth={"100px"} pl={"10px"}>
        Target
      </Text>
    </Flex>
  );
};
export default TaskListHeader;
