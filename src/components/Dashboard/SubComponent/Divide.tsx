import { AbsoluteCenter, Box, Divider } from "@chakra-ui/react";

const Divide: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Box position="relative" padding="10" mt={"18PX"}>
      <Divider borderColor={"red.500"} />
      <AbsoluteCenter bg="red.500" color={"white"} px="8" borderRadius={"99px"}>
        {title}
      </AbsoluteCenter>
    </Box>
  );
};
export default Divide;
