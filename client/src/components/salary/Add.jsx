import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDepartments, getEmployeesByDep } from '../../utils/EmployeeHelper';
import axios from 'axios';

const Add = () => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
        const departments = await fetchDepartments();
        setDepartments(departments);
    };
    getDepartments();
  }, []);


  const handleChange = (e) => {
    const {name, value} = e.target;
    setSalary((prev) => ({ ...prev, [name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post(`https://gostaff-backend.vercel.app/api/salary/add`,salary,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if(response.data.success) {
            navigate('/admin-dashboard/employees');
        }
    } catch(error){
        if(error.response && !error.response.data.success) {
            alert(error.response.data.error);
        }
    }
  }

  const handleDepartment = async (e) => {
    const emps = await getEmployeesByDep(e.target.value);
    setEmployees(emps);
  }

    return (
    <>{departments ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Department
                        </label>
                        <select 
                            name="department"
                            onChange={handleDepartment}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select</option>
                            {departments.map((dep) => (
                                <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Employee
                        </label>
                        <select 
                            name="employeeId"
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select</option>
                            {employees.map((emp) => (
                                <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Basic Salary
                        </label>
                        <input 
                            type="number"
                            name="basicSalary"
                            onChange={handleChange}
                            placeholder='$'
                            className="mt-1 p-2 block w-full border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Allowances
                        </label>
                        <input
                            type="number"
                            name="allowances"
                            onChange={handleChange}
                            placeholder="$"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded"
                            required
                        />
                    </div>  
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Deductions
                        </label>
                        <input
                            type="number"
                            name="deductions"
                            onChange={handleChange}
                            placeholder="$"
                            className="mt-1 p-2 block w-full border border-gray-300 rounded"
                            required
                        />
                    </div>  
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Pay Date
                        </label>
                        <input
                            type="date"
                            name="payDate"
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border border-gray-300 rounded"
                            required
                        />
                    </div>  
                    <button
                    type="submit"
                    className="w-full mt-6 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md">
                        Add Salary
                    </button>                 
                </div>
            </form>
        </div>
    ) : (<div>Loading ...</div>)}
    </>
  )
}

export default Add