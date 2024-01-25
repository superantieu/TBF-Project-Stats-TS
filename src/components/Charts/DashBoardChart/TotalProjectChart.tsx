import ReactApexChart from "react-apexcharts";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { ApexOptions } from "apexcharts";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useGetOngoingProjectQuery } from "../../../services/ongoingApi";
import {
  FilterMember,
  IProjectResult,
} from "../../../interfaces/projectResult.interface";
import { chooseSelector } from "../../../redux/chooseSlice";
import groupbykey from "../../../utility/groupbykey";
import {
  labelsStyle,
  optionsChart,
  yAxisStyleFc,
} from "../../../style/chartStyle";

import BasicModal from "../../Modal/BasicModel";
import LoadingPage from "../../../pages/LoadingPage";

interface TotalProjectChartProps {
  orderBy: string;
}
interface ContributeResult {
  members: number[];
  targetHours: number[];
  listMembers: { [key: string]: FilterMember[] }[];
  categories: string[];
  tasks: number[];
}
const TotalProjectChart: React.FC<TotalProjectChartProps> = ({ orderBy }) => {
  const filter = useSelector(chooseSelector);
  const valueFilter = filter.value.toString();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [direct, setDirect] = useState("");
  const [name, setName] = useState("");

  const {
    data: ongoProjects,
    error,
    isError,
    isLoading,
  } = useGetOngoingProjectQuery({
    Completed: false,
    ChooseProject: valueFilter,
    pageSize: filter.value.length < 10 ? 10 : filter.value.length,
    orderBy,
  });
  const toast = useToast();

  const contributeResult: ContributeResult = useMemo(() => {
    if (ongoProjects?.result) {
      const mems = [] as number[];
      const hours = [] as number[];
      const list = [] as { [key: string]: FilterMember[] }[];
      const category = [] as string[];
      const task = [] as number[];
      ongoProjects.result.map((x: IProjectResult) => {
        const numberOfTeam: { [key: string]: FilterMember[] } = groupbykey(
          x.filterMembers,
          "discipline"
        );
        mems.push(x.filterMembers.length);
        hours.push(x.totalHours);
        list.push(numberOfTeam);
        category.push(x.projectName);
        task.push(x.tasks);
      });
      return {
        members: mems,
        targetHours: hours,
        listMembers: list,
        categories: category,
        tasks: task,
      };
    }
    return {
      members: [],
      targetHours: [],
      listMembers: [],
      categories: [],
      tasks: [],
    };
  }, [ongoProjects?.result]);
  const detailMember = contributeResult.listMembers.map((array) => {
    return Object.keys(array).map((arr) => {
      return `${arr} : ${array[arr].length}`;
    });
  });
  const series = [
    {
      name: "Task",
      data: contributeResult.tasks,
    },
    {
      name: "Member",
      data: contributeResult.members,
    },
    {
      name: "Target Hour",
      data: contributeResult.targetHours,
    },
  ];
  const options: ApexOptions = {
    ...optionsChart("INFORMATION OF ON-GOING PROJECTS", "65%"),
    chart: {
      height: 450,
      width: 300,
      type: "bar",
      events: {
        dataPointSelection: (event, chart, options) => {
          if (event.button === 2) {
            const wantDirect =
              ongoProjects.result[options.dataPointIndex]["projectId"];
            const wantName =
              ongoProjects.result[options.dataPointIndex]["projectName"];
            setDirect(wantDirect);
            setName(wantName);
            onOpen();
          }
        },
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#008FFB", "#ffff00", "#de7818"],
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    legend: {
      labels: {
        colors: "#fff",
      },
    },
    xaxis: {
      categories: contributeResult.categories,
      tickPlacement: "between",
      labels: labelsStyle,
    },
    yaxis: [
      {
        ...yAxisStyleFc("Number of Tasks", "#008FFB"),
      },
      {
        opposite: true,
        ...yAxisStyleFc("Number of Participants", "yellow"),
      },
      {
        opposite: true,
        ...yAxisStyleFc("Target Hours", "#de7818"),
      },
      ,
    ] as ApexYAxis,
    fill: {
      opacity: 1,
    },

    tooltip: {
      enabled: true,
      shared: false,
      fixed: {
        enabled: false,
        position: "topLeft",
        offsetX: 0,
        offsetY: 0,
      },
      y: [
        "",
        {
          formatter: function (value, { dataPointIndex }) {
            const addingValue = detailMember[dataPointIndex].reduce(
              (arr: string, cur: string) => arr + cur + `<br>`,
              ""
            );
            return `  Total: ` + value + `<br>` + addingValue;
          },
        },
      ] as ApexTooltipY[],
    },
  };

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
    <>
      <BasicModal
        isOpen={isOpen}
        onClose={onClose}
        direct={direct}
        name={name}
      />
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={500}
      />
    </>
  );
};

export default TotalProjectChart;
