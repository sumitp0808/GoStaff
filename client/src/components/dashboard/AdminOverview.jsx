import React, { useEffect, useState } from 'react'
import OverviewCard from './OverviewCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa'
import axios from 'axios';

const AdminOverview = () => {

  const [summary, setSummary] = useState({
  totalEmployees: 0,
  totalDepartments: 0,
  totalSalary: 0,
  leaveSummary: {
    appliedFor: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  }
});

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await axios.get('https://go-staff.vercel.app/api/dashboard',{
          headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
          }
        })
        setSummary(response.data);
        console.log(response.data);
      }catch(error){
        if(error.response){
          alert(error.response.data.error)
        }
        console.log(error.message)
      }
    }
  fetchData();
  }, []);

  return (
    <div className="p-6">
      <h3 className='text-2xl font-bold'>Dashboard Overview</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <OverviewCard
          thumbnail={<FaUsers />}
          text="Employees"
          number={summary.totalEmployees}
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
        />
        <OverviewCard
          thumbnail={<FaBuilding />}
          text="Departments"
          number={summary.totalDepartments}
          iconColor="text-indigo-500"
          iconBg="bg-indigo-100"
        />
        <OverviewCard
          thumbnail={<FaMoneyBillWave />}
          text="Monthly Salary"
          number={`$${summary.totalSalary}`}
          iconColor="text-green-600"
          iconBg="bg-green-100"
        />
      </div>

      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <OverviewCard
            thumbnail={<FaFileAlt />}
            text="Leave Requests"
            number={summary.leaveSummary.appliedFor}
            iconColor="text-orange-500"
            iconBg="bg-orange-100"
          />
          <OverviewCard
            thumbnail={<FaCheckCircle />}
            text="Leave Approved"
            number={summary.leaveSummary.approved}
            iconColor="text-green-500"
            iconBg="bg-green-100"
          />
          <OverviewCard
            thumbnail={<FaHourglassHalf />}
            text="Leave Pending"
            number={summary.leaveSummary.pending}
            iconColor="text-yellow-500"
            iconBg="bg-yellow-100"
          />
          <OverviewCard
            thumbnail={<FaTimesCircle />}
            text="Leave Rejected"
            number={summary.leaveSummary.rejected}
            iconColor="text-red-500"
            iconBg="bg-red-100"
          />
        </div>
      </div>
    </div>
  )
}

export default AdminOverview