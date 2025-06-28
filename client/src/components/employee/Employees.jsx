import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component'
import axios from 'axios';

const Employees = () => {

  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
      const fetchEmployees = async () => {
        setEmpLoading(true);
        try{
          const response = await axios.get('http://localhost:8080/api/employee', {
            headers: {
              Authorization : `Bearer ${localStorage.getItem('token')}`
            }
          })
          if(response.data.success){
            let sno = 1;
            const data = await response.data.employees.map((emp) => (
              {
                _id: emp._id,
                sno: sno++,
                dep_name: emp.department.dep_name,
                name: emp.userId.name,
                dob: new Date(emp.dob).toLocaleDateString(),
                action: (<EmployeeButtons Id={emp._id} />),
              }
            ))
            setEmployees(data);
            setFilteredEmployees(data);
          }
        } catch(error){
          if(error.response && !error.response.data.success){
            alert(error.response.data.error)
          }
        } finally {
          setEmpLoading(false);
        }
      };
      fetchEmployees();
    }, []);

    const handleFilter = (e) => {
      const records = employees.filter((emp) => (
        emp.name.toLowerCase().includes(e.target.value.toLowerCase())
      ));
      setFilteredEmployees(records);
    }
  return (
    <div className="p-6">
        <div className="text-center">
        <h3 className="text-2xl font-bold">Employees</h3>
      </div>
      <div className="flex justify-between items-center" >
        <input type="text" placeholder="Search By Department Name" className="px-4 py-0.5"
          onChange={handleFilter}
        />
        <Link to="/admin-dashboard/add-employee" className="text-white px-4 py-1 rounded bg-teal-600">Add New</Link>
      </div>
      <div className="mt-6">
        <DataTable  
          columns={columns}
          data = {filteredEmployees}
          pagination
        />
      </div>
    </div>
  )
}

export default Employees