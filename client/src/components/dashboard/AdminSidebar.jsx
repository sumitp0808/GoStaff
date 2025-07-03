import React from 'react'
import {NavLink} from 'react-router-dom'
import {FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUsers} from 'react-icons/fa'

const AdminSidebar = () => {
  return (
   <div className="bg-gray-800 text-gray-200 h-screen w-64 fixed left-0 top-0 shadow-lg flex flex-col">
      {/* Header */}
      <div className="h-14 flex items-center justify-center bg-gray-700 border-b border-gray-700 shadow-inner">
        <h1 className="text-2xl font-bold text-teal-400 tracking-wide">GoStaff</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavItem to="/admin-dashboard" icon={<FaTachometerAlt />} label="Dashboard" />
        <NavItem to="/admin-dashboard/departments" icon={<FaBuilding />} label="Departments" />
        <NavItem to="/admin-dashboard/employees" icon={<FaUsers />} label="Employees" />
        <NavItem to="/admin-dashboard/salary" icon={<FaMoneyBillWave />} label="Salary" />
        <NavItem to="/admin-dashboard/leaves" icon={<FaCalendarAlt />} label="Leaves" />
        <NavItem to="/admin-dashboard/settings" icon={<FaCogs />} label="Settings" />
      </nav>
    </div>
  )
};

const NavItem = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
          isActive
            ? "bg-teal-600 text-white shadow"
            : "hover:bg-gray-800 hover:text-white text-gray-400"
        }`
      }
      end
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
};

export default AdminSidebar