import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface RTKQueryProps {
  error: FetchBaseQueryError;
  isError: boolean;
  isLoading: boolean;
}
