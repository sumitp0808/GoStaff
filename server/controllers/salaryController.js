import Salary from '../models/Salary.js'
import Employee from '../models/Employee.js';


const addSalary = async (req, res) => {
    try{
        const {employeeId, basicSalary, allowances, deductions, payDate} = req.body;
        const netSalary = parseInt(basicSalary)+parseInt(allowances)-parseInt(deductions);

        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary,
            payDate
        })
        await newSalary.save();
        //also update employee salary
        const updateEmployee = await Employee.findByIdAndUpdate(employeeId, {salary: basicSalary})
        return res.status(200).json({success: true, message:`salary added to ${employeeId}`})
    }catch(error){
        return res.status(500).json({success: true, error:"salary add server error"})
    }
}

const getSalary = async (req, res) => {
    try{
        const {id} = req.params;
        let salaries = await Salary.find({employeeId: id}).populate('employeeId','employeeId');
        if(!salaries || salaries.length < 1){
            // then may be it is userId from employee dashboard
            const employee = await Employee.findOne({userId: id})
            salaries = await Salary.find({employeeId: employee._id}).populate('employeeId','employeeId')
        }
        return res.status(200).json({success: true, salaries})
    }catch(error){
        return res.status(500).json({success: false, error:"get salary server error"})
    }
}

export {addSalary, getSalary}