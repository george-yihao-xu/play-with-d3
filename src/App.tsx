import './App.css'
import ProjectConstructionTypeChart from './charts/ProjectConstructionTypeChart'
import { ConstructionTypeInfo } from './components/ConstructionTypeInfo'
import ProjectList from './components/ProjectList'
import { ProjectProvider } from './context/ProjectContext'
import AreaChart from './charts/AreaChart'
import projects from './dummyData/projects'

function App() {
  return (
    <ProjectProvider>
      <div>
        <h1>Project Construction Type Chart</h1>
        <div style={{ display: "flex", width: "100%", gap: "10px" }}>
          <ProjectConstructionTypeChart />
          <ProjectList projects={projects} />
          <ConstructionTypeInfo />
        </div>
        <div>
          <AreaChart projects={projects} />
        </div>
      </div>
    </ProjectProvider>
  )
}

export default App
