import { useMemo } from "react";
import { Box, Flex, Table, Tbody, Td, Tr, Text } from "@chakra-ui/react";
import { Task } from "gantt-task-react";

type TaskListTableProps = {
  tasks: Task[];
  locale: string;
  // onExpanderClick: any;
};
const localeDateStringCache: { [key: string]: string } = {};
const toLocaleDateStringFactory =
  (locale: string) =>
  (date: Date, dateTimeOptions: Intl.DateTimeFormatOptions) => {
    const key = date.toString();
    let lds = localeDateStringCache[key];
    if (!lds) {
      lds = date.toLocaleDateString(locale, dateTimeOptions);
      localeDateStringCache[key] = lds;
    }
    return lds;
  };
const dateTimeOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
};

const TaskListTable: React.FC<TaskListTableProps> = ({
  tasks,
  locale,
  // onExpanderClick,
}) => {
  const toLocaleDateString = useMemo(
    () => toLocaleDateStringFactory(locale),
    [locale]
  );

  return (
    <Table variant={"striped"}>
      <Tbody
        borderRight={"1px solid #e0e0e0"}
        borderLeft={"1px solid #e0e0e0"}
        borderBottom={"1px solid #e0e0e0"}
      >
        {tasks.map((t, index) => {
          let expanderSymbol = "";
          if (t.hideChildren === false) {
            expanderSymbol = "▼";
          } else if (t.hideChildren === true) {
            expanderSymbol = "▶";
          }

          return (
            <Tr h={"50px"} key={`${t.id}row`}>
              <Td
                minW={"170px"}
                maxW={"170px"}
                title={t.name}
                h={"50px"}
                p={"1px"}
              >
                <Flex align={"center"} justify={"flex-start"} gap={"2px"}>
                  <Box
                    color={"#ccc"}
                    fontSize={"0.8rem"}
                    userSelect={"none"}
                    cursor={expanderSymbol ? "pointer" : ""}
                    padding={
                      expanderSymbol ? "0.15rem 0.2rem 0rem 0.2rem" : "1rem"
                    }
                    // onClick={() => onExpanderClick(t)}
                  >
                    {expanderSymbol}
                  </Box>
                  <Text
                    maxWidth={"150px"}
                    whiteSpace={"nowrap"}
                    maxH={"40px"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                  >
                    {index + 1} {t.name}
                  </Text>
                </Flex>
              </Td>
              <Td minW={"100px"} maxW={"100px"} p={"1px"}>
                {toLocaleDateString(t.start, dateTimeOptions)}
              </Td>
              <Td minW={"10px"} maxW={"100px"} p={"1px"}>
                {toLocaleDateString(t.end, dateTimeOptions)}
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
export default TaskListTable;
