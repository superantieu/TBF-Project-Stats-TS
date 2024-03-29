import Scrollbars from "react-custom-scrollbars-2";
import { useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useGetOngoingProjectQuery } from "../../services/ongoingApi.js";

import ProjectList from "../CompletedProjects/SubComponent/ProjectList.js";
import RenderThumb from "../../scrollbar/RenderThumb.js";
import LoadingPage from "../../pages/LoadingPage.js";

const SpecificProject = () => {
  const params = useParams();
  const toast = useToast();
  const {
    data: specificProjects,
    error,
    isError,
    isLoading,
  } = useGetOngoingProjectQuery({
    projectId: params.id,
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
      <ProjectList projects={specificProjects.result} />
    </Scrollbars>
  );
};
export default SpecificProject;
