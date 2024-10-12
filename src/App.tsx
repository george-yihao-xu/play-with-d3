import './App.css'
import ProjectConstructionTypeChart from './charts/projectConstructionTypeChart'
import { ConstructionTypeInfo } from './components/ConstructionTypeInfo'
import ProjectList from './components/ProjectList'
import { ProjectProvider } from './context/ProjectContext'
import projects from './dummyData/projects'

function App() {
  return (
    <ProjectProvider>
      <div>
        <h1>Project Construction Type Chart</h1>
        <div style={{ display: "flex", gap: "20px" }}>
          <ProjectConstructionTypeChart />
          <ProjectList projects={projects} />
          <ConstructionTypeInfo />
        </div>
      </div>
    </ProjectProvider>
  )
}

export default App
