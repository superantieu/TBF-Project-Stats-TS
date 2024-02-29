import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Flex, Link as SupLink, Text, useToast } from "@chakra-ui/react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { FetchBaseQueryError, skipToken } from "@reduxjs/toolkit/query";

import { useGetSearchProjectQuery } from "../../../services/ongoingApi";
import { DIRECT_OPTION } from "../../../constants/page-direct";

import LoadingPage from "../../../pages/LoadingPage";

interface SearchTableProps {
  searchValue: string;
  type: string;
}
const SearchTable: React.FC<SearchTableProps> = ({ searchValue, type }) => {
  const [renderValue, setRenderValue] = useState([]);
  const toast = useToast();

  const {
    data: searchProjects,
    error,
    isError,
    isLoading,
  } = useGetSearchProjectQuery(
    searchValue
      ? {
          type: type,
          searchTerm: searchValue,
          // pageSize: 10,
        }
      : skipToken
  );
  useMemo(() => {
    if (searchProjects?.result && searchValue) {
      setRenderValue(searchProjects.result);
    } else {
      setRenderValue([]);
    }
  }, [searchProjects?.result, searchValue]);

  useEffect(() => {
    if (isError) {
      toast({
        status: "error",
        duration: 2500,
        position: "top-right",
        title: "ABC",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        description: ((error as FetchBaseQueryError)?.data as any)?.title,
      });
    }
  }, [isError, error, toast]);
  console.log("dis", searchProjects?.result);
  if (isLoading) {
    return (
      <Scrollbars
        autoHide={true}
        autoHideTimeout={1000}
        style={{
          backgroundColor: "#5f5a5a",
          borderRadius: "0 0 10px 10px",
        }}
      >
        <Flex flexDirection={"column"} padding={"8px"}>
          <LoadingPage />
        </Flex>
      </Scrollbars>
    );
  }

  return (
    <Scrollbars
      autoHide={true}
      autoHideTimeout={1000}
      style={{
        backgroundColor: "#5f5a5a",
        borderRadius: "0 0 10px 10px",
      }}
    >
      <Flex flexDirection={"column"} padding={"8px"}>
        {renderValue.map((arr, index) => (
          <SupLink
            as={Link}
            to={`${DIRECT_OPTION[type].direct}${arr[DIRECT_OPTION[type].id]}`}
            key={index}
            cursor={"pointer"}
            _hover={{ color: "red" }}
          >
            <Text
              maxW={"240px"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
            >
              {arr[DIRECT_OPTION[type].name]}
            </Text>
          </SupLink>
        ))}
      </Flex>
    </Scrollbars>
  );
};

export default SearchTable;
