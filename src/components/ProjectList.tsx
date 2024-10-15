import { useProjectContext } from "../context/ProjectContext";
import { Project } from "../dummyData/projects";
import colors from "../dummyData/colors";

interface ProjectListProps {
    projects: Project[];
}

export const ProjectList = ({ projects }: ProjectListProps) => {
    const { selectedProject, setSelectedProject, setActiveConstructionType } = useProjectContext();


    return <div style={{ width: "300px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <h2>Project List</h2>
        <p>Click on a project to select it</p>
        <p>Selected Project: <b>{selectedProject?.name}</b>, whose construction type is <b style={{ color: colors.constructionType[selectedProject?.constructionType as keyof typeof colors.constructionType] }}>{selectedProject?.constructionType}</b></p>
        <ul>
            {projects.map((project) => (
                <li style={{ marginBottom: "10px", cursor: "pointer" }} key={project.id} onClick={() => {
                    setSelectedProject(project);
                    setActiveConstructionType(project.constructionType);
                }}>
                    <div>
                        <span>{project.id};</span>
                        <span>{project.name};</span>
                        <span style={{ color: colors.constructionType[project.constructionType as keyof typeof colors.constructionType] }}>
                            {project.constructionType};
                        </span>
                        <span>{project.gsfChanges.map((change) => change.value).join(">")}</span>
                    </div>

                </li>
            ))}
        </ul>
    </div>
};

export default ProjectList;