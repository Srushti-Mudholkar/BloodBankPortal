import mongoose from "mongoose";

const donorRequestSchema = new mongoose.Schema(
  {
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: [true, "Blood group is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Minimum 1 unit"],
    },
    message: {
      type: String,
      default: "",
    },
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    targetDonor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
     responseMessage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const DonorRequest = mongoose.model("DonorRequest", donorRequestSchema);
export default DonorRequest;
