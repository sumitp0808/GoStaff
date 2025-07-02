import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import AdminOverview from "./components/dashboard/AdminOverview";
import Departments from "./components/departments/Departments";
import AddDepartment from "./components/departments/AddDepartment";
import EditDepartment from "./components/departments/EditDepartment";
import Employees from "./components/employee/Employees";
import AddEmployee from "./components/employee/AddEmployee";
import ViewEmployee from "./components/employee/ViewEmployee";
import AddSalary from "./components/salary/Add";
import ViewSalary from "./components/salary/View"
import Overview from "./components/employeeDashboard/Overview";
import Leaves from "./components/leave/Leave";
import AddLeave from "./components/leave/AddLeave";
import Settings from "./components/employeeDashboard/Settings";
import AdminLeave from "./components/leave/AdminLeave";
import LeaveDetails from "./components/leave/LeaveDetails";
import EmpLeaveAction from "./components/leave/EmpLeaveAction";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Navigate to="/admin-dashboard"/>}></Route>
        <Route path = "/login" element = {<Login/>}></Route>
        <Route path = "/admin-dashboard" element = {
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin"]} >
              <AdminDashboard />
            </RoleBasedRoutes>
          </PrivateRoutes>

          }>
            <Route index element={<AdminOverview/>}></Route>
            <Route path="/admin-dashboard/departments" element={<Departments/>}></Route>
            <Route path="/admin-dashboard/add-department" element={<AddDepartment/>}></Route>
            <Route path="/admin-dashboard/department/:id" element={<EditDepartment/>}></Route>

            <Route path="/admin-dashboard/employees" element={<Employees/>}></Route>
            <Route path="/admin-dashboard/add-employee" element={<AddEmployee/>}></Route>
            <Route path="/admin-dashboard/employees/:id" element={<ViewEmployee/>}></Route>
            <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary/>}></Route>
            <Route path="/admin-dashboard/salary" element={<AddSalary/>}></Route>

            <Route path="/admin-dashboard/leaves" element={<AdminLeave/>}></Route>
            <Route path="/admin-dashboard/leaves/:id" element={<LeaveDetails/>}></Route>
            <Route path="/admin-dashboard/employee/leaves/:id" element={<EmpLeaveAction />}></Route>

            <Route path="/admin-dashboard/settings" element={<Settings/>}></Route>
           

          </Route>
        <Route path = "/employee-dashboard" 
        element = {
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["employee", "admin"]}>
              <EmployeeDashboard/>
            </RoleBasedRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<Overview/>}></Route>
          <Route path="/employee-dashboard/profile/:id" element={<ViewEmployee/>}></Route>
          <Route path="/employee-dashboard/leaves" element={<Leaves/>}></Route>
          <Route path="/employee-dashboard/add-leave" element={<AddLeave/>}></Route>
          <Route path="/employee-dashboard/salary/:id" element={<ViewSalary/>}></Route>
          <Route path="/employee-dashboard/settings" element={<Settings/>}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
