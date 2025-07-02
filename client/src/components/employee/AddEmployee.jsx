import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {

  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments)
    };
    getDepartments();
    
  },[]);
  
  const handleChange = (e) => {
    const {name, value, files} = e.target;
    if(name === "image"){
      setFormData((prevData) => ({...prevData, [name] : files[0]}))
    }else{
      setFormData((prevData) => ({...prevData, [name] : value}))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData()
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key])
    })

    try {
        const response = await axios.post('http://localhost:8080/api/employee/add', formDataObj, {
          headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          navigate("/admin-dashboard/employees")
        }
    } catch(error) {
      if(error.response && !error.response.data.success){
        alert(error.response.data.error)
      }
    }
  }
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6" >Fill Employee Details</h2>
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input 
                 type="text"
                 name="name"
                 placeholder="Name" 
                 className="mt-1 p-2 block w-full border border-gray-300 rounded"
                 required
                 onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input 
                 type="email"
                 name="email"
                 placeholder="Email"
                 className="mt-1 p-2 block w-full border border-gray-300 rounded"
                 required
                 onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                <input 
                 type="text"
                 name="employeeId"
                 placeholder="Employee ID"
                 className="mt-1 p-2 block w-full border border-gray-300 rounded"
                 required
                 onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input 
                 type="date"
                 name="dob"
                 placeholder="DD-MM-YYYY"
                 className="mt-1 p-2 block w-full border border-gray-300 rounded"
                 required
                 onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select name="gender"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded"
                  required
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Marital Status</label>
                <select name="maritalStatus"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded"
                  required
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Designation</label>
                <input 
                 type="text"
                 name="designation"
                 placeholder="Designation"
                 className="mt-1 p-2 block w-full border border-gray-300 rounded"
                 required
                 onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select name="department"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded"
                  required
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Salary</label>
                <input 
                 type="number"
                 name="salary"
                 placeholder="$"
                 className="mt-1 p-2 block w-full border border-gray-300 rounded"
                 required
                 onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input 
                 type="password"
                 name="password"
                 placeholder=""
                 className="mt-1 p-2 block w-full border border-gray-300 rounded"
                 required
                 onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select name="role"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded"
                  required
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Upload profile Img</label>
                <input 
                 type="file"
                 name="image"
                 placeholder="Upload"
                 accept="image/*"
                 className="mt-1 p-2 block w-full border border-gray-300 rounded"
                 onChange={handleChange}
                />
              </div>
            </div>
            <button type="submit" className="w-full mt-6 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md">
              Add Employee
            </button>
        </form>
    </div>
  )
}

export default AddEmployee