import Salary from '../models/Salary.js'


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
        return res.status(200).json({success: true, message:`salary added to ${employeeId}`})
    }catch(error){
        return res.status(500).json({success: true, error:"salary add server error"})
    }
}

export {addSalary}