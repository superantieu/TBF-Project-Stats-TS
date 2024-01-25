import { ColumnDefExtended } from "../components/Dashboard/TableWithMore";
import { IProjectResult } from "./projectResult.interface";

export interface Paginitation {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface TableForDisciplineProps {
  columns: ColumnDefExtended<any>[];
  data: { [key: string]: any }[];
  project: {
    isSuccess: boolean;
    message: string;
    pagination: Paginitation;
    result: IProjectResult[];
  };
  rowNavigate: { path: string; slug: string };
  setCurrent: (value: number) => void;
}
