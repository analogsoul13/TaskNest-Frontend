import './App.css'
import Auth from './pages/Auth'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import MyTasks from './components/MyTasks'
import { ToastContainer } from 'react-toastify'
import ProfileCard from './components/ProfileCard'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Auth/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/mytasks' element={<MyTasks/>} />
      <Route path='/myprofile' element={<ProfileCard/>} />
    </Routes>
    <ToastContainer />
    </>
  )
}

export default App
