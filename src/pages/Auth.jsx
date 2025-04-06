import React, { useState, useEffect } from 'react';
import 'animate.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profilePicUrl: ''
  });
  const [animation, setAnimation] = useState('animate__fadeIn');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnimation('animate__pulse');
    setTimeout(() => setAnimation('animate__fadeIn'), 1000);
    
    console.log('Form submitted:', formData);
    
    if (isLogin) {
      console.log('Logging in with:', {
        email: formData.email,
        password: formData.password
      });
    } else {
      console.log('Registering with:', formData);
    }
  };

  const toggleAuthMode = () => {

    setAnimation('animate__fadeOut');
    
    setTimeout(() => {
      setIsLogin(!isLogin);
      setAnimation('animate__fadeIn');
    }, 500);
  };

  useEffect(() => {
    setAnimation('animate__fadeIn');
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className={`w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl animate__animated ${animation}`}>
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {isLogin ? 'Welcome Back' : 'Join Us Today'}
          </h1>
          <p className="mt-2 text-gray-500">
            {isLogin ? 'Sign in to your account' : 'Create your new account'}
          </p>
        </div>

        {/* Toggle buttons with improved styling */}
        <div className="flex p-1 bg-gray-100 rounded-lg shadow-inner mb-6" role="group">
          <button
            type="button"
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ease-in-out ${
              isLogin
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'bg-transparent text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => isLogin ? null : toggleAuthMode()}
          >
            Login
          </button>
          <button
            type="button"
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ease-in-out ${
              !isLogin
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'bg-transparent text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => !isLogin ? null : toggleAuthMode()}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Only show name field when registering */}
          {!isLogin && (
            <div className="animate__animated animate__fadeInDown">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required={!isLogin}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Email field */}
          <div className="animate__animated animate__fadeInDown" style={{ animationDelay: '0.1s' }}>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password field */}
          <div className="animate__animated animate__fadeInDown" style={{ animationDelay: '0.2s' }}>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Only show profile picture URL field when registering */}
          {!isLogin && (
            <div className="animate__animated animate__fadeInDown" style={{ animationDelay: '0.3s' }}>
              <label htmlFor="profilePicUrl" className="block text-sm font-medium text-gray-700">
                Profile Picture URL
              </label>
              <input
                id="profilePicUrl"
                name="profilePicUrl"
                type="url"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                placeholder="https://example.com/your-photo.jpg"
                value={formData.profilePicUrl}
                onChange={handleChange}
              />
            </div>
          )}

          {/* Submit button */}
          <div className="animate__animated animate__fadeInUp" style={{ animationDelay: '0.4s' }}>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </form>

        {/* Toggle link with animation */}
        <div className="text-center mt-6 animate__animated animate__fadeInUp" style={{ animationDelay: '0.5s' }}>
          <button
            type="button"
            onClick={toggleAuthMode}
            className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;