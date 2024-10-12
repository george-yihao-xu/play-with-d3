import { useProjectContext } from "../context/ProjectContext";
import projects from "../dummyData/projects";

export const ConstructionTypeInfo = () => {
    const { activeConstructionType } = useProjectContext();

    return <div>
        <h2>Construction Type Info</h2>
        <p>Active Construction Type: <b>{activeConstructionType}</b></p>
        <p>Number of projects: <b>{projects.filter(project => project.constructionType === activeConstructionType).length}</b></p>
    </div>
}