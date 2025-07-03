import React, { useState } from 'react'
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddLeave = () => {
    const navigate = useNavigate();
    const {user} = useAuth();
    const [leave, setLeave] = useState({
        userId: user._id,
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setLeave((prev) => ({...prev, [name] : value}))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const response = await axios.post(`https://go-staff.vercel.app/api/leave/add`,leave,{
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if(response.data.success) {
            navigate('/employee-dashboard/leaves');
        }
    } catch(error){
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error);
        }
    }
    }

  return (
<div className="max-w-2xl mx-auto mt-6 p-6 bg-white shadow-lg rounded-xl">
  <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Apply for Leave</h2>
  <form onSubmit={handleSubmit} className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Leave Type</label>
      <select
        name="leaveType"
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">Select</option>
        <option value="Sick Leave">Sick Leave</option>
        <option value="Casual Leave">Casual Leave</option>
        <option value="Maternity Leave">Maternity Leave</option>
        <option value="Paternity Leave">Paternity Leave</option>
        <option value="Marriage Leave">Marriage Leave</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
        <input
          type="date"
          name="startDate"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
        <input
          type="date"
          name="endDate"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
      <textarea
        name="reason"
        placeholder="Describe your reason for leave"
        onChange={handleChange}
        rows={4}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      ></textarea>
    </div>

    <div className="text-right">
      <button
        type="submit"
        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all"
      >
        Apply
      </button>
    </div>
  </form>
</div>

  )
}

export default AddLeave