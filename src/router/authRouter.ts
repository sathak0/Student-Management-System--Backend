import { Router,Request,Response } from "express";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import { userModel } from "../model/userModel";

const SECRET_KEY="abcdefghijklmn";

const authRouter = Router();

authRouter.post('/register',async (req:Request,res:Response)=>{
    try{
    const {userName , password , email}=req.body;
    const user= await userModel.findOne(userName);
    if (!userName || !password || !email) {
        res.status(400).json({ Message: "All fields are required" });
        return;
    }
    if(user){
        res.status(400).json({Message:"Username already exists"});
        return;
    }
    const hashedPass = await bcrypt.hash(password,10);
    const newUser = new userModel({userName,password:hashedPass,email});
    const savedUser = await newUser.save();
    res.status(200).json({Messsage:"User Registered Successfully"});
    }
    catch(err){
        res.json({Message:err});
    }
});

authRouter.post('/login',async(req:Request,res:Response)=>{
    const {userName , password} =req.body;
    const loginUser = (await userModel.find()).find(u=>u.userName==userName);
    if(!loginUser){
        res.status(400).json({Message:"Invalid UserName"});
        return;
    }
    const isValid = await bcrypt.compare(password,loginUser.password);
    if(!isValid){
        res.status(400).json({Message:"Invalid Password"});
        return;
    }
    const token = jwt.sign({userName},SECRET_KEY,{expiresIn:'1h'});
    res.json({token});
});


export default authRouter;