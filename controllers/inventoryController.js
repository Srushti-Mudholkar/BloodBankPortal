import Inventory from "../models/inventoryModel.js";
import Users from "../models/userModel.js";
import mongoose from "mongoose";
import { sendDonationConfirmationEmail, sendBloodIssuedEmail } from "../utils/emailService.js";

export const createInventoryController = async (req, res) => {
  try {
    const { inventoryType, bloodGroup, quantity, email } = req.body;
    const orgId = req.user.userId;
    const orgObjectId = new mongoose.Types.ObjectId(orgId);
    
    if (inventoryType === "in") {
      const donor = await Users.findOne({ email, role: "donor" });

      if (!donor) {
        return res.status(404).send({
          success: false,
          message: "Donor not found",
        });
      }

      if (donor.bloodGroup !== bloodGroup) {
        return res.status(400).send({
          success: false,
          message: `Donor blood group is ${donor.bloodGroup}, not ${bloodGroup}`,
        });
      }

      const inventory = await Inventory.create({
        inventoryType,
        bloodGroup,
        quantity,
        email,
        donor: donor._id,
        organisation: orgId,
      });

      const org = await Users.findById(orgId);

      await sendDonationConfirmationEmail({
        donorEmail: donor.email,
        donorName: donor.name,
        bloodGroup,
        quantity,
        orgName: org?.organisationName || "BloodCare",
      });

      return res.status(201).send({
        success: true,
        message: "Blood donated successfully",
        inventory,
      });
    }

   if (inventoryType === "out") {
      console.log("===== OUT BLOCK EXECUTED =====");
      const hospital = await Users.findOne({ email, role: "hospital" });

      if (!hospital) {
        return res.status(404).send({
          success: false,
          message: "Hospital not found",
        });
      }

      // Calculate available blood

     /* const totalIn = await Inventory.aggregate([
        {
          $match: {
            organisation: orgId,
            bloodGroup,
            inventoryType: "in",
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$quantity" },
          },
        },
      ]);

      const totalOut = await Inventory.aggregate([
        {
          $match: {
            organisation: orgId,
            bloodGroup,
            inventoryType: "out",
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$quantity" },
          },
        },
      ]);

      

      console.log("Logged in org:", orgId);
      console.log("Requested blood group:", bloodGroup);
      console.log("Requested quantity:", quantity);

      console.log("Total In:", totalIn);
      console.log("Total Out:", totalOut);

      const available = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0); */

      // ==========================================================
// TEMPORARY DEBUG CODE USING find()
// ==========================================================

const inDocs = await Inventory.find({
  organisation: orgObjectId,
  bloodGroup,
  inventoryType: "in",
});

const outDocs = await Inventory.find({
  organisation: orgObjectId,
  bloodGroup,
  inventoryType: "out",
});

const totalIn = inDocs.reduce((sum, doc) => sum + doc.quantity, 0);
const totalOut = outDocs.reduce((sum, doc) => sum + doc.quantity, 0);

const available = totalIn - totalOut;

console.log("Logged in org:", orgId);
console.log("Requested blood group:", bloodGroup);
console.log("Requested quantity:", quantity);

console.log("In Docs:", inDocs);
console.log("Out Docs:", outDocs);

console.log("Total In:", totalIn);
console.log("Total Out:", totalOut);
console.log("Available:", available);

// ==========================================================
// END DEBUG CODE
// ==

      if (available < quantity) {
        return res.status(400).send({
          success: false,
          message: `Insufficient blood. Available: ${available} units`,
        });
      }

      console.log("Available:", available);

      const inventory = await Inventory.create({
        inventoryType,
        bloodGroup,
        quantity,
        email,
        hospital: hospital._id,
        organisation: orgId,
      });

      const org = await Users.findById(orgId);

      await sendBloodIssuedEmail({
        hospitalEmail: hospital.email,
        hospitalName: hospital.hospitalName,
        bloodGroup,
        quantity,
        orgName: org?.organisationName || "BloodCare",
      });

      return res.status(201).send({
        success: true,
        message: "Blood issued successfully",
        inventory,
      });
    } 

 /*  const docs = await Inventory.find({
  organisation: orgObjectId,
  bloodGroup,
  inventoryType: "in",
});

console.log("Matching docs:", docs);

 const docs1 = await Inventory.find({
  organisation: orgObjectId,
  bloodGroup,
  inventoryType: "out",
});

console.log("Matching docs1:", docs1); */

   
      return res.status(400).send({
      success: false,
      message: "Invalid inventory type",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Inventory API",
      error: error.message,
    });
  }
};

export const getInventoryController = async (req, res) => {
  try {
     console.log("req.user:", req.user);
    console.log("userId:", req.user?.userId)
    const inventory = await Inventory.find({ organisation: req.user.userId })
    .populate("donor", "name email bloodGroup")
    .populate("hospital", "hospitalName email")
    .sort({ createdAt: -1 });
    return res.status(200).send({ success: true, message: "Inventory fetched", inventory });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error fetching inventory", error: error.message });
  }
};

export const getBloodGroupAvailabilityController = async (req, res) => {
  try {
    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const availability = [];
    const orgObjectId = new mongoose.Types.ObjectId(req.user.userId);
    for (const group of bloodGroups) {
      const totalIn = await Inventory.aggregate([
        { $match: { organisation: orgObjectId, bloodGroup: group, inventoryType: "in" } },
        { $group: { _id: null, total: { $sum: "$quantity" } } },
      ]);
      const totalOut = await Inventory.aggregate([
        { $match: { organisation: orgObjectId, bloodGroup: group, inventoryType: "out" } },
        { $group: { _id: null, total: { $sum: "$quantity" } } },
      ]);
      availability.push({ bloodGroup: group, available: (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0) });
    }
    return res.status(200).send({ success: true, message: "Blood availability fetched", availability });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error fetching availability", error: error.message });
  }
};

export const getDonorHistoryController = async (req, res) => {
  try {
    const history = await Inventory.find({ donor: req.user.userId, inventoryType: "in" })
      .populate("organisation", "organisationName email")
      .sort({ createdAt: -1 });
    return res.status(200).send({ success: true, message: "Donation history fetched", history });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error fetching history", error: error.message });
  }
};

export const getHospitalHistoryController = async (req, res) => {
  try {
    const history = await Inventory.find({ hospital: req.user.userId, inventoryType: "out" })
      .populate("organisation", "organisationName email")
      .sort({ createdAt: -1 });

    return res.status(200).send({ success: true, message: "Hospital history fetched", history });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error fetching history", error: error.message });
  }
};
