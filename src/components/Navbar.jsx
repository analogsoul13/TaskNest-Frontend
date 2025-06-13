import React, { useState, useRef, useEffect } from 'react'
import { Filter, X, LogOut, User, ChevronDown } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/authSlice'
import { useNavigate, useLocation } from 'react-router-dom'

const Navbar = ({ toggleSidebar, sidebarOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dispatch = useDispatch()
  const nav = useNavigate()
  const location = useLocation()
  const userName = useSelector((state) => state.auth.userInfo.name)
  const profilePic = useSelector((state) => state.auth.userInfo.profilePic)
  const dropdownRef = useRef(null)

  // Check if current page is Dashboard
  const isDashboard = location.pathname === '/dashboard'

  const handleLogout = () => {
    dispatch(logout())
    nav('/')
    setDropdownOpen(false)
  }

  const handleTaskClick = () => {
    nav('/mytasks')
    setDropdownOpen(false)
  }

  const handleDashboardClick = () => {
    nav('/dashboard')
    setDropdownOpen(false)
  }

  const handleProfileClick = () => {
    nav('/myprofile')
    setDropdownOpen(false)
  }

  const handleToggleSidebar = () => {
    setDropdownOpen(false)
    toggleSidebar()
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownOpen])

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                TaskNest
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-2 sm:space-x-4">

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="User Profile"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                      {userName?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}
                </div>
                <span className="hidden sm:inline text-blue-500 font-semibold">{userName}</span>
                <ChevronDown className={`h-3 w-3 sm:h-4 sm:w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <button
                      onClick={handleProfileClick}
                      className="px-2 w-full sm:px-4 py-2 bg-slate-200 text-sm text-gray-700 border-b border-gray-100">
                      <p className="font-medium">Welcome</p>
                      <div className="text-blue-500 font-semibold truncate">{userName}</div>
                    </button>
                    <button
                      onClick={handleDashboardClick}
                      className="w-full text-left px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleTaskClick}
                      className="w-full text-left px-3 sm:px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      My Tasks
                    </button>
                    <hr className="border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 sm:px-4 py-2 text-sm text-red-500 hover:bg-red-50 flex items-center space-x-2 transition-colors"
                    >
                      <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Filter Button - Only show if not on My Tasks page */}
            {isDashboard && (
              <button
                onClick={handleToggleSidebar}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                {sidebarOpen ? <X className="h-6 w-6" /> : <Filter className="h-6 w-6" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar