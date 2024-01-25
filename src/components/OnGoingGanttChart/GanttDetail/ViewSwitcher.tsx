import React from "react";
import { ViewMode } from "gantt-task-react";
import { Button, Flex, FormLabel, FormControl, Switch } from "@chakra-ui/react";

interface ViewSwitcherProps {
  isChecked: boolean;
  onViewModeChange: (viewMode: ViewMode) => void;
  onViewListChange: (isChecked: boolean) => void;
  view: ViewMode;
  discip: string;
  onDisciplineChange: (discip: string) => void;
}

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  onViewModeChange,
  onViewListChange,
  onDisciplineChange,
  isChecked,
  view,
  discip,
}) => {
  const buttonStyle = {
    background: "transparent",
    color: "#f56565",
    border: "1px solid #f56565 ",
    minWidth: "80px",
    _active: {
      background: "#f56565",
      color: "#fff",
    },
  };

  const flexStyle = {
    align: "center",
    justify: "flex-end",
    gap: "10px",
    bg: "#fff",
    padding: "5px",
  };
  return (
    <Flex justify={"space-between"}>
      <Flex {...flexStyle}>
        <Button
          {...buttonStyle}
          onClick={() => onDisciplineChange("")}
          isActive={discip === ""}
        >
          All
        </Button>
        <Button
          {...buttonStyle}
          onClick={() => onDisciplineChange("Architecture")}
          isActive={discip === "Architecture"}
        >
          Architecture
        </Button>
        <Button
          {...buttonStyle}
          onClick={() => onDisciplineChange("Structure")}
          isActive={discip === "Structure"}
        >
          Structure
        </Button>
        <Button
          {...buttonStyle}
          onClick={() => onDisciplineChange("MEP")}
          isActive={discip === "MEP"}
        >
          MEP
        </Button>
        <Button
          {...buttonStyle}
          onClick={() => onDisciplineChange("RnD")}
          isActive={discip === "RnD"}
        >
          RnD
        </Button>
      </Flex>
      <Flex {...flexStyle}>
        <Button
          {...buttonStyle}
          onClick={() => onViewModeChange(ViewMode.Day)}
          isActive={view === "Day"}
        >
          Day
        </Button>
        <Button
          {...buttonStyle}
          onClick={() => onViewModeChange(ViewMode.Week)}
          isActive={view === "Week"}
        >
          Week
        </Button>
        <Button
          {...buttonStyle}
          onClick={() => onViewModeChange(ViewMode.Month)}
          isActive={view === "Month"}
        >
          Month
        </Button>
        <Button
          {...buttonStyle}
          onClick={() => onViewModeChange(ViewMode.Year)}
          isActive={view === "Year"}
        >
          Year
        </Button>
        <Flex align={"center"} justify={"center"} gap={"5px"}>
          <FormControl display="flex" alignItems="center" gap={"5px"}>
            <Switch
              id="showtask"
              size={"lg"}
              colorScheme="red"
              isChecked={isChecked}
              onChange={() => onViewListChange(!isChecked)}
            />
            <FormLabel htmlFor="showtask" mb="0" color={"#b7b3b3"}>
              Show Task List
            </FormLabel>
          </FormControl>
        </Flex>
      </Flex>
    </Flex>
  );
};
