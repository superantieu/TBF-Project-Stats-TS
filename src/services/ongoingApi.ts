import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ongoingApi = createApi({
  reducerPath: "ongoingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5103/api/",
  }),
  endpoints: (builder) => ({
    getOngoingProject: builder.query({
      query: (params) => ({
        url: `Projects`,
        params,
      }),
    }),
    getSearchProject: builder.query({
      query: ({ type, ...params }) => ({
        url: `${type}`,
        params,
      }),
    }),
    getSpecificProject: builder.query({
      query: (params) => ({
        url: `Projects/${params}`,
      }),
    }),
    getCompactProject: builder.query({
      query: (params) => ({
        url: `Projects/Compact`,
        params,
      }),
    }),
    getTimeSheet: builder.query({
      query: (params) => ({
        url: `TimeSheet`,
        params,
      }),
    }),
    getUser: builder.query({
      query: (params) => ({
        url: `Users/${params}`,
      }),
    }),
    getTask: builder.query({
      query: (params) => ({
        url: `Tasks/${params}`,
      }),
    }),
    getAllTasks: builder.query({
      query: (params) => ({
        url: `Tasks`,
        params,
      }),
    }),
    getAllUsers: builder.query({
      query: (params) => ({
        url: `Users`,
        params,
      }),
    }),
    getDiscipline: builder.query({
      query: (params) => ({
        url: `Tasks/Discipline`,
        params,
      }),
    }),
  }),
});

export const {
  useGetOngoingProjectQuery,
  useGetCompactProjectQuery,
  useGetTimeSheetQuery,
  useGetSpecificProjectQuery,
  useGetUserQuery,
  useGetTaskQuery,
  useGetAllTasksQuery,
  useGetAllUsersQuery,
  useGetDisciplineQuery,
  useGetSearchProjectQuery,
} = ongoingApi;
