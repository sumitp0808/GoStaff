import { useState } from 'react'
import axios from 'axios';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();
    const {user} = useAuth();
    const [error, setError] = useState(null);
    const [settings, setSettings] = useState({
        userId: user._id,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setSettings({...settings,[name]: value});
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(settings.newPassword != settings.confirmPassword){
            setError("confirm password not matching");
        }else{
            try {
            const response = await axios.put("http://localhost:8080/api/settings/change-password", settings,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if(response.data.success){
                navigate('/employee-dashboard');
            }
        } catch(error){
            if(error.response && !error.response.data.success){
                setError(error.response.data.error)
            } else {
                setError("Server error");
            }
        }
        }
    }
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
  <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Change Password</h2>

  {error && (
    <p className="mb-4 text-sm text-red-600 bg-red-100 px-4 py-2 rounded-md">
      {error}
    </p>
  )}

  <form onSubmit={handleSubmit} className="space-y-5">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
      <input
        type="password"
        name="currentPassword"
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
      <input
        type="password"
        name="newPassword"
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
      <input
        type="password"
        name="confirmPassword"
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <button
      type="submit"
      className="w-full py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all"
    >
      Submit
    </button>
  </form>
</div>

  )
}

export default Settings