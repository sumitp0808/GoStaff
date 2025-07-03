import React from 'react'
import {useAuth} from '../../context/authContext'

const Navbar = () => {
    const {user, logout} = useAuth();
  return (
    <div className="flex items-center justify-between h-14 px-6 bg-gray-700 text-gray-100 border-b border-gray-700 shadow-sm">
      <p className="text-sm sm:text-base font-medium">
        Welcome, <span className="text-teal-400 font-semibold">{user.name}</span>
      </p>
      <button
        onClick={logout}
        className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-4 py-1.5 rounded transition duration-200"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar