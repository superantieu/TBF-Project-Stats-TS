import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

import { RTKQueryProps } from "../../../interfaces/rtkQueryAPI.interface";

import ContributeChart from "../ProjectDetailChart/ContributeChart";
import LoadingPage from "../../../pages/LoadingPage";

type ContributeLocationProps = RTKQueryProps & {
  location: string[];
};

const ContributeLocation: React.FC<ContributeLocationProps> = ({
  location,
  error,
  isError,
  isLoading,
}) => {
  const toast = useToast();

  let countLoca: { [key: string]: number } = {};

  location.forEach((loca) => {
    if (countLoca[loca]) {
      countLoca[loca]++;
    } else {
      countLoca[loca] = 1;
    }
    return countLoca;
  });

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
