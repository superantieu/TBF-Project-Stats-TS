import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

import { RTKQueryProps } from "../../../interfaces/rtkQueryAPI.interface";

import ContributeChart from "../ProjectDetailChart/ContributeChart";
import LoadingPage from "../../../pages/LoadingPage";

type ContributeBySizeProps = RTKQueryProps & {
  size: string[];
};

const ContributeBySize: React.FC<ContributeBySizeProps> = ({
  size,
  error,
  isError,
  isLoading,
}) => {
  const toast = useToast();

  let countSize: { [key: string]: number } = {};
  size?.forEach((loca) => {
    if (countSize[loca]) {
      countSize[loca]++;
    } else {
      countSize[loca] = 1;
    }
    return countSize;
  });

  useEffect(() => {
    if (isError) {
      toast({
        status: "error",
        duration: 2500,
        position: "top-right",
        title: "Oops!",
        description: (error?.data as any)?.title,
      });
    }
  }, [isError]);

  if (isLoading) {
    return <LoadingPage />;
  }
  return <ContributeChart totalhour={countSize} />;
};
export default ContributeBySize;
