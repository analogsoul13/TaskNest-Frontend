import React, { useEffect, useState } from 'react';
import { Search, ChevronRight, Check, Clock, IndianRupeeIcon } from 'lucide-react';
import Navbar from './Navbar';
import { applyForJobApi, getApplicationsApi, getJobsApi } from '../services/allApis';
import { format, formatDistanceToNow } from 'date-fns'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const FreelancerDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBudget, setSelectedBudget] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [appliedTasks, setAppliedTasks] = useState([]);
  const token = useSelector((state) => state.auth.token)

  const budgetRanges = {
    1: [0, 500],
    2: [500, 1000],
    3: [1000, Infinity]
  };

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

  const applyForJob = async (jobId) => {
    try {
      const header = {
        Authorization: `Bearer ${token}`
      }

      await applyForJobApi(jobId, header)

      setAppliedTasks(prev => [...prev, jobId])
      toast.success("Succesfully applied.")
    } catch (error) {
      console.error('Failed to apply for task :', error)
      toast.error("Could not apply to this task. Please try again.")
    }
  }

  const fetchAllJobs = async () => {
    setLoading(true)
    try {
      const filters = {
        ...(searchTerm && { searchTerm }),
        ...(selectedCategories && { selectedCategories })
      }

      const response = await getJobsApi(filters)
      setTasks(response.data.jobs)
      console.log('Fetched Jobs', response);

    } catch (error) {
      console.log("Error fetching jobs!!")
    }
  }

  useEffect(() => {
    fetchAllJobs()
  }, [searchTerm, selectedCategories])

  const fetchAppliedJobs = async () => {
    if (!token) return
    const header = {
      Authorization: `Bearer ${token}`
    }
    const response = await getApplicationsApi(header);
    console.log('Fetched Applied Jobs', response);
    const appliedJobIds = response.data.map(app => app.jobId._id)
    
    setAppliedTasks(appliedJobIds)
  }

  useEffect(() => {
    fetchAppliedJobs()
  }, [token])


  const filteredTasks = tasks.filter((task) => {
    // Search logic
    const matchesSearch = searchTerm === "" || [task.title, task.description, task.category]
      .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase())
      )
    // Category Logic
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(task.category)

    // Budget Logic
    const matchesBudget = selectedBudget.length === 0 || selectedBudget.some(id => {
      const [min, max] = budgetRanges[id];
      return task.budget >= min && task.budget <= max
    })

    return matchesSearch && matchesCategory && matchesBudget
  })


  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleBudget = (rangeId) => {
    if (selectedBudget.includes(rangeId)) {
      setSelectedBudget(selectedBudget.filter(id => id !== rangeId))
    } else {
      setSelectedBudget([...selectedBudget, rangeId])
    }
  };



  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };



  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar filter - hidden on mobile unless toggled */}
        <aside className={`
          ${sidebarOpen ? 'block' : 'hidden'} 
          md:block md:w-64 md:flex-shrink-0 bg-white p-4 border-r border-gray-200
        `}>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center">
                  <input
                    id={`category-${category}`}
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                  />
                  <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>


          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Budget</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="budget-low"
                  type="checkbox"
                  onChange={() => toggleBudget(1)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="budget-low" className="ml-2 text-sm text-gray-700">
                  ₹0 - ₹500
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="budget-medium"
                  type="checkbox"
                  onChange={() => toggleBudget(2)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="budget-medium" className="ml-2 text-sm text-gray-700">
                  ₹500 - ₹1000
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="budget-high"
                  type="checkbox"
                  onChange={() => toggleBudget(3)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="budget-high" className="ml-2 text-sm text-gray-700">
                  ₹1000+
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-grow p-4 sm:p-6 lg:p-8">
          {/* Search bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search for tasks by title, skills or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Task count */}
          <div className="mb-6 flex justify-between items-center flex-wrap">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Available Tasks <span className="text-gray-500 font-normal">({tasks.length})</span>
            </h2>

            <div className="mt-2 sm:mt-0 flex space-x-2">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Newest First
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Highest Budget
              </button>
            </div>
          </div>

          {/* Task list */}
          <div className="space-y-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div key={task._id} className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-md">
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">Posted By: <span className='text-blue-500 cursor-pointer'>{task.postedBy.email}</span> </p>
                      </div>
                      <div className="flex items-center">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Posted {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-gray-600">{task.description}</p>


                    <div className="mt-4 flex justify-between items-center flex-wrap">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-500 mr-1" />
                          <span className="text-sm text-gray-600">Deadline : {format(new Date(task.deadline), 'MMM d, yyyy')}</span>
                        </div>
                        <div className="font-medium text-xs p-1 flex items-center bg-yellow-400 rounded-full text-gray-700"><IndianRupeeIcon className='h-4 w-4' />{task.budget}</div>
                      </div>

                      <div className="mt-3 sm:mt-0">
                        {appliedTasks.includes(task._id) ? (
                          <button
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 focus:outline-none cursor-default"
                            disabled
                          >
                            <Check className="h-4 w-4 mr-1" /> Applied
                          </button>
                        ) : (
                          <button
                            onClick={() => applyForJob(task._id)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Apply Now <ChevronRight className="h-4 w-4 ml-1" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="mx-auto h-12 w-12" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No tasks found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default FreelancerDashboard;