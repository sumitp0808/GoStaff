import React from 'react'
import OverviewCard from '../dashboard/OverviewCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa'

const Overview = () => {
  return (
    <div className="p-6">
        <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <OverviewCard thumbnail = {<FaUsers />} text={"total employees"} number = {23} gradient="bg-gradient-to-r from-blue-500 to-indigo-500"/>
            <OverviewCard thumbnail = {<FaBuilding />} text={"total departments"} number = {23} gradient="bg-gradient-to-r from-green-500 to-teal-400" />
            <OverviewCard thumbnail = {<FaMoneyBillWave />} text={"monthly salary"} number = "$23" gradient="bg-gradient-to-r from-yellow-400 to-orange-400"/>
        </div>
        <div className="mt-12">
            <h4 className="text-center text-2xl font-bold">Leave Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <OverviewCard thumbnail = {<FaFileAlt />} text={"Leave requests"} number = {23} gradient = "bg-gradient-to-r from-blue-500 to-blue-700"/>
            <OverviewCard thumbnail = {<FaCheckCircle />} text={"Leave approved"} number = {23} gradient = "bg-gradient-to-r from-green-500 to-green-700"/>
            <OverviewCard thumbnail = {<FaHourglassHalf />} text={"Leave pending"} number = {23} gradient = "bg-gradient-to-r from-yellow-500 to-yellow-700"/>
            <OverviewCard thumbnail = {<FaTimesCircle />} text={"Leave rejected"} number = {23} gradient = "bg-gradient-to-r from-red-500 to-red-700"/>
        </div>
        </div>
    </div>
  )
}

export default Overview