import { Outlet } from 'react-router'
import { useTeam } from './context/TeamContext'
import TeamSelection from './pages/TeamSelection'
import './App.css'

function App() {
  const { team } = useTeam()

  if (!team) {
    return <TeamSelection />
  }

  return <Outlet />
}

export default App
