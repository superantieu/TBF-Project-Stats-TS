import { IProjectResult } from "./projectResult.interface";

export interface TableWithPaginationProps {
  columns: any[];
  data: any[];
  current: number;
  pageCount: number;
  setCurrent: (value: number) => void;
  chartData: IProjectResult[]; // kiểu dữ liệu của chartData
}
