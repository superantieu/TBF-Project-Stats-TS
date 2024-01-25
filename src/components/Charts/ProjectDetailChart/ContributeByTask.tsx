import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

import { useGetTaskQuery } from "../../../services/ongoingApi";
import { DataForRender } from "../../CompletedProjects/ProjectDetail";
import { contributeOptionStyle } from "../../../style/chartStyle";

import TaskTable from "../../Tables/TaskTable";

interface ContributeByTaskProps {
  taskhour: DataForRender;
}
const ContributeByTask: React.FC<ContributeByTaskProps> = ({ taskhour }) => {
  const toast = useToast();
  const taskName = Object.keys(taskhour).map((taskId) => {
    const {
      data: taskData,
      error,
      isError,
      isLoading,
    } = useGetTaskQuery(taskId);
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
      return taskId;
    }
    return taskData.result.name;
  });

  const series: ApexAxisChartSeries = [
    { name: "Work", data: Object.values(taskhour) },
  ];

  const options: ApexOptions = {
    ...contributeOptionStyle(taskName),
  };

  if (Object.keys(taskhour).length > 10) {
    const data = Object.values(taskhour).map((value, index) => {
      return { taskName: taskName[index], taskHour: value };
    });
    return <TaskTable data={data} />;
  }

  return (
    <ReactApexChart options={options} series={series} type="bar" height={350} />
  );
};
export default ContributeByTask;
