import { model,Schema } from "mongoose";


const studentSchema = new Schema({
    stdName:{type:String,required:true},
    stdEmail:{type:String,required:true},
    stdPhNumber:{type:Number},
    stdRegistrationNo:{type:Number,},
    createdBy:{type:String,required:true}
})

export const studentModel = model('studentModel',studentSchema);