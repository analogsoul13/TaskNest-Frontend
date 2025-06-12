import React, { useEffect, useState } from 'react';
import { Bell, Search, Plus, Calendar, User, FileText, MessageSquare, Settings, ChevronDown, Check, X, EyeIcon, Trash, Edit, CheckCircle, XCircle } from 'lucide-react';
import { createJobApi, deleteJobApi, getApplicationsApi, getMyJobsApi, updateApplicationStatusApi } from '../services/allApis';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import ProfileCard from './ProfileCard';

const ClientDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [applications, setApplications] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', budget: '', deadline: '', category: '' });
  const userName = useSelector((state) => state.auth.userInfo.name)
  const userEmail = useSelector((state) => state.auth.userInfo.email)
  const userPic = useSelector((state) => state.auth.userInfo.profilePic)
  const token = useSelector((state) => state.auth.token)
  const [activeTab, setActiveTab] = useState('tasks');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const nav = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const header = {
          Authorization: `Bearer ${token}`
        }

        const [jobRes, applicationsRes] = await Promise.all([
          getMyJobsApi(header),
          getApplicationsApi(header)
        ])

        setTasks(jobRes.data)
        setApplications(applicationsRes.data)
        console.log('Applications Received :', applicationsRes.data)

      } catch (error) {
        console.error('Error fetching jobs :', error)
        setTasks([])
      }
    }
    fetchData()
  }, [token])

  const viewReqCount = Array.isArray(applications) ? applications.reduce((acc, req) => {
    const jobId = req.jobId._id
    acc[jobId] = (acc[jobId] || 0) + 1
    return acc
  }, {})
    : {}

  const handleCreateTask = async (e) => {
    e.preventDefault()

    const jobData = {
      title: newTask.title,
      description: newTask.description,
      category: newTask.category,
      budget: newTask.budget,
      deadline: newTask.deadline
    }

    try {
      const header = {
        Authorization: `Bearer ${token}`
      }
      const createdJob = await createJobApi(header, jobData)
      console.log('Created Job :', createdJob);
      const job = createdJob.data?.job || createdJob

      setTasks(prev => [...prev, job])
      console.log('Task:', tasks);


      setShowNewTaskModal(false)
      setNewTask({ title: '', description: '', budget: '', deadline: '', category: '' })
      toast.success("Job created succesfully!")
    } catch (error) {
      console.error('Error creating job:', error)
      toast.error(error.response?.data?.message || 'Job creation failed')
    }
  }


  const categories = [
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
    "Graphic Design",
    "Writing",
    "Data Science",
    "Marketing",
    "Video Editing",
    "Voice Over",
    "Database"
  ];

  const handleDelete = async (jobId) => {
    try {
      const header = {
        Authorization: `Bearer ${token}`
      }
      await deleteJobApi(jobId, header)
      toast.success("Job deleted succesfully")

      setTasks(prev => prev.filter(task => task._id !== jobId))
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error(error.response?.data?.message || "Failed to delete job")
    }
  }

  const acceptRequest = async (requestId, jobId) => {
    try {
      const header = {
        Authorization: `Bearer ${token}`
      }
      await updateApplicationStatusApi(requestId, "Accepted", header)

      setApplications(prev => prev.map(request => {
        if (request._id === requestId) {
          return { ...request, status: "Accepted" }
        } else if (request.jobId._id === jobId && request._id !== requestId) {
          return { ...request, status: "Rejected" }
        }
        return request
      }))

      toast.success("Application status updated succesfully")

    } catch (error) {
      toast.error(`Error accepting request: ${error.message}`)

    }
  }

  const rejectRequest = async (requestId) => {
    try {
      const header = {
        Authorization: `Bearer ${token}`
      }
      await updateApplicationStatusApi(requestId, "Rejected", header);

      setApplications(prev =>
        prev.map(request =>
          request._id === requestId ? { ...request, status: "Rejected" } : request
        )
      );
    } catch (err) {
      console.error("Error rejecting request:", err);
    }
  }



  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleLogout = () => {
    dispatch(logout())
    nav('/')
  }

  const viewTaskRequests = (taskId) => {
    setSelectedTaskId(taskId);
    setActiveTab('requests');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">TaskNest</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-32 sm:w-auto"
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <button className="relative p-1 rounded-full text-gray-500 hover:text-gray-600">
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <div className="relative">
                <button
                  className="flex items-center space-x-2"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                >
                  {userPic ? (
                    <img
                      src={userPic}
                      alt="User Profile"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                      {userName?.[0]?.toUpperCase() || 'U'}
                    </div>
                  )}

                  <span className="font-medium hidden sm:block">{userName}</span>
                  <ChevronDown size={16} />
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                      <div className="font-medium">Client Dashboard</div>
                      <div className="text-gray-500">{userEmail}</div>
                    </div>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Help & Support
                    </a>
                    <hr className="my-1" />
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row">
          {/* Mobile Navigation Tabs */}
          <div className="block lg:hidden mb-4">
            <div className="bg-white shadow rounded-lg p-2">
              <div className="flex overflow-x-auto space-x-1">
                <button
                  className={`flex items-center px-3 py-2 rounded-md whitespace-nowrap text-sm font-medium ${activeTab === 'tasks' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => setActiveTab('tasks')}
                >
                  <FileText size={16} className="mr-2" />
                  Tasks
                </button>
                <button
                  className={`flex items-center px-3 py-2 rounded-md whitespace-nowrap text-sm font-medium ${activeTab === 'requests' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => setActiveTab('requests')}
                >
                  <User size={16} className="mr-2" />
                  Requests
                </button>
                <button className="flex items-center px-3 py-2 rounded-md whitespace-nowrap text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <MessageSquare size={16} className="mr-2" />
                  Messages
                </button>
                <button className={`flex items-center px-3 py-2 rounded-md whitespace-nowrap text-sm font-medium ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <Settings size={16} className="mr-2" />
                  Profile
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 mr-6">
            <div className="bg-white shadow rounded-lg p-4">
              <nav>
                <ul>
                  <li
                    className={`flex items-center p-3 rounded-md cursor-pointer ${activeTab === 'tasks' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => setActiveTab('tasks')}
                  >
                    <FileText size={20} className="mr-3" />
                    <span className="font-medium">My Tasks</span>
                  </li>
                  <li
                    className={`flex items-center p-3 rounded-md cursor-pointer ${activeTab === 'requests' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => setActiveTab('requests')}
                  >
                    <User size={20} className="mr-3" />
                    <span className="font-medium">Freelancer Requests</span>
                  </li>
                  <li className="flex items-center p-3 rounded-md cursor-pointer text-gray-700 hover:bg-gray-50">
                    <MessageSquare size={20} className="mr-3" />
                    <span className="font-medium">Messages</span>
                  </li>
                  <li className={`flex items-center p-3 rounded-md cursor-pointer ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => setActiveTab('profile')}>
                    <Settings size={20} className="mr-3" />
                    <span className="font-medium">Profile</span>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-white shadow rounded-lg p-6">
              {activeTab === 'tasks' && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Tasks Created by You</h2>
                    <button
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      onClick={() => setShowNewTaskModal(true)}
                    >
                      <Plus size={18} className="mr-1" />
                      Post New Task
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                      <thead>
                        <tr className="bg-gray-50 text-gray-600 text-left">
                          <th className="py-3 px-4 font-medium">Task Title</th>
                          <th className="py-3 px-4 font-medium">Budget</th>
                          <th className="py-3 px-4 font-medium">Status</th>
                          <th className="py-3 px-4 font-medium">Requests</th>
                          <th className="py-3 px-4 font-medium">Due Date</th>
                          <th className="py-3 px-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {tasks.map(task => (
                          <tr key={task._id} className="hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="font-medium text-gray-900">{task.title}</div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">{task.description}</div>
                            </td>
                            <td className="py-3 px-4 text-gray-900">{task.budget}</td>
                            <td className="py-3 px-4 text-gray-900">{task.category}</td>
                            <td className="flex justify-center py-3 px-4 text-gray-900">
                              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                                onClick={() => viewTaskRequests(task._id)}>
                                {viewReqCount[task._id] || 0}
                                <EyeIcon size={18} />
                              </button>
                            </td>
                            <td className="py-3 px-4 text-gray-900">{new Date(task.deadline).toLocaleDateString()}</td>
                            <td className="flex justify-between items-center p-6">
                              <button onClick={() => handleDelete(task._id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash size={18} />
                              </button>
                              <button
                                className="text-red-600 hover:text-red-800"
                              >
                                <Edit size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {tasks.length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-gray-500">You don't have any tasks yet. Post your first task to get started!</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {activeTab === 'requests' && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-sm sm:text-xl font-semibold text-gray-800">
                      {selectedTaskId ?
                        `Requests for: ${tasks.find(t => t._id === selectedTaskId)?.title}` :
                        'All Freelancer Requests'}
                    </h2>
                    <div className='flex space-x-4'>
                      <button
                        className="px-2 sm:px-4 py-2 border border-gray-300 text-gray-700 text-xs sm:text-sm rounded-md hover:bg-gray-50"
                        onClick={() => {
                          setSelectedTaskId(null)
                          setActiveTab('tasks')
                        }}
                      >
                        Back to Tasks
                      </button>
                      <button
                        className="px-2 sm:px-4 py-2 border border-gray-300 text-gray-700 text-xs sm:text-sm rounded-md hover:bg-gray-50"
                        onClick={() => setSelectedTaskId(null)}
                      >
                        All Requests
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {applications
                      .filter(request => !selectedTaskId || request.jobId._id === selectedTaskId)
                      .map(request => (
                        <div key={request._id} className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${request.status === "Accepted"
                          ? "border-green-500 bg-green-50"
                          : request.status === "Rejected"
                            ? "border-red-400 bg-red-50"
                            : "border-gray-200 bg-white"
                          }`}>
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <div className="mb-4 md:mb-0">
                              <h3 className="font-medium text-gray-900">{request.candidateId.name}</h3>
                              <p className="text-sm text-gray-500 mt-1">
                                Task: {tasks.find(t => t._id === request.jobId._id)?.title}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-900 font-medium">₹{request.jobId.budget}</span>
                              <span className="text-gray-500">•</span>
                              {
                                request.candidateId.profilePic ?
                                  <img src={request.candidateId.profilePic} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                                  :
                                  <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-icons-png.flaticon.com%2F256%2F9131%2F9131529.png&f=1&nofb=1&ipt=9f9092f256a42b9e4087f271286d1ff3ce19bb74a9d9538192377f6405a4ac74" alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                              }

                            </div>
                          </div>

                          <div className="mt-4">
                            <p className="text-gray-700">Requested By : {request.candidateId.email}</p>
                            <p className="text-gray-700">Status : {request.status}</p>
                          </div>

                          <div className="mt-4 flex justify-between items-center">
                            {request.status === 'Pending' ? (
                              <div className="flex space-x-3">
                                <button
                                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                                  onClick={() => acceptRequest(request._id, request.jobId._id)}
                                >
                                  <Check size={16} className="mr-1" />
                                  Accept Offer
                                </button>
                                <button
                                  className="px-4 py-2 border border-gray-300 bg-red-600 text-gray-50 rounded-md hover:bg-red-400 flex items-center"
                                  onClick={() => rejectRequest(request._id)}
                                >
                                  <X size={16} className="mr-1" />
                                  Decline
                                </button>
                              </div>
                            ) : (
                              <div className={`px-3 flex items-center gap-2 py-1 rounded-full text-sm ${request.status === 'Accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                {/* Check icon */}
                                {request.status} {request.status === "Accepted" && <CheckCircle className="text-green-600 mr-2" size={16} />}
                                {/* X Icon */}
                                {request.status === "Rejected" && <XCircle className="text-red-600 mr-2" size={16} />}
                              </div>
                            )}
                            <button className="text-blue-600 hover:text-blue-800">Message</button>
                          </div>
                        </div>
                      ))}

                    {applications.filter(request => !selectedTaskId || request.jobId._id === selectedTaskId).length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No requests found for this task yet.</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              {activeTab === 'profile' && (
                <>
                  <ProfileCard
                    name={userName}
                    email={userEmail}
                    profilePic={userPic} />
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Backdrop for dropdowns */}
      {(showNewTaskModal || showUserDropdown) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setShowNewTaskModal(false);
            setShowUserDropdown(false);
          }}
        ></div>
      )}

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 z-20 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-30" onClick={() => setShowNewTaskModal(false)}></div>
            <div className="relative bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Post a New Task</h3>
              <form onSubmit={handleCreateTask}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={newTask.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={newTask.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                    required
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                    <input
                      type="text"
                      name="budget"
                      value={newTask.budget}
                      onChange={handleChange}
                      placeholder="₹"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input
                      type="date"
                      name="deadline"
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    onClick={() => setShowNewTaskModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Post Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;