import User from '../models/User.js';
import Employee from '../models/Employee.js'
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';

//unique file naming using date(millis)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage: storage});

const addEmployee = async (req, res) => {
    try{
    const {
        name, 
        email,
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary,
        password,
        role
    } = req.body;
    console.log(req.body);
    console.log(req.file);
    const user = await User.findOne({email})
    if(user){
        return res.status(400).json({success: false, error: "user already exists"})
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        name,
        email,
        password: hashPassword,
        role,
        profileImage: req.file ? req.file.filename : ""
    })
    const savedUser = await newUser.save()

    const newEmployee = new Employee({
        userId: savedUser._id,
        employeeId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary
    })
    await newEmployee.save();
    return res.status(200).json({success: true, message: "employee created"})
    } catch(error){
        console.log(error.message);
        return res.status(500).json({success: false, error: "employee server error"})
    }

}

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('userId', {password: 0}).populate("department")
        return res.status(200).json({success: true, employees})
    }catch(error){
        return res.status(500).json({success: false, error: "server error in get employees"})
    }
}

const getEmployee = async (req, res) => {
    try {
        const {id} = req.params;
        let employee = await Employee.findById({_id: id}).populate('userId', {password: 0}).populate("department")
        if(!employee){
            employee = await Employee.findOne({userId: id}).populate('userId', {password: 0}).populate("department")
        }
        return res.status(200).json({success: true, employee})
    }catch(error){
        return res.status(500).json({success: false, error: "server error in get employee"})
    }
}

const getEmployeesByDep = async (req, res) => {
    try {
        const {id} = req.params;
        const employees = await Employee.find({department: id});
        return res.status(200).json({success: true, employees})
    }catch(error){
        return res.status(500).json({success: false, error: "server error in get employees by department"})
    }
}

export {addEmployee, upload, getEmployees, getEmployee,  getEmployeesByDep}