import { Box } from "@chakra-ui/react";
import { useRef, useEffect } from "react";

import { IProjectResult } from "../../interfaces/projectResult.interface";

import ProjectDetail from "./ProjectDetail";

interface ProjectListProps {
  projects: IProjectResult[];
}
const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const topRef = useRef<HTMLDivElement | null>(null);
  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollToTop();
  }, [projects]);

  return (
    <Box mt={"5px"} mb={"5px"} ref={topRef}>
      {projects.map((project) => (
        <ProjectDetail key={project.projectId} project={project} />
      ))}
    </Box>
  );
};
export default ProjectList;
