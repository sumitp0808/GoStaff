import React from 'react'
import OverviewCard from './OverviewCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa'

const AdminOverview = () => {
  return (
    <div className="p-6">
        <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <OverviewCard thumbnail = {<FaUsers />} text={"total employees"} number = {23} bgcolor = "bg-blue-500"/>
            <OverviewCard thumbnail = {<FaBuilding />} text={"total departments"} number = {23} bgcolor = "bg-yellow-500"/>
            <OverviewCard thumbnail = {<FaMoneyBillWave />} text={"monthly salary"} number = "$23" bgcolor = "bg-green-500"/>
        </div>
        <div className="mt-12">
            <h4 className="text-center text-2xl font-bold">Leave Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <OverviewCard thumbnail = {<FaFileAlt />} text={"Leave applied"} number = {23} bgcolor = "bg-blue-500"/>
            <OverviewCard thumbnail = {<FaCheckCircle />} text={"Leave approved"} number = {23} bgcolor = "bg-green-500"/>
            <OverviewCard thumbnail = {<FaHourglassHalf />} text={"leave pending"} number = {23} bgcolor = "bg-yellow-500"/>
            <OverviewCard thumbnail = {<FaTimesCircle />} text={"leave rejected"} number = {23} bgcolor = "bg-red-500"/>
        </div>
        </div>
    </div>
  )
}

export default AdminOverview