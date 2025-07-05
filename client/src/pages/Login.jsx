import React, { useState } from 'react'
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseURL}/api/auth/login`, {email, password});
            if(response.data.success){
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                if(response.data.user.role === "admin"){
                    navigate('/admin-dashboard')
                } else {
                    navigate('/employee-dashboard')
                }
            }
        } catch(error){
            if(error.response && !error.response.data.success){
                setError(error.response.data.error)
            } else {
                setError("Server error");
            }
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-teal-600 to-gray-100 px-4">
  <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 space-y-6">
    
    {/* Header */}
    <div className="text-center">
      <h2 className="text-3xl font-extrabold text-teal-700">Welcome to GoStaff</h2>
      <p className="text-sm text-gray-500 mt-1">Please log in to continue</p>
    </div>

    {/* Login Form */}
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="your@email.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* Options */}
      <div className="flex items-center justify-between text-sm">
        <label className="inline-flex items-center">
          <input type="checkbox" className="form-checkbox text-teal-600" />
          <span className="ml-2 text-gray-700">Remember me</span>
        </label>
        <a href="#" className="text-teal-600 hover:underline">Forgot password?</a>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-md transition duration-200 shadow"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</div>

  )
}

export default Login