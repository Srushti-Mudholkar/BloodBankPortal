import mongoose from "mongoose";


const requestSchema = new mongoose.Schema({
    bloodGroup : {
        type : String,
        enum : ["A+","A-","AB+","AB-","O+","O-","B+","B-"],
        required : [true,"bloodGroup is required"]
    },
    quantity : {
        type : Number,
        required : [true,"quantity is required"],
        min : [1,"qunatity is required"]
    },
    requestType : {
        type : String,
        enum : ['donor','hospital'],
        required : [true,"requestType is requited"]
    },
    requestBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users",
        required : true
    },
    organisation : {
       type : mongoose.Schema.Types.ObjectId,
       ref : "Users",
       required : true
    },
    status : {
        type : String,
        enum : ["pending","approved","rejeted"],
        default : "pending"
    },
    message : {
        type : String,
        default : ""
    }
},
{timestamps : true}
)

const requestModel = new mongoose.model(Request,"requestSchema");
export default requestModel;