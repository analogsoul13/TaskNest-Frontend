import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle, XCircle, Calendar, DollarSign, IndianRupee, User, Eye } from 'lucide-react';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppliedJobs } from '../redux/slices/appliedJobsSlice';

const MyTasks = () => {
  const [activeTab, setActiveTab] = useState('all');

  const token = useSelector((state) => state.auth.token)
  const dispatch = useDispatch();
  const { jobs, status, error } = useSelector((state) => state.appliedJobs);

  useEffect(() => {
    if (token) {
      dispatch(fetchAppliedJobs(token));
    }
  }, [dispatch,token]);

  const filterTasks = (status) => {
    if (status === 'All') return jobs;
    return jobs.filter(task => task.status === status);
  };

  const filteredTasks = filterTasks(activeTab);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Accepted':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'Accepted':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Rejected':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Accepted':
        return 'Accepted';
      case 'Rejected':
        return 'Rejected';
      default:
        return 'Pending';
    }
  };

  const tabs = [
    { id: 'All', label: 'All Tasks', count: jobs.length },
    { id: 'Pending', label: 'Applied', count: jobs.filter(t => t.status === 'Pending').length },
    { id: 'Accepted', label: 'Accepted', count: jobs.filter(t => t.status === 'Accepted').length },
    { id: 'Rejected', label: 'Rejected', count: jobs.filter(t => t.status=== 'Rejected').length }
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
          <p className="text-sm sm:text-base text-gray-600">Track your task applications and manage your projects</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-4 sm:mb-6">
          <nav className="flex flex-wrap gap-2 sm:gap-0 sm:space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-3 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-1 sm:ml-2 bg-gray-100 text-gray-600 py-0.5 px-1.5 sm:px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Task Grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white  rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="p-4 sm:p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(task.status)}
                    <span className={getStatusBadge(task.status)}>
                      {getStatusText(task.status)}
                    </span>
                  </div>
                </div>

                {/* Title and Client */}
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {task.jobId.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <User className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm truncate">{task.jobId.postedBy.name}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                  {task.jobId.description}
                </p>

                {/* Budget */}
                <div className="flex items-center text-green-600 mb-3 sm:mb-4">
                  <IndianRupee className="w-4 h-4 mr-1" />
                  <span className="font-semibold text-sm sm:text-base">{task.jobId.budget.toLocaleString()}</span>
                </div>

                {/* Skills */}
                {/* <div className="mb-3 sm:mb-4">
                  <div className="flex flex-wrap gap-1">
                    {task.skills.slice(0, 2).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                    {task.skills.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                        +{task.skills.length - 2} more
                      </span>
                    )}
                  </div>
                </div> */}

                {/* Dates */}
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Applied: {new Date(task.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">Deadline: {new Date(task.jobId.deadline).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-3 sm:pt-4 border-t border-gray-100">
                  <button className="w-full flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors text-xs sm:text-sm font-medium">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-sm sm:text-base text-gray-500 max-w-sm mx-auto">
              {activeTab === 'all' 
                ? "You haven't applied to any tasks yet. Start browsing available projects!"
                : `No ${activeTab} tasks at the moment.`}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default MyTasks;
