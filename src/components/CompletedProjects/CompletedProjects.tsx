import Scrollbars from "react-custom-scrollbars-2";
import { Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useGetOngoingProjectQuery } from "../../services/ongoingApi.js";

import ProjectList from "./ProjectList.js";
import RenderThumb from "../../scrollbar/RenderThumb.js";
import Pagination from "../Pagination/Pagination.js";
import LoadingPage from "../../pages/LoadingPage.js";

const Projects = () => {
  const [page, setPage] = useState(1);
  const toast = useToast();

  const {
    data: Projects,
    error,
    isError,
    isLoading,
  } = useGetOngoingProjectQuery({
    pageNumber: page,
    Completed: true,
    pageSize: 10,
  });
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
      <ProjectList projects={Projects.result} />
      <Flex align={"center"} justify={"center"}>
        <Pagination
          current={Projects.pagination.currentPage}
          pageCount={Projects.pagination.totalPages}
          setCurrent={setPage}
        />
      </Flex>
    </Scrollbars>
  );
};

export default Projects;
