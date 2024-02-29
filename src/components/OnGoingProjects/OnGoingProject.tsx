import Scrollbars from "react-custom-scrollbars-2";
import { Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useGetOngoingProjectQuery } from "../../services/ongoingApi.js";

import RenderThumb from "../../scrollbar/RenderThumb.js";
import ProjectList from "../CompletedProjects/SubComponent/ProjectList.js";
import Pagination from "../Pagination/Pagination.js";
import LoadingPage from "../../pages/LoadingPage.js";

const OngoingProjectDetail = () => {
  const [page, setPage] = useState(1);
  const toast = useToast();
  const {
    data: ongoProjects,
    error,
    isError,
    isLoading,
  } = useGetOngoingProjectQuery({
    pageNumber: page,
    isCompleted: 0,
    pageSize: 10,
  });

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

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <Scrollbars
      autoHide={true}
      autoHideTimeout={1000}
      style={{ backgroundColor: "#272a2f" }}
      renderThumbVertical={RenderThumb}
    >
      <ProjectList projects={ongoProjects.result ?? []} />
      <Flex align={"center"} justify={"center"}>
        <Pagination
          current={ongoProjects.pagination.currentPage}
          pageCount={ongoProjects.pagination.totalPages}
          setCurrent={setPage}
        />
      </Flex>
    </Scrollbars>
  );
};

export default OngoingProjectDetail;
