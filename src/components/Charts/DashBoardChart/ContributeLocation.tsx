import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

import countToChartData from "../../../utility/countToChartData";
import { RTKQueryProps } from "../../../interfaces/rtkQueryAPI.interface";

import ContributeChart from "../ProjectDetailChart/ContributeChart";
import LoadingPage from "../../../pages/LoadingPage";

type ContributeLocationProps = RTKQueryProps & {
  Location: string[];
};

const ContributeLocation: React.FC<ContributeLocationProps> = ({
  Location,
  error,
  isError,
  isLoading,
}) => {
  const toast = useToast();

  const countLoca = countToChartData(Location);
  let otherCount = 0;
  for (var key in countLoca) {
    if (countLoca.hasOwnProperty(key)) {
      if (key === "" || countLoca[key] === 1) {
        otherCount += countLoca[key];
        delete countLoca[key];
      }
    }
  }
  if (otherCount > 0) {
    countLoca["Others"] = otherCount;
  }

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
  return <ContributeChart totalhour={countLoca} />;
};
export default ContributeLocation;
