import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { columns, LeaveButtons } from '../../utils/LeaveHelper';
import { useParams } from 'react-router-dom';

const EmpLeaveAction = () => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const {id} = useParams(); //emp id
    const [leaves, setLeaves] = useState([]);

    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/leave/${id}`, {
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
                        employeeId: l.employeeId.employeeId,
                        leaveType: l.leaveType,
                        from: new Date(l.startDate).toLocaleDateString(),
                        to: new Date(l.endDate).toLocaleDateString(),
                        appliedAt: new Date(l.appliedAt).toLocaleDateString(),
                        status: (<span className={`px-2 py-1 rounded-full text-xs font-medium ${l.status === 'Approved' ? 'bg-green-100 text-green-700' :l.status === 'Rejected' ? 'bg-red-100 text-red-700' :'bg-yellow-100 text-yellow-700'}`}>
                                    {l.status}
                                </span>),
                        actions: (<LeaveButtons Id={l._id} />)
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

    return (
        <div className="mt-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Leaves</h3>
            </div>
            <div className="mt-6">
                <DataTable
                    columns={columns}
                    data={leaves}
                    pagination
                />
            </div>
        </div>
    )
}

export default EmpLeaveAction