import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  if(!isLoggedIn){
    return <Navigate to={"/"}/>
  }

  return children
}

export default ProtectedRoute