import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "100px"
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "180px"
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
        width: "180px"
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
        width: "200px"
    },
    {
        name: "Actions",
        selector: (row) => row.action
    },
]

export const fetchDepartments = async () => {
    let departments;
      try{
        const response = await axios.get('http://localhost:8080/api/department', {
          headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          departments = response.data.departments;
        }
      } catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      }
      return departments;
};

//employees from a department(id)
export const getEmployeesByDep = async (id) => {
    let employees;
      try{
        const response = await axios.get(`http://localhost:8080/api/employee/department/${id}`, {
          headers: {
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          employees = response.data.employees;
        }
      } catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }
      }
      return employees;
};

export const EmployeeButtons = ({Id}) => {
    const navigate = useNavigate();
    return (
    <div className="flex space-x-3">
      <button className="px-3 py-1 bg-blue-600 text-white rounded-sm"
        onClick={() => navigate(`/admin-dashboard/employees/${Id}`) }
      >Details</button>
      <button className="px-3 py-1 bg-green-600 text-white rounded-sm" 
        onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
      >Salary</button>
      <button className="px-3 py-1 bg-yellow-600 text-white rounded-sm" 
        onClick={() => navigate(`/admin-dashboard/employee/leaves/${Id}`)}
      >Leaves</button>
    </div>
    )
}

