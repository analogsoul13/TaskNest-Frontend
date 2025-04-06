import './App.css'
import Auth from './pages/Auth'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Auth/>} />
      <Route path='/home' element={<Home/>} />
    </Routes>
    </>
  )
}

export default App
