// AuthPage.jsx
import React, { useState, useEffect } from 'react';
import 'animate.css'; // Import animate.css

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [animation, setAnimation] = useState('animate__fadeIn');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    profilePicture: '',
    role: 'client'
  });

  // Handle animation when switching between forms
  useEffect(() => {
    // Trigger animation on form change
    setAnimation('animate__animated animate__fadeIn');
    
    // Remove animation class after animation completes
    const timer = setTimeout(() => {
      setAnimation('');
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [isLogin]);

  const handleSwitchForm = (loginStatus) => {
    // Apply exit animation first
    setAnimation('animate__animated animate__fadeOut');
    
    // Change form after exit animation completes
    setTimeout(() => {
      setIsLogin(loginStatus);
      setAnimation('animate__animated animate__fadeIn');
    }, 300);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', {
      email: formData.email,
      password: formData.password
    });
    // Add your login logic here
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log('Register data:', formData);
    // Add your registration logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 px-4 py-6 sm:px-6 md:px-8" 
         style={{
           backgroundImage: `
             radial-gradient(at 47% 33%, hsl(232.00, 58%, 11%) 0, transparent 59%), 
             radial-gradient(at 82% 65%, hsl(218.00, 39%, 11%) 0, transparent 55%)
           `
         }}>
      <div className="w-full max-w-md animate__animated animate__fadeInUp">
        <div className="bg-gray-800 shadow-xl rounded-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex">
            <button 
              className={`w-1/2 py-3 sm:py-4 text-center font-medium transition-colors duration-300 text-sm sm:text-base ${isLogin ? 'bg-gray-700 border-b-2 border-indigo-600' : ''}`}
              onClick={() => handleSwitchForm(true)}
            >
              Log In
            </button>
            <button 
              className={`w-1/2 py-3 sm:py-4 text-center font-medium transition-colors duration-300 text-sm sm:text-base ${!isLogin ? 'bg-gray-700 border-b-2 border-indigo-600' : ''}`}
              onClick={() => handleSwitchForm(false)}
            >
              Register
            </button>
          </div>

          {/* Form Container with Animation */}
          <div className={animation}>
            {/* Login Form */}
            {isLogin ? (
              <div className="p-4 sm:p-6 md:p-8">
                <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Welcome Back</h1>
                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-4 sm:mb-5">
                    <label className="block text-sm font-medium mb-1 sm:mb-2" htmlFor="login-email">Email</label>
                    <input 
                      id="login-email" 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200 text-sm sm:text-base" 
                      placeholder="your@email.com" 
                      required
                    />
                  </div>

                  <div className="mb-5 sm:mb-6">
                    <label className="block text-sm font-medium mb-1 sm:mb-2" htmlFor="login-password">Password</label>
                    <input 
                      id="login-password" 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200 text-sm sm:text-base" 
                      placeholder="••••••••" 
                      required
                    />
                    <div className="mt-2 text-right">
                      <a href="#" className="text-xs sm:text-sm text-indigo-400 hover:text-indigo-300">Forgot password?</a>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700 text-white font-medium py-2 sm:py-3 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 animate__animated animate__pulse animate__infinite animate__slower text-sm sm:text-base"
                  >
                    Log In
                  </button>
                </form>
              </div>
            ) : (
              /* Register Form */
              <div className="p-4 sm:p-6 md:p-8">
                <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Create Account</h1>
                <form onSubmit={handleRegisterSubmit}>
                  <div className="mb-3 sm:mb-5">
                    <label className="block text-sm font-medium mb-1 sm:mb-2" htmlFor="register-name">Full Name</label>
                    <input 
                      id="register-name" 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200 text-sm sm:text-base" 
                      placeholder="John Doe" 
                      required
                    />
                  </div>

                  <div className="mb-3 sm:mb-5">
                    <label className="block text-sm font-medium mb-1 sm:mb-2" htmlFor="register-email">Email</label>
                    <input 
                      id="register-email" 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200 text-sm sm:text-base" 
                      placeholder="your@email.com" 
                      required
                    />
                  </div>

                  <div className="mb-3 sm:mb-5">
                    <label className="block text-sm font-medium mb-1 sm:mb-2" htmlFor="register-password">Password</label>
                    <input 
                      id="register-password" 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200 text-sm sm:text-base" 
                      placeholder="••••••••" 
                      required
                    />
                  </div>

                  <div className="mb-3 sm:mb-5">
                    <label className="block text-sm font-medium mb-1 sm:mb-2" htmlFor="profile-picture">Profile Picture URL</label>
                    <input 
                      id="profile-picture" 
                      type="url" 
                      name="profilePicture"
                      value={formData.profilePicture}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200 text-sm sm:text-base" 
                      placeholder="https://example.com/your-image.jpg"
                    />
                  </div>

                  <div className="mb-4 sm:mb-6">
                    <label className="block text-sm font-medium mb-1 sm:mb-2">I am a</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                      <div 
                        className={`flex items-center p-3 sm:p-4 border rounded-lg bg-gray-700 cursor-pointer transition-colors duration-200 ${formData.role === 'client' ? 'border-indigo-500' : 'border-gray-600 hover:border-indigo-500'}`}
                        onClick={() => setFormData({...formData, role: 'client'})}
                      >
                        <label className="flex items-center cursor-pointer w-full">
                          <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full border border-gray-400 flex items-center justify-center mr-2 sm:mr-3">
                            {formData.role === 'client' && (
                              <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-indigo-500"></div>
                            )}
                          </div>
                          <span className="text-sm sm:text-base">Client</span>
                        </label>
                      </div>

                      <div 
                        className={`flex items-center p-3 sm:p-4 border rounded-lg bg-gray-700 cursor-pointer transition-colors duration-200 ${formData.role === 'freelancer' ? 'border-indigo-500' : 'border-gray-600 hover:border-indigo-500'}`}
                        onClick={() => setFormData({...formData, role: 'freelancer'})}
                      >
                        <label className="flex items-center cursor-pointer w-full">
                          <div className="w-4 sm:w-5 h-4 sm:h-5 rounded-full border border-gray-400 flex items-center justify-center mr-2 sm:mr-3">
                            {formData.role === 'freelancer' && (
                              <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-indigo-500"></div>
                            )}
                          </div>
                          <span className="text-sm sm:text-base">Freelancer</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-indigo-600 hover:bg-indigo-700 focus:bg-indigo-700 text-white font-medium py-2 sm:py-3 px-4 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 animate__animated animate__pulse animate__infinite animate__slower text-sm sm:text-base"
                  >
                    Create Account
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;