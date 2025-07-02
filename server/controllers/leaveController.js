import Leave from '../models/Leave.js'
import Employee from '../models/Employee.js'

const addLeave = async (req, res) => {
    try{
        const {userId, leaveType, startDate, endDate, reason} = req.body;
        
        const employee = await Employee.findOne({userId})
        const newLeave = new Leave({
            employeeId:employee._id, leaveType, startDate, endDate, reason,
        });
        await newLeave.save();
        return res.status(200).json({success: true})
    }catch(error){
        return res.status(500).json({success: false, error: "add leave server error"})
    }
};

const getLeaves = async (req, res) => {
    try{
        const {id} = req.params; //emp or user id
        let leaves = await Leave.find({employeeId: id}).populate({
            path: 'employeeId',
            select: 'employeeId'
        });
        if(!leaves || leaves.length < 1){
            //may be user id
            const employee = await Employee.findOne({userId: id})
            leaves = await Leave.find({employeeId: employee._id})
        }
        return res.status(200).json({success: true, leaves})
    }catch(error){
        return res.status(500).json({success: false, error: "get leaves server error"})
    }
}

const getAllEmpLeaves = async (req, res) => {
    try{
        const leaves = await Leave.find().populate({
            path: 'employeeId',
            select: 'employeeId'
        });
        return res.status(200).json({success: true, leaves})       
    }catch(error){
        return res.status(500).json({success: false, error: "get all emp leaves server error"})
    }
}

const getLeaveDetails = async (req, res) => {
    try{
        const {id} = req.params;
        const leave = await Leave.findById({_id: id}).populate({
            path: 'employeeId',
            populate : [
                {
                    path: 'department',
                    select: 'dep_name'
                },
                {
                    path: 'userId',
                    select: 'name profileImage'
                }
            ]
        });
        return res.status(200).json({success: true, leave})
    } catch(error){
        return res.status(500).json({success: false, error: "get leavedetails server error"})      
    }
}

const updateLeave = async (req, res) => {
    try{
        const {id} = req.params;
        const leave = await Leave.findByIdAndUpdate({_id: id}, {status: req.body.status})
        if(!leave){
        return res.status(404).json({success: false, error: "leave not found"})      
        }
        return res.status(200).json({success: true})       
    }catch(error){
        return res.status(500).json({success: false, error: "update leave server error"})      
    }
}

export {addLeave, getLeaves, getAllEmpLeaves, getLeaveDetails, updateLeave}