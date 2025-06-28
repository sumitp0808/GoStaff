import React from 'react'
import { Link } from 'react-router-dom'

const Employees = () => {
  return (
    <div className="p-6">
        <div className="text-center">
        <h3 className="text-2xl font-bold">Employees</h3>
      </div>
      <div className="flex justify-between items-center" >
        <input type="text" placeholder="Search By Department Name" className="px-4 py-0.5"
          
        />
        <Link to="/admin-dashboard/add-employee" className="text-white px-4 py-1 rounded bg-teal-600">Add New</Link>
      </div>
    </div>
  )
}

export default Employees