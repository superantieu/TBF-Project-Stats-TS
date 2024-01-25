export const DIRECT_OPTION: { [key: string]: { [key: string]: string } } = {
  Projects: {
    direct: "/projectdetail/",
    name: "projectName",
    id: "projectId",
  },
  Users: { direct: "/users/", name: "fullName", id: "userId" },
  "Tasks/Discipline": {
    direct: "/discipline/",
    name: "taskDiscipline",
    id: "taskDiscipline",
  },
};
