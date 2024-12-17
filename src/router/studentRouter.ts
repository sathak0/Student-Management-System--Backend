import { Request,Response,Router } from "express";
import { studentModel } from "../model/studentModel";

const studentRouter = Router();

studentRouter.get('/',async (req:Request,res:Response)=>{
    try{
        const userName=req.headers.username as string;
        const students = await studentModel.find({createdBy:userName})
        res.status(200).json(students);
    }
    catch(err){
        res.status(404).json({Message:err});
    }
})

studentRouter.get('/:id',async (req:Request,res:Response)=>{
    try{
        const student = await studentModel.findById(req.params.id);
        res.json(student);
    }
    catch(err){
        res.status(404).json({Message:err});
    }
})

studentRouter.post('/',async (req:Request,res:Response)=>{
    try{
        const {stdName,stdEmail,stdPhNumber,stdRegistrationNo,createdBy}=req.body || null;
        console.log(stdRegistrationNo); 
        const existingStd = await studentModel.findOne({stdRegistrationNo});
     
        if(existingStd){
            res.status(404).json({Message:"Register Number Already Exists"});
            return;
        }
        if(!stdName){
            res.status(404).json({Message:"Please Enter a Name"});
            return;
        }
        if(!stdEmail){
            res.status(404).json({Message:"Please Enter a Email"});
            return;
        }
        if(await studentModel.findOne({stdEmail})){
            res.status(404).json({Message:"Email Already Exists"});
            return;
        }
        const newStudent = new studentModel({stdName,stdEmail,stdPhNumber,stdRegistrationNo,createdBy});
        const savedStudent = await newStudent.save();
        res.json(savedStudent);
    }
    catch(err){
        res.status(404).json({Message:err});
    }
})

studentRouter.put('/',async (req:Request,res:Response)=>{
    try{
        if(req.body.stdEmail){
            const emailCheck = await studentModel.findOne({stdEmail:req.body.stdEmail});
            if((emailCheck?._id!=req.body._id) && emailCheck){
                res.status(404).json({Message:"Email Already Exists"});
                return;
            }
        }
        if(req.body.stdRegistrationNo){
            const registerNoCheck = await studentModel.findOne({stdRegistrationNo:req.body.stdRegistrationNo});
            if((registerNoCheck?._id!=req.body._id) && registerNoCheck){
                res.status(404).json({Message:"Register Number Already Exists"});
                return;
            }
        }
        const updatedStudent = await studentModel.findByIdAndUpdate(req.body._id,req.body);
        res.json(updatedStudent);
    }
    catch(err){
        res.status(404).json({Message:err});
    }
})

studentRouter.delete('/:id',async (req:Request,res:Response)=>{
    try{
        const deletedStudent = await studentModel.findByIdAndDelete(req.params.id);
        res.status(204).json({Message:"Student Deleted Successfully"});
    }
    catch(err){
        res.status(404).json({Message:err});
    }
})

export default studentRouter;
