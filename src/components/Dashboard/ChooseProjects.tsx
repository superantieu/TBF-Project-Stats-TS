import {
  useCheckboxGroup,
  Stack,
  useCheckbox,
  chakra,
  Flex,
  Box,
  Text,
  Button,
  UseCheckboxProps,
  useToast,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import Scrollbars from "react-custom-scrollbars-2";

import { useGetCompactProjectQuery } from "../../services/ongoingApi";
import { IProjectResult } from "../../interfaces/projectResult.interface";
import { setChoose } from "../../redux/chooseSlice";
import LoadingPage from "../../pages/LoadingPage";
import { useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function CustomCheckbox(props: UseCheckboxProps) {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props);
  return (
    <chakra.label
      display="flex"
      flexDirection="row"
      alignItems="center"
      gridColumnGap={2}
      maxW="800px"
      bg="green.50"
      border="1px solid"
      borderColor="green.500"
      rounded="lg"
      px={3}
      py={1}
      cursor="pointer"
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />
      <Flex
        alignItems="center"
        justifyContent="center"
        border="2px solid"
        borderColor="green.500"
        w={4}
        h={4}
        {...getCheckboxProps({})}
      >
        {state.isChecked && <Box w={2} h={2} bg="green.500" />}
      </Flex>
      <Text color="gray.700" {...getLabelProps()}>
        {props.name}
      </Text>
    </chakra.label>
  );
}

function ChooseProjects() {
  const toast = useToast();
  const dispatch = useDispatch();
  const { value, getCheckboxProps, setValue } = useCheckboxGroup({
    defaultValue: [],
  });
  const {
    data: ongoCompactProjects,
    error,
    isError,
    isLoading: compactLoading,
  } = useGetCompactProjectQuery({
    pageSize: 50,
  });
  const handleClick = () => {
    dispatch(setChoose(value));
  };
  const handleDeselect = () => {
    setValue([]);
    dispatch(setChoose([]));
  };
  useEffect(() => {
    if (isError) {
      toast({
        status: "error",
        duration: 2500,
        position: "top-right",
        title: "ABC",
        description: ((error as FetchBaseQueryError)?.data as any)?.title,
      });
    }
  }, [isError]);

  if (compactLoading) {
    return <LoadingPage />;
  }
  return (
    <Stack
      padding={"20px"}
      maxW={"1000px"}
      minW={"600px"}
      gap={"10px"}
      h={"350px"}
      overflow={"hidden"}
    >
      <Button onClick={handleDeselect}>Deselect All</Button>
      <Scrollbars
        autoHide={true}
        autoHideTimeout={1000}
        style={{
          backgroundColor: "#fff",
        }}
      >
        {(ongoCompactProjects?.result as IProjectResult[]).map(
          (compactproject, index) => {
            return (
              <Box padding={"1px"} mr={"10px"} key={index}>
                <CustomCheckbox
                  {...getCheckboxProps({
                    value: compactproject.projectId,
                    name: compactproject.projectName,
                  })}
                />
              </Box>
            );
          }
        )}
      </Scrollbars>
      <Button onClick={handleClick}>Choose these projects </Button>
    </Stack>
  );
}
export default ChooseProjects;
