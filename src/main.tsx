import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";

import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import NotFoundPage from "./pages/NotfoundPage.tsx";
import LoadingPage from "./pages/LoadingPage.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import Projects from "./components/CompletedProjects/CompletedProjects.tsx";
import OngoingProjectDetail from "./components/OnGoingProjects/OnGoingProject.tsx";
import UserDetail from "./components/DetailPage/UsersDetail.tsx";
import SpecificProject from "./components/DetailPage/SpecificProject.tsx";
import TeamProject from "./components/DetailPage/TeamProject.tsx";
import OngoingGanttChart from "./components/OnGoingGanttChart/OngoingGanttChart.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "/completedprojects",
        element: (
          <Suspense>
            <Projects />
          </Suspense>
        ),
      },
      {
        path: "/ongoingproject",
        element: (
          <Suspense>
            <OngoingProjectDetail />
          </Suspense>
        ),
      },
      {
        path: "/ongoingganttchart",
        element: (
          <Suspense>
            <OngoingGanttChart />
          </Suspense>
        ),
      },
      {
        path: "/users/:id",
        element: (
          <Suspense>
            <UserDetail />
          </Suspense>
        ),
      },
      {
        path: "/Discipline/:name",
        element: (
          <Suspense>
            <TeamProject />
          </Suspense>
        ),
      },
      {
        path: "/projectdetail/:id",
        element: (
          <Suspense>
            <SpecificProject />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "/*",
    element: <NotFoundPage />,
    errorElement: <ErrorPage />,
  },
]);
const customTheme = extendTheme({
  styles: {
    global: {
      ".selectbox > option": {
        background: "#272a2f !important",
      },
      ".selectbox > optgroup": {
        maxH: "20px !important",
      },
      ".selectbox": {
        size: "2 !important",
        as: "select",
      },

      ".apexcharts-tooltip-y-group": {
        display: "flex",
        gap: "20px",
        alignItems: "center",
        justifyContent: "flex-end",
      },
      ".apexcharts-hidden-element-shown": {
        transform: "translateY(-3px)",
      },

      ".apexcharts-tooltip": {
        whiteSpace: "break-spaces !important",
        maxWidth: "250px",
      },
      ".apexcharts-tooltip-goals-group": {
        alignItems: "flex-end !important",
      },
      ".apexcharts-tooltip-marker": {
        top: "10px !important",
      },
      ".apexcharts-tooltip-series-group": {
        alignItems: "flex-start !important",
      },

      "._2dZTy:nth-of-type(2n)": {
        fill: "#fff",
      },
      "._2dZTy:nth-of-type(2n+1)": {
        fill: "#edf2f7",
      },
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={customTheme}>
        <RouterProvider router={router} fallbackElement={<LoadingPage />} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
export default router;
