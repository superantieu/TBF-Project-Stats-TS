import { Spinner, Flex } from "@chakra-ui/react";

const LoadingPage = () => {
  return (
    <Flex align={"center"} justify={"center"} mt={"36px"}>
      <Spinner color="red.500" size="lg" />
    </Flex>
  );
};

export default LoadingPage;
