import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { DataForRender } from "../../CompletedProjects/ProjectDetail";

interface ContributeChartProps {
  totalhour: DataForRender;
}

const ContributeChart: React.FC<ContributeChartProps> = ({ totalhour }) => {
  const series: ApexNonAxisChartSeries = Object.values(totalhour);
  const options: ApexOptions = {
    chart: {
      width: 480,
      type: "donut",
    },
    labels: Object.keys(totalhour).map((arr) => {
      return arr;
    }),
    legend: {
      labels: {
        colors: "#e7dede",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="donut"
      width={493}
    />
  );
};
export default ContributeChart;
