import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { DataForRender } from "../../CompletedProjects/ProjectDetail";
import { contributeOptionStyle } from "../../../style/chartStyle";

interface ContribueByPersonProps {
  personhour: DataForRender;
}

const ContributeByPerson: React.FC<ContribueByPersonProps> = ({
  personhour,
}) => {
  const series: ApexAxisChartSeries = [
    { name: "Work", data: Object.values(personhour) },
  ];
  const options: ApexOptions = {
    ...contributeOptionStyle(Object.keys(personhour)),
  };
  return (
    <ReactApexChart options={options} series={series} type="bar" height={350} />
  );
};
export default ContributeByPerson;
