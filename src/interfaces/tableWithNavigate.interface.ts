import { ColumnDefExtended } from "../components/Dashboard/SubComponent/TableWithMore";
import { IProjectResult } from "./projectResult.interface";
import { ICompletedProject } from "./projectTable.interface";

export interface TableWithPaginationProps {
  columns: ColumnDefExtended<ICompletedProject>[];
  data: ICompletedProject[];
  current: number;
  pageCount: number;
  setCurrent: (value: number) => void;
  chartData: IProjectResult[]; // kiểu dữ liệu của chartData
}
