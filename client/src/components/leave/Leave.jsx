import axios from 'axios';
import React, { useState } from 'react'
import { Link} from 'react-router-dom';
import DataTable from 'react-data-table-component'
import { useEffect } from 'react';
import { useAuth } from '../../context/authContext';


const Leave = () => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const {user} = useAuth();

    const [leaves, setLeaves] = useState([]);
      
    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/leave/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.data.success) {
                let sno = 1;
                const data = await response.data.leaves.map((l) => (
                    {
                        _id: l._id,
                        sno: sno++,
                        leaveType: l.leaveType,
                        from: new Date(l.startDate).toLocaleDateString(),
                        to: new Date(l.endDate).toLocaleDateString(),
                        appliedAt: new Date(l.appliedAt).toLocaleDateString(),
                        status: (<span className={`px-2 py-1 rounded-full text-xs font-medium ${l.status === 'Approved' ? 'bg-green-100 text-green-700' :l.status === 'Rejected' ? 'bg-red-100 text-red-700' :'bg-yellow-100 text-yellow-700'}`}>
                                    {l.status}
                                </span>)
                    }
                ));
                setLeaves(data);
            }
        } catch (error) {
            if (error.reponse && !error.response.data.success) {
                alert(error.message);
            }
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const columns = [
        {
            name: "S No",
            selector: (row) => row.sno
        },
        {
            name: "Leave Type",
            selector: (row) => row.leaveType,
        },
        {
            name: "From",
            selector: (row) => row.from,
            sortable: true

        },
        {
            name: "To",
            selector: (row) => row.to,
            sortable: true
        },
        {
            name: "Applied Date",
            selector: (row) => row.appliedAt,
            sortable: true
        },
        {
            name: "Status",
            selector: (row) => row.status,
        },
    ];

    return (
        <div className="p-6">
        <div className="text-center">
        <h3 className="text-2xl font-bold">Your Leaves</h3>
      </div>
      <div className="flex justify-between items-center" >
        <Link to="/employee-dashboard/add-leave" className="text-white px-4 py-1 rounded  bg-indigo-600">Apply Leave</Link>
      </div>
      <div className="mt-6">
        <DataTable  
          columns={columns}
          data = {leaves}
          pagination
        />
      </div>
    </div>
    )
}

export default Leave
