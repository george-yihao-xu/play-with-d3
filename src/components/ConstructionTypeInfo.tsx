import { useProjectContext } from "../context/ProjectContext";
import projects from "../dummyData/projects";
import colors from "../dummyData/colors";

export const ConstructionTypeInfo = () => {
    const { activeConstructionType } = useProjectContext();

    return <div>
        <h2>Construction Type Info</h2>
        <p>Active Construction Type: <b style={{ color: colors.constructionType[activeConstructionType as keyof typeof colors.constructionType] }}>{activeConstructionType}</b></p>
        <p>Number of projects: <b>{projects.filter(project => project.constructionType === activeConstructionType).length}</b></p>
        <ul>
            {projects.filter(project => project.constructionType === activeConstructionType).map(project => (
                <li key={project.id}>{project.name}</li>
            ))}
        </ul>
    </div>
}

export default ConstructionTypeInfo;