import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["admin", "organisation", "donor", "hospital"],
      required: [true, "Role is required"],
    },
    name: {
      type: String,
      required: function () {
        return this.role === "donor" || this.role === "admin";
      },
    },
    organisationName: {
      type: String,
      required: function () {
        return this.role === "organisation";
      },
    },
    hospitalName: {
      type: String,
      required: function () {
        return this.role === "hospital";
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    website: {
      type: String,
      default: "",
    },
    address : {
      type: String,
      required: [true, "Address is required"],
    },
    phone: {
      type: String,
      unique: true,
      required: [true, "Phone number is required"],
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: function () {
        return this.role === "donor";
      },
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    isVerified: {
     type: Boolean,
      default: false,
    },
     verificationToken: {
       type: String,
     },
  },
  
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);
export default Users;
