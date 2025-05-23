import React, { useState } from 'react';
import { Bell, Search, Plus, Calendar, User, FileText, MessageSquare, Settings, ChevronDown, Check, X } from 'lucide-react';

const ClientDashboard = () => {
  // Sample data - in a real application, this would come from an API
  const [tasks, setTasks] = useState([
    { id: 1, title: "Website Redesign", description: "Need a complete redesign of my e-commerce website", budget: "$1500", status: "Active", requests: 7, dueDate: "Apr 20, 2025" },
    { id: 2, title: "Mobile App Development", description: "Looking for React Native developer for a fitness app", budget: "$3000", status: "Active", requests: 3, dueDate: "May 15, 2025" },
    { id: 3, title: "Logo Design", description: "Need a modern logo for my consulting business", budget: "$500", status: "Closed", requests: 12, dueDate: "Completed" }
  ]);

  const [activeRequests, setActiveRequests] = useState([
    { id: 1, freelancer: "John Doe", taskId: 1, proposal: "I can redesign your website with modern UI/UX principles...", price: "$1450", deliveryTime: "10 days", status: "Pending" },
    { id: 2, freelancer: "Jane Smith", taskId: 1, proposal: "I specialize in e-commerce redesigns with 5 years experience...", price: "$1600", deliveryTime: "7 days", status: "Pending" },
    { id: 3, freelancer: "Mike Johnson", taskId: 2, proposal: "Expert React Native developer with fitness app experience...", price: "$2800", deliveryTime: "14 days", status: "Pending" }
  ]);

  const [activeTab, setActiveTab] = useState('tasks');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', budget: '', dueDate: '' });
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const acceptRequest = (requestId) => {
    setActiveRequests(activeRequests.map(request => 
      request.id === requestId 
        ? {...request, status: 'Accepted'} 
        : request.id !== requestId && request.taskId === activeRequests.find(r => r.id === requestId).taskId 
          ? {...request, status: 'Rejected'} 
          : request
    ));
  };

  const rejectRequest = (requestId) => {
    setActiveRequests(activeRequests.map(request => 
      request.id === requestId ? {...request, status: 'Rejected'} : request
    ));
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    const newTaskWithId = {
      ...newTask, 
      id: tasks.length + 1,
      status: 'Active',
      requests: 0
    };
    setTasks([...tasks, newTaskWithId]);
    setShowNewTaskModal(false);
    setNewTask({ title: '', description: '', budget: '', dueDate: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({...newTask, [name]: value});
  };

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
              <h1 className="text-xl font-bold text-blue-600">TaskNest</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <button className="relative p-1 rounded-full text-gray-500 hover:text-gray-600">
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                  C
                </div>
                <span className="font-medium">Client</span>
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-64 mb-6 md:mb-0">
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
                  <li className="flex items-center p-3 rounded-md cursor-pointer text-gray-700 hover:bg-gray-50">
                    <Calendar size={20} className="mr-3" />
                    <span className="font-medium">Calendar</span>
                  </li>
                  <li className="flex items-center p-3 rounded-md cursor-pointer text-gray-700 hover:bg-gray-50">
                    <Settings size={20} className="mr-3" />
                    <span className="font-medium">Settings</span>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 md:ml-6">
            <div className="bg-white shadow rounded-lg p-6">
              {activeTab === 'tasks' && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">My Tasks</h2>
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
                          <tr key={task.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="font-medium text-gray-900">{task.title}</div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">{task.description}</div>
                            </td>
                            <td className="py-3 px-4 text-gray-900">{task.budget}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                task.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {task.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-900">{task.requests}</td>
                            <td className="py-3 px-4 text-gray-900">{task.dueDate}</td>
                            <td className="py-3 px-4">
                              <button 
                                className="text-blue-600 hover:text-blue-800"
                                onClick={() => viewTaskRequests(task.id)}
                              >
                                View Requests
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
                    <h2 className="text-xl font-semibold text-gray-800">
                      {selectedTaskId ? 
                        `Requests for: ${tasks.find(t => t.id === selectedTaskId)?.title}` : 
                        'All Freelancer Requests'}
                    </h2>
                    <button 
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                      onClick={() => setActiveTab('tasks')}
                    >
                      Back to Tasks
                    </button>
                  </div>

                  <div className="space-y-4">
                    {activeRequests
                      .filter(request => !selectedTaskId || request.taskId === selectedTaskId)
                      .map(request => (
                        <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                            <div className="mb-4 md:mb-0">
                              <h3 className="font-medium text-gray-900">{request.freelancer}</h3>
                              <p className="text-sm text-gray-500 mt-1">
                                Task: {tasks.find(t => t.id === request.taskId)?.title}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-900 font-medium">{request.price}</span>
                              <span className="text-gray-500">•</span>
                              <span className="text-gray-900">{request.deliveryTime}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <p className="text-gray-700">{request.proposal}</p>
                          </div>
                          
                          <div className="mt-4 flex justify-between items-center">
                            {request.status === 'Pending' ? (
                              <div className="flex space-x-3">
                                <button 
                                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                                  onClick={() => acceptRequest(request.id)}
                                >
                                  <Check size={16} className="mr-1" />
                                  Accept Offer
                                </button>
                                <button 
                                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center"
                                  onClick={() => rejectRequest(request.id)}
                                >
                                  <X size={16} className="mr-1" />
                                  Decline
                                </button>
                              </div>
                            ) : (
                              <div className={`px-3 py-1 rounded-full text-sm ${
                                request.status === 'Accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {request.status}
                              </div>
                            )}
                            <button className="text-blue-600 hover:text-blue-800">Message</button>
                          </div>
                        </div>
                      ))}
                      
                    {activeRequests.filter(request => !selectedTaskId || request.taskId === selectedTaskId).length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-gray-500">No requests found for this task yet.</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black opacity-30" onClick={() => setShowNewTaskModal(false)}></div>
            <div className="relative bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Post a New Task</h3>
              <form onSubmit={handleCreateTask}>
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
                      placeholder="$"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input 
                      type="text" 
                      name="dueDate"
                      value={newTask.dueDate}
                      onChange={handleChange}
                      placeholder="Apr 30, 2025"
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