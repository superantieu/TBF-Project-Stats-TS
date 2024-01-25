import { useMemo, useState, memo, useEffect } from "react";
import { ViewMode, Gantt, Task } from "gantt-task-react";
import { Box, Stack, useDisclosure, useToast } from "@chakra-ui/react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { useGetOngoingProjectQuery } from "../../../services/ongoingApi";
import {
  FilterMember,
  IProjectResult,
} from "../../../interfaces/projectResult.interface";

import { ViewSwitcher } from "../../OnGoingGanttChart/GanttDetail/ViewSwitcher";
import CustomizeTooltip from "../../OnGoingGanttChart/GanttDetail/CustomizeTooltip";
import TaskListTable from "../../OnGoingGanttChart/GanttDetail/TaskListTable";
import TaskListHeader from "../../OnGoingGanttChart/GanttDetail/TaskListHeader";
import BasicModal from "../../Modal/BasicModel";
import LoadingPage from "../../../pages/LoadingPage";

export type TasksExtended = Task & {
  totalhours: number;
  member: FilterMember[];
};

const MemoGantt = memo(Gantt);

const GanttChartRender = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.Month);
  const [isChecked, setIsChecked] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [direct, setDirect] = useState("");
  const [name, setName] = useState("");
  const [discip, setDiscip] = useState("");

  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  const {
    data: ganttChart,
    error,
    isError,
    isLoading,
  } = useGetOngoingProjectQuery({
    Completed: false,
    pageSize: 50,
  });
  const toast = useToast();
  const tasks = useMemo(() => {
    const temp: TasksExtended[] = [
      {
        start: new Date(Date.now() - 10000),
        end: new Date(),
        name: "",
        id: "dt.projectId",
        progress: 100,
        type: "project",
        hideChildren: false,
        displayOrder: 1, // Vị trí hàng trên gantt chart
        totalhours: 1,
        member: [],
      },
    ];
    ganttChart?.result &&
      (ganttChart.result as IProjectResult[]).forEach((dt, index) => {
        const data: TasksExtended = {
          start: new Date(dt.startDate),
          end: new Date(dt.targetDate),
          name: dt.projectName,
          id: dt.projectId,
          progress: Math.round(
            (100 * (new Date().getTime() - new Date(dt.startDate).getTime())) /
              (new Date(dt.targetDate).getTime() -
                new Date(dt.startDate).getTime())
          ),
          type: "project",
          hideChildren: false,
          displayOrder: index + 1, // Vị trí hàng trên gantt chart
          totalhours: dt.totalHours,
          member: dt.filterMembers,
        };
        if (discip === "") {
          temp.push(data);
        } else {
          const isValid = dt.filterMembers.some(
            (member) => member.discipline === discip
          );
          if (isValid) {
            temp.push(data);
          }
        }
      });
    if (temp.length > 1) {
      temp.shift();
    }
    return temp;
  }, [ganttChart?.result, discip]);

  const handleDisciplineChange = (disc: string) => {
    setDiscip(disc);
  };

  // const getStartEndDateForProject = (
  //   tasks: TasksExtended[],
  //   projectId: string
  // ) => {
  //   const projectTasks = tasks.filter(
  //     (t: TasksExtended) => t.project === projectId
  //   );
  //   let start = projectTasks[0].start;
  //   let end = projectTasks[0].end;

  //   for (let i = 0; i < projectTasks.length; i++) {
  //     const task = projectTasks[i];
  //     if (start.getTime() > task.start.getTime()) {
  //       start = task.start;
  //     }
  //     if (end.getTime() < task.end.getTime()) {
  //       end = task.end;
  //     }
  //   }
  //   return [start, end];
  // };

  const handleDblClick = (task: Task) => {
    setDirect(task.id);
    setName(task.name);
    onOpen();
  };

  useEffect(() => {
    if (isError) {
      toast({
        status: "error",
        duration: 2500,
        position: "top-right",
        title: "ABC",
        description: ((error as FetchBaseQueryError)?.data as any)?.title,
      });
    }
  }, [isError]);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <Stack>
      <ViewSwitcher
        onViewModeChange={(viewMode: ViewMode) => setView(viewMode)}
        onViewListChange={setIsChecked}
        onDisciplineChange={handleDisciplineChange}
        isChecked={isChecked}
        view={view}
        discip={discip}
      />
      <Box>
        <BasicModal
          isOpen={isOpen}
          onClose={onClose}
          direct={direct}
          name={name}
        />
        <MemoGantt
          tasks={tasks}
          viewMode={view}
          onDoubleClick={handleDblClick}
          listCellWidth={isChecked ? "100px" : ""}
          columnWidth={columnWidth}
          // barProgressColor={"#f56565"}
          barProgressColor={"red"}
          // @ts-ignore
          TooltipContent={CustomizeTooltip}
          TaskListTable={TaskListTable}
          TaskListHeader={TaskListHeader}
          ganttHeight={500}
          todayColor={"#ccc"}
        />
      </Box>
    </Stack>
  );
};

export default GanttChartRender;
