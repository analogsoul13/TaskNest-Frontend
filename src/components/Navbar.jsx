import React from 'react'
import { Filter, Briefcase, X, LogOut } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ toggleSidebar, sidebarOpen }) => {
  const dispatch = useDispatch()
  const nav = useNavigate()
  const userName = useSelector((state) => state.auth.userInfo.name)

  const handleLogout = () => {
    dispatch(logout())
    nav('/')
  }

  const handleTaskClick = () => {
    nav('/mytasks')
  }

  const handleDashboadClick = () => {
    nav('/dashboard')
  }

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  TaskNest
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <button onClick={handleDashboadClick} className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200">
                  Dashboard
                </button>
                <button onClick={handleTaskClick} className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100">
                  My Tasks
                </button>
                <p className='text-sm font-medium'>Welcome <span className='text-blue-500 font-semibold'>{userName}</span></p>
                <button onClick={handleLogout} className="flex items-center px-3 gap-2 py-2 rounded-md text-sm font-medium text-red-500 hover:text-slate-100 hover:bg-red-500">
                  Logout <LogOut className='h-4 w-4' />
                </button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex items-center md:hidden space-x-2">
              {/* Mobile Dashboard & Tasks */}
              <button onClick={handleDashboadClick} className="px-2 py-1.5 rounded-md text-xs font-medium text-gray-900 bg-gray-100 hover:bg-gray-200">
                Dashboard
              </button>
              <button onClick={handleTaskClick} className="px-2 py-1.5 rounded-md text-xs font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100">
                Tasks
              </button>
              <button onClick={handleLogout} className="flex items-center gap-2 py-2 rounded-md text-xs font-medium text-red-500 hover:text-slate-100 hover:bg-red-500">
                <LogOut className='h-4 w-4' />
              </button>
              <button
                onClick={toggleSidebar}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Filter className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar