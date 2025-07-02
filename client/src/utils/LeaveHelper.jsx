import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
        {
            name: "S No",
            selector: (row) => row.sno
        },
        {
            name: "Emp ID",
            selector: (row) => row.employeeId,
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
        {
            name: "Actions",
            selector: (row) => row.actions,
        },
];

export const LeaveButtons = ({Id}) => {
    const navigate = useNavigate();

    const handleView = (id) => {
        navigate(`/admin-dashboard/leaves/${id}`);
    }

    return (
        <button
            className = "px-4 py-1 bg-indigo-500 rounded text-white hover:bg-indigo-600"
            onClick={() => handleView(Id)}
        >
            Details
        </button>
    )
}