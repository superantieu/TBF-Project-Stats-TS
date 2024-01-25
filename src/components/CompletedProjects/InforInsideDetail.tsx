import { Stack, Text, Box, Flex } from "@chakra-ui/react";
import { ReactElement } from "react";

import { flexStyle } from "../../style/projectDetailStyle";

interface InforInsideDetailProps {
  text: string;
  value: string;
  icon: ReactElement;
}
const InforInsideDetail: React.FC<InforInsideDetailProps> = ({
  text,
  value,
  icon,
}) => {
  return (
    <Flex {...flexStyle}>
      <Stack gap={0} ml={"6px"}>
        <Text fontSize={"20px"} color={"#8b8f93"}>
          {text}
        </Text>
        <Box fontSize={"24px"} fontWeight={"bold"} color={"#b7b3b3"}>
          {value}
        </Box>
      </Stack>
      <Flex
        w={"50px"}
        h={"50px"}
        mr={"10px"}
        bg={"red.500"}
        align={"center"}
        justify={"center"}
        borderRadius={"15px"}
      >
        {icon}
      </Flex>
    </Flex>
  );
};
export default InforInsideDetail;
