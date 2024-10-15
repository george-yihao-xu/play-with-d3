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
        <section className='main-container'>
          <ProjectConstructionTypeChart />
          <ProjectList projects={projects} />
          <ConstructionTypeInfo />
        </section>
        <div>
          <AreaChart projects={projects} />
        </div>
      </div>
    </ProjectProvider>
  )
}

export default App
