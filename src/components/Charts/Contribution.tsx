import { Box, Flex, Text } from "@chakra-ui/react";
import Scrollbars from "react-custom-scrollbars-2";

import RenderThumb from "../../scrollbar/RenderThumb";
import LoadingPage from "../../pages/LoadingPage";

interface ContributionProps {
  teams: { [key: string]: string[] };
}

const Contribution: React.FC<ContributionProps> = ({ teams }) => {
  return (
    <Flex w={"50%"} flexDirection={"column"} align={"center"}>
      <Text fontWeight={"bold"} fontSize={"20px"} color={"#e7dede"}>
        PARTICIPANTS
      </Text>
      {!teams ? (
        <LoadingPage />
      ) : (
        <Flex
          w={"full"}
          rowGap={"10px"}
          columnGap={"40px"}
          flexWrap={"wrap"}
          justify={"center"}
          mt={"10px"}
        >
          {Object.keys(teams).map((tName, index) => (
            <Box
              w={"30%"}
              border={"4px double #e7dede"}
              mt={"10px"}
              mb={"10px"}
              padding={"5px 0"}
              color={"#e7dede"}
              key={index}
              minWidth={"220px"}
              h={"150px"}
              overflow={"hidden"}
            >
              <Scrollbars
                autoHide={true}
                autoHideTimeout={1000}
                style={{
                  backgroundColor: "#272a2f",
                }}
                renderThumbVertical={RenderThumb}
              >
                <Flex
                  flexDirection={"column"}
                  key={index}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Text fontWeight={"bold"}>{tName}</Text>
                  {teams[tName].map((user, index) => (
                    <Text key={index}>{user}</Text>
                  ))}
                </Flex>
              </Scrollbars>
            </Box>
          ))}
        </Flex>
      )}
    </Flex>
  );
};
export default Contribution;
