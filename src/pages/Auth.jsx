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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                    {isLogin ? "Login" : "Register"}
                </h2>
                
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <div className="space-y-4">
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />

                            <input
                                type="text"
                                name="profilePic"
                                placeholder="Profile Picture URL"
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </>
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />

                    {!isLogin && (
                        <select
                            name="role"
                            onChange={handleChange}
                            value={formData.role}
                            className="w-full p-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="client">Client</option>
                            <option value="freelancer">Freelancer</option>
                        </select>
                    )}

                    <button
                        onClick={isLogin ? handleLogin : handleRegister}
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 disabled:bg-gray-400"
                    >
                        {loading ? "Processing..." : isLogin ? "Login" : "Register"}
                    </button>
                </div>

                <p
                    onClick={() => setIsLogin(!isLogin)}
                    className="mt-4 text-center text-sm text-blue-500 cursor-pointer hover:underline"
                >
                    {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                </p>
            </div>
        </div>
    );
};

export default Auth;
