import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import { DataForRender } from "../../CompletedProjects/SubComponent/ProjectDetail";
import { contributeOptionStyle } from "../../../style/chartStyle";
import TaskTable from "../../Tables/TaskTable";

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
  if (Object.keys(personhour).length > 10) {
    const data = Object.values(personhour).map((value, index) => {
      return { taskName: Object.keys(personhour)[index], taskHour: value };
    });
    return <TaskTable data={data} name={"Full Name"} hour={"Work"} />;
  }

  return (
    <ReactApexChart options={options} series={series} type="bar" height={350} />
  );
};
export default ContributeByPerson;
