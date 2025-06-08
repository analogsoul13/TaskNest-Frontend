import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginApi, registerApi } from "../services/authServices";
import { login } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "client", // Default role
        profilePic: "", // Profile Picture URL
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const nav = useNavigate()

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Login
    const handleLogin = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await loginApi({ email: formData.email, password: formData.password });
            if (response.status === 200) {
                console.log(response);
                nav('/dashboard')
                dispatch(login({
                    user: response.data.user,
                    token: response.data.token
                })); // Save user info in Redux
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    // Handle Register
    const handleRegister = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await registerApi(formData);
            if (response.status === 201) {
                setIsLogin(true); // Switch to login after successful registration
            }
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">

            <div className="w-full max-w-6xl mx-auto flex items-center justify-center gap-12 relative z-10">
                {/* Left side - Branding */}
                <div className="hidden lg:block flex-1 text-white space-y-8">
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl flex items-center justify-center">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                TaskNest
                            </h1>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold leading-tight">
                                Where Talent Meets
                                <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                    Opportunity
                                </span>
                            </h2>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                Join thousands of freelancers and clients building amazing projects together.
                                TaskNest is your gateway to endless possibilities in the world of remote work.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-gray-300">Connect with top-tier freelancers</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-gray-300">Secure payments & project management</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-gray-300">24/7 support & quality assurance</span>
                        </div>
                    </div>
                </div>

                {/* Right side - Auth Form */}
                <div className="w-full max-w-md">
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 transform transition-all duration-300 hover:scale-[1.01]">
                        {/* Mobile branding */}
                        <div className="lg:hidden text-center mb-8">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl flex items-center justify-center">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h1 className="text-2xl font-bold text-white">TaskNest</h1>
                            </div>
                            <p className="text-sm text-gray-300">Your freelance marketplace</p>
                        </div>

                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">
                                {isLogin ? "Welcome Back" : "Join TaskNest"}
                            </h2>
                            <p className="text-gray-300">
                                {isLogin ? "Sign in to your account" : "Create your account to get started"}
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                                <p className="text-red-300 text-sm text-center">{error}</p>
                            </div>
                        )}

                        <div className="space-y-6">
                            {!isLogin && (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Enter your full name"
                                            onChange={handleChange}
                                            required
                                            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300">Profile Picture URL</label>
                                        <input
                                            type="text"
                                            name="profilePic"
                                            placeholder="https://example.com/your-photo.jpg"
                                            onChange={handleChange}
                                            required
                                            className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                                        />
                                    </div>
                                </>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                    required
                                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    required
                                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                                />
                            </div>

                            {!isLogin && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">I want to</label>
                                    <select
                                        name="role"
                                        onChange={handleChange}
                                        value={formData.role}
                                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 backdrop-blur-sm appearance-none cursor-pointer"
                                    >
                                        <option value="client" className="bg-gray-100 text-gray-900">Hire freelancers (Client)</option>
                                        <option value="freelancer" className="bg-gray-100 text-gray-900">Offer my services (Freelancer)</option>
                                    </select>
                                </div>
                            )}

                            <button
                                onClick={isLogin ? handleLogin : handleRegister}
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Processing...</span>
                                    </div>
                                ) : (
                                    isLogin ? "Sign In" : "Create Account"
                                )}
                            </button>
                        </div>

                        <div className="mt-8 text-center">
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                            >
                                {isLogin ? (
                                    <>
                                        Don't have an account?
                                        <span className="text-purple-400 ml-1 hover:text-purple-300">Create one</span>
                                    </>
                                ) : (
                                    <>
                                        Already have an account?
                                        <span className="text-purple-400 ml-1 hover:text-purple-300">Sign in</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
