import { Box, Heading, Text } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <Box id="error-page">
      <Heading>Oops!</Heading>
      <Text>Sorry, an unexpected error has occurred.</Text>
      <Text as="i">Hehe</Text>
    </Box>
  );
};

export default ErrorPage;
