import Employee from '../models/Employee.js'
import Department from '../models/Department.js'
import Leave from '../models/Leave.js'

const getAdminSummary = async (req, res) => {
    try{
        const totalEmployees = await Employee.countDocuments();

        const totalDepartments = await Department.countDocuments();

        const totalSalaries = await Employee.aggregate([
            {$group : {_id: null, total: {$sum : "$salary"}}}
        ]);

        const employeesAppliedLeave = await Leave.distinct('employeeId')

        const leaveStatus = await Leave.aggregate([
            {$group: {
                _id: "$status",
                count: {$sum: 1}
            }}
        ]);

        const leaveSummary = {
            appliedFor: employeesAppliedLeave.length,
            approved: leaveStatus.find((item) => item._id == "Approved")?.count || 0,
            pending: leaveStatus.find((item) => item._id == "Pending")?.count || 0,
            rejected: leaveStatus.find((item) => item._id == "Rejected")?.count || 0,

        }

        return res.status(200).json({
            success: true,
            totalEmployees,
            totalDepartments,
            totalSalary: totalSalaries[0]?.total || 0,
            leaveSummary
        })
    } catch(error){
        return res.status(500).json({success: false, error: "dashboard server error"})
    }
}

export {getAdminSummary}