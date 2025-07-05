import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiEdit2 } from 'react-icons/fi';


const ViewEmployee = () => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const {id} = useParams();
    const [employee, setEmployee] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
    const fetchEmployee = async () => {
      try{
        const response = await axios.get(`${baseURL}/api/employee/${id}`, {
          headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
          }
        });
        console.log(response.data);
        if(response.data.success){
          setEmployee(response.data.employee);
        }
      } catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
    }
    };
    fetchEmployee();
  }, []);

  return (
    <>
        {employee ? (
            <div className="relative max-w-md mx-auto mt-10 bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
                <button
    className="absolute top-4 right-4 p-2 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition"
    title="Edit Employee"
  >
    <FiEdit2 className="w-5 h-5" />
  </button>

    <div className="flex flex-col items-center p-6">
    <img
      src={`${baseURL}/uploads/${employee.userId.profileImage}`}
      alt="Profile"
      className="w-32 h-32 object-cover rounded-full border-4 border-indigo-500 shadow-sm"
    />
    <h2 className="text-xl font-semibold mt-4 text-gray-800">
      {employee.userId.name}
    </h2>
    <p className="text-sm text-gray-500">Employee ID: {employee.employeeId}</p>
  </div>
  <div className="px-6 py-4 bg-gray-50 border-t">
    <ul className="space-y-2 text-gray-700 text-sm">
      <li className="flex justify-between">
        <span className="font-medium">Date of Birth:</span>
        <span>{new Date(employee.dob).toDateString()}</span>
      </li>
      <li className="flex justify-between">
        <span className="font-medium">Gender:</span>
        <span>{employee.gender}</span>
      </li>
      <li className="flex justify-between">
        <span className="font-medium">Department:</span>
        <span>{employee.department.dep_name}</span>
      </li>
      <li className="flex justify-between">
        <span className="font-medium">Marital Status:</span>
        <span>{employee.maritalStatus}</span>
      </li>
    </ul>
  </div>
</div>

        ) : <div>Loading ...</div>}
    </>
    
  )
}

export default ViewEmployee