import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ongoingApi = createApi({
  reducerPath: "ongoingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:7777/api/",
  }),
  endpoints: (builder) => ({
    getOngoingProject: builder.query({
      query: (params) => ({
        url: `project/specific/selectproject`,
        // url: `project`,
        params,
      }),
    }),
    getSearchProject: builder.query({
      query: ({ type, ...params }) => ({
        url: `${type}`,
        params,
      }),
    }),
    getCompactProject: builder.query({
      query: (params) => ({
        url: `project/specific/compact`,
        // url: `project/compact`,
        params,
      }),
    }),
    getTimeSheet: builder.query({
      query: (params) => ({
        url: `timesheet/timesheet/project`,
        // url: `timesheet/project`,
        params,
      }),
    }),
    getTask: builder.query({
      query: (params) => ({
        url: `task/task/specific/${params}`,
        // url: `task/specific/${params}`,
      }),
    }),
    getAllTasks: builder.query({
      query: (params) => ({
        url: `tasks`,
        params,
      }),
    }),
    getDiscipline: builder.query({
      query: (params) => ({
        url: `task/task/discipline`,
        // url: `task/discipline/search`,
        params,
      }),
    }),
    getUser: builder.query({
      query: (params) => ({
        url: `employee/stats/${params}`,
        // url: `users/${params}`,
      }),
    }),
    getAllUsers: builder.query({
      query: (params) => ({
        url: `employee/stats`,
        // url: `users`,
        params,
      }),
    }),
    runDev: builder.query({
      query: (params) => ({
        // url: `employee`,
        url: `command/rundev`,
        params,
      }),
    }),
  }),
});

export const {
  useGetOngoingProjectQuery,
  useGetCompactProjectQuery,
  useGetTimeSheetQuery,
  useGetUserQuery,
  useGetTaskQuery,
  useGetAllTasksQuery,
  useGetAllUsersQuery,
  useGetDisciplineQuery,
  useGetSearchProjectQuery,
  useRunDevQuery,
} = ongoingApi;
