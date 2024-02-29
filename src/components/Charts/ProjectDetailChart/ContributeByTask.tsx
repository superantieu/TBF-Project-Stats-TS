import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";

import { useGetTaskQuery } from "../../../services/ongoingApi";
import { DataForRender } from "../../CompletedProjects/SubComponent/ProjectDetail";
import { contributeOptionStyle } from "../../../style/chartStyle";

import TaskTable from "../../Tables/TaskTable";

interface ContributeByTaskProps {
  taskhour: DataForRender;
}

const useTaskData = (TaskId: string) => {
  const toast = useToast();
  const { data: taskData, error, isError, isLoading } = useGetTaskQuery(TaskId);

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

  return { taskData, isLoading };
};

const ContributeByTask: React.FC<ContributeByTaskProps> = ({ taskhour }) => {
  // const toast = useToast();

  const taskName = Object.keys(taskhour).map((TaskId) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { taskData, isLoading } = useTaskData(TaskId);

    if (isLoading) {
      return TaskId;
    }

    console.log("task", taskData);
    return taskData.result[0].Name;
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
    return <TaskTable data={data} name={"Task Name"} hour={"Task Hour"} />;
  }

  return (
    <ReactApexChart options={options} series={series} type="bar" height={350} />
  );
};

export default ContributeByTask;
