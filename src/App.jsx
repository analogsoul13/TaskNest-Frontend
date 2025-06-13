import './App.css'
import Auth from './pages/Auth'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import MyTasks from './components/MyTasks'
import { ToastContainer } from 'react-toastify'
import ProfileCard from './components/ProfileCard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Auth/>} />
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>} />
      <Route path='/mytasks' element={<ProtectedRoute><MyTasks/></ProtectedRoute>} />
      <Route path='/myprofile' element={<ProtectedRoute><ProfileCard/></ProtectedRoute>} />
    </Routes>
    <ToastContainer />
    </>
  )
}

export default App
