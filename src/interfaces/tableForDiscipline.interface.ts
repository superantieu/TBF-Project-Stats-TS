import { ColumnDefExtended } from "../components/Dashboard/SubComponent/TableWithMore";
import { IProjectResult } from "./projectResult.interface";
import { ICompletedProject } from "./projectTable.interface";

export interface Paginitation {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  pagesize: number;
  totalCount: number;
  totalPages: number;
}

export interface TableForDisciplineProps {
  columns: ColumnDefExtended<ICompletedProject>[];
  data: ICompletedProject[];
  project: {
    isSuccess: boolean;
    message: string;
    pagination: Paginitation;
    result: IProjectResult[];
  };
  rowNavigate: { path: string; slug: string };
  setCurrent: (value: number) => void;
}
