import mongoose from "mongoose"
import Inventory from "../models/inventoryModel.js"

const requestSchema = new mongoose.Schema({
    bloodGroup : {
        type : String,
        enum :  ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        required : [true,'Blood Groups are requirted']
    },
    quantity : {
        type : Number,
        required : [true,"Quantity is required"],
        min : [1,'minimum 1ml blood is required']
    },
    requestType : {
        type : String,
         enum: ["donor", "hospital", "donor-need"], // who is requesting
        required : [true,'request type is required']
    },
    requestedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required : true
    },
    organisation : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required : true
    },
    status : {
        type : String,
        enum : ["pending","approved", "rejected"],
        default : "pending"
    },
    message : {
        type : String,
        default : ""
    },
}
,{timestamps : true}

)

const Request = mongoose.model("Request",requestSchema);
export default Request;