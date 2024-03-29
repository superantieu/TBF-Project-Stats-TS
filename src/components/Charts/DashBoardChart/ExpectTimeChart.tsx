import ReactApexChart from "react-apexcharts";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { ApexOptions } from "apexcharts";

import { IProjectResult } from "../../../interfaces/projectResult.interface";
import {
  labelsStyle,
  optionsChart,
  yAxisStyleFc,
} from "../../../style/chartStyle";

import BasicModal from "../../Modal/BasicModel";

type Target = {
  x: string;
  y: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  goals: any[];
};
type Overtarget = {
  x: string;
  y: number;
};
interface ExpectTimeChartProps {
  data: IProjectResult[];
}
interface Value {
  target: Target[];
  overTarget: Overtarget[];
}

const ExpectTimeChart: React.FC<ExpectTimeChartProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [direct, setDirect] = useState("");
  const [name, setName] = useState("");

  const targ: Target[] = [];
  const overTarg: Overtarget[] = [];

  data.map((obj) => {
    targ.push({
      x: obj.ProjectName,
      y: Math.round(
        (new Date(obj.TargetDate).getTime() -
          new Date(obj.StartDate).getTime()) /
          (1000 * 24 * 3660)
      ),
      goals: [
        {
          name: "Actual Time",
          value: Math.round(
            (new Date(obj.CompletedDate).getTime() -
              new Date(obj.StartDate).getTime()) /
              (1000 * 24 * 3660)
          ),
          strokeHeight: 6,
          strokeColor: "#ebeb07",
        },
      ],
    });
    overTarg.push({
      x: obj.ProjectName,
      y:
        Math.round(
          (new Date(obj.CompletedDate).getTime() -
            new Date(obj.TargetDate).getTime()) /
            (1000 * 24 * 3660)
        ) > 0
          ? Math.round(
              (new Date(obj.CompletedDate).getTime() -
                new Date(obj.TargetDate).getTime()) /
                (1000 * 24 * 3660)
            )
          : 0,
    });
  });
  const value: Value = {
    target: targ,
    overTarget: overTarg,
  };

  const series = [
    {
      name: "Target",
      data: value.target,
    },
    {
      name: "Exceed",
      data: value.overTarget,
    },
  ];
  const options: ApexOptions = {
    ...optionsChart("INFORMATION OF ON-GOING PROJECTS", "65%"),
    chart: {
      height: 350,
      stacked: true,
      type: "bar",
      events: {
        dataPointSelection: (event, _chart, config) => {
          if (event.button === 2) {
            const wantDirect = data[config.dataPointIndex]["ProjectId"];
            const wantName = data[config.dataPointIndex]["ProjectName"];
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
    colors: ["#00E396", "#e53e3e"],
    legend: {
      labels: {
        colors: "#fff",
      },
      show: true,
      showForSingleSeries: true,
      customLegendItems: ["Actual", "Exceed", "Target Time"],
      markers: {
        fillColors: ["#ebeb07", "#e53e3e", "#00E396"],
      },
    },
    xaxis: {
      labels: labelsStyle,
    },

    yaxis: {
      ...yAxisStyleFc("Time (days)", "#008FFB"),
    },
  };
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
        height={400}
      />
    </>
  );
};
export default ExpectTimeChart;
