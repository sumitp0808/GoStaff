import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const LeaveDetails = () => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const {id} = useParams();
    const [leave, setLeave] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
    const fetchLeave = async () => {
      try{
        const response = await axios.get(`${baseURL}/api/leave/details/${id}`, {
          headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
          }
        });
        if(response.data.success){
          setLeave(response.data.leave);
          console.log(leave)
        }
      } catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
    }
    };
    fetchLeave();
  }, []);

  const changeStatus = async (id,status) => {
    try{
        const response = await axios.put(`${baseURL}/api/leave/${id}`, {status},{
          headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`,
          }, 
        });
        if(response.data.success){
          navigate('/admin-dashboard/leaves')
        }
      } catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      }
  }

  return (
    <>
        {leave ? (
 <div className="max-w-6xl mx-10 mt-10 bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-200">
  <div className="flex flex-col md:flex-row">
    
    {/* Left Side – Profile */}
    <div className="md:w-1/3 bg-gradient-to-b from-indigo-600 to-purple-600 text-white flex flex-col items-center justify-center p-8">
      <img
        src={`${baseURL}/uploads/${leave.employeeId.userId.profileImage}`}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
      />
      <h2 className="mt-4 text-2xl font-bold text-center">{leave.employeeId.userId.name}</h2>
      <p className="text-sm opacity-90">Employee ID: {leave.employeeId.employeeId}</p>
    </div>

    {/* Right Side – Details */}
    <div className="md:w-2/3 bg-gray-50 p-8 space-y-6">
      
      {/* Employee Info */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Employee Information</h3>
        <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
          <div className="font-medium">Name:</div>
          <div>{leave.employeeId.userId.name}</div>
          <div className="font-medium">Date of Birth:</div>
          <div>{new Date(leave.employeeId.dob).toDateString()}</div>

          <div className="font-medium">Gender:</div>
          <div>{leave.employeeId.gender}</div>

          <div className="font-medium">Department:</div>
          <div>{leave.employeeId.department.dep_name}</div>

          <div className="font-medium">Marital Status:</div>
          <div>{leave.employeeId.maritalStatus}</div>
        </div>
      </div>

      {/* Leave Info */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Leave Information</h3>
        <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-700">
          <div className="font-medium">Leave Type:</div>
          <div>{leave.leaveType}</div>

          <div className="font-medium">Start Date:</div>
          <div>{new Date(leave.startDate).toDateString()}</div>

          <div className="font-medium">End Date:</div>
          <div>{new Date(leave.endDate).toDateString()}</div>

          <div className="font-medium">Status:</div>
          <div>
            <span className={`
              px-2 py-1 rounded-full text-xs font-medium 
              ${leave.status === 'Approved' ? 'bg-green-100 text-green-700' :
                leave.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'}
            `}>
              {leave.status}
            </span>
          </div>

          <div className="font-medium col-span-2">Reason:</div>
          <div className="col-span-2 text-gray-600">{leave.reason}</div>
        </div>
      </div>
    </div>
  </div>
  {/*Action Buttons */}
  {leave.status === 'Pending' && (
    <div className="absolute bottom-4 right-6 flex gap-4">
      <button
        onClick={() => changeStatus(leave._id,"Approved")}
        className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition"
      >
        Approve
      </button>
      <button
        onClick={() => changeStatus(leave._id,"Rejected")}
        className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
      >
        Reject
      </button>
    </div>
  )}
</div>
) : <div>Loading ...</div>}
    </>
    
  )
}

export default LeaveDetails