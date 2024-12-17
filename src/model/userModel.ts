import { model,Schema } from "mongoose";

const userSchema = new Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})

export const userModel = model('userModel',userSchema);