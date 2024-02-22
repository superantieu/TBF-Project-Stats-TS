import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

import countToChartData from "../../../utility/countToChartData";
import { RTKQueryProps } from "../../../interfaces/rtkQueryAPI.interface";

import ContributeChart from "../ProjectDetailChart/ContributeChart";
import LoadingPage from "../../../pages/LoadingPage";

type ContributeByDifficultyProps = RTKQueryProps & {
  Difficulty: string[];
};
const ContributeByDifficulty: React.FC<ContributeByDifficultyProps> = ({
  Difficulty,
  error,
  isError,
  isLoading,
}) => {
  const toast = useToast();

  const countDiffi = countToChartData(Difficulty);

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
  return <ContributeChart totalhour={countDiffi} />;
};
export default ContributeByDifficulty;
