import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

import { RTKQueryProps } from "../../../interfaces/rtkQueryAPI.interface";

import ContributeChart from "../ProjectDetailChart/ContributeChart";
import LoadingPage from "../../../pages/LoadingPage";

type ContributeByDifficultyProps = RTKQueryProps & {
  difficulty: string[];
};
const ContributeByDifficulty: React.FC<ContributeByDifficultyProps> = ({
  difficulty,
  error,
  isError,
  isLoading,
}) => {
  const toast = useToast();

  let countDiffi: { [key: string]: number } = {};

  difficulty.forEach((loca) => {
    if (countDiffi[loca]) {
      countDiffi[loca]++;
    } else {
      countDiffi[loca] = 1;
    }
    return countDiffi;
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
  return <ContributeChart totalhour={countDiffi} />;
};
export default ContributeByDifficulty;
