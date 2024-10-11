import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProjectConstructionTypeChart from './charts/projectConstructionTypeChart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Project Construction Type Chart</h1>
        <ProjectConstructionTypeChart />
      </div>
    </>
  )
}

export default App
