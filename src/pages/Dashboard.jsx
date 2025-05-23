import React from 'react'
import { useSelector } from 'react-redux'
import ClientDashboard from '../components/ClientDashboard'
import FreelancerDashboard from '../components/FreelancerDashboard'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const nav = useNavigate()
    const userRole = useSelector(state => state.auth.userRole)

    if (!userRole) {
        return <div className='flex w-full h-screen justify-center items-center'>Loading...</div>
    }
    return (
        <div>
            {userRole == "freelancer" ? <FreelancerDashboard/> : <ClientDashboard/>}
        </div>
    )
}

export default Dashboard