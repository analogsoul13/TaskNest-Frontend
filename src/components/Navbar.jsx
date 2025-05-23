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
  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Briefcase className="h-8 w-8 text-indigo-500" />
              <span className="ml-2 text-2xl font-bold text-gray-900">TaskNest</span>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200">
                  Dashboard
                </button>
                <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100">
                  My Tasks
                </button>
                <p className='text-sm font-medium'>Welcome <span className='text-blue-500 font-semibold'>{userName}</span></p>
                <button onClick={handleLogout} className="flex items-center px-3 gap-2 py-2 rounded-md text-sm font-medium text-red-500 hover:text-slate-100 hover:bg-red-500">
                  Logout <LogOut className='h-4 w-4'/>
                </button>
              </div>
            </div>

            <div className="flex items-center md:hidden">
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