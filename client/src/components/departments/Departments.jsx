import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper'
import axios from 'axios'

const Departments = () => {
  
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDept, setFilteredDept] = useState([]);

  const onDepartmentDelete = async (id) => {
    const data = departments.filter(dep => dep._id !== id)
    setDepartments(data);
  }

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try{
        const response = await axios.get('http://localhost:8080/api/department', {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          let sno = 1;
          const data = await response.data.departments.map((dep) => (
            {
              _id: dep._id,
              sno: sno++,
              dep_name: dep.dep_name,
              action: <DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete} />,
            }
          ))
          setDepartments(data);
          setFilteredDept(data);
        }
      } catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      } finally {
        setDepLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  const filterDept = (e) => {
    const records = departments.filter((dep) => 
    dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredDept(records);
  }

  return (
    <>{depLoading ? <div>Loading ...</div> : 
      <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Departments</h3>
      </div>
      <div className="flex justify-between items-center" >
        <input type="text" placeholder="Search By Department Name" className="px-4 py-0.5"
          onChange={filterDept}
        />
        <Link to="/admin-dashboard/add-department" className="text-white px-4 py-1 rounded bg-teal-600">Add New</Link>
      </div>
      <div className="mt-5">
        <DataTable 
          columns={columns}
          data={filteredDept}
          pagination
        />
      </div>
    </div>
    }</>
  )
}

export default Departments