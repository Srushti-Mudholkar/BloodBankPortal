import Request from "../models/requestModel.js";
import Users from "../models/userModel.js";
import Inventory from "../models/inventoryModel.js";
import { sendRequestStatusEmail } from "../utils/emailService.js";

// CREATE REQUEST
export const createRequestController = async (req, res) => {
  try {
    const { bloodGroup, quantity, organisation, message} = req.body;

    const requester = await Users.findById(req.user.userId);

    if (!requester) {
      return res.status(404).send({ success: false, message: "User not found" });
    }

     if(requester.role === "donor" && requester.bloodGroup !== bloodGroup){
       return res.status(400).send({ success: false, message: 'You can only raise a request with registered blood Group' });
    }

    const org = await Users.findById(organisation);
    if (!org || org.role !== "organisation") {
      return res.status(404).send({ success: false, message: "Organisation not found" });
    }

    const request = new Request({
      bloodGroup,
      quantity,
      message,
      requestType: requester.role,
      requestedBy: requester._id,
      organisation: org._id,
    });

    await request.save();

    return res.status(201).send({
      success: true,
      message: "Request created successfully",
      request,
    });
  } catch (e) {
    console.log(e)
    return res.status(500).send({ success: false, message: "An error occurred" });
  }
};

// GET MY REQUESTS
export const getMyRequestsController = async (req, res) => {
  try {
    const requests = await Request.find({ requestedBy: req.user.userId })
      .populate("organisation", "organisationName email")
      .sort({ createdAt: -1 });
    return res.status(200).send({ success: true, requests });
  } catch (e) {
    console.log(e)
    return res.status(500).send({ success: false, message: "An error occurred" });
  }
};

// GET ORG REQUESTS
export const getOrgRequestsController = async (req, res) => {
  try {
    const requests = await Request.find({ organisation: req.user.userId })
      .populate("requestedBy", "name hospitalName email bloodGroup phone")
      .sort({ createdAt: -1 });
    return res.status(200).send({ success: true, requests });
  } catch (e) {
    return res.status(500).send({ success: false, message: "An error occurred" });
  }
};

// UPDATE REQUEST STATUS
export const updateRequestStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const request = await Request.findById(id)
      .populate("requestedBy", "name hospitalName email bloodGroup")
      .populate("organisation", "organisationName");

    if (!request) {
      return res.status(404).send({ success: false, message: "Request not found" });
    }

    if (status === "approved") {
      // donor request = blood coming IN (donation)
      // hospital request = blood going OUT (issued to hospital)
      const inventoryType = request.requestType === "donor" ? "in" : "out";

      // Only check available stock for hospital requests (blood going out)
      if (inventoryType === "out") {
        const totalIn = await Inventory.aggregate([
          { $match: { organisation: request.organisation._id, bloodGroup: request.bloodGroup, inventoryType: "in" } },
          { $group: { _id: null, total: { $sum: "$quantity" } } },
        ]);
        const totalOut = await Inventory.aggregate([
          { $match: { organisation: request.organisation._id, bloodGroup: request.bloodGroup, inventoryType: "out" } },
          { $group: { _id: null, total: { $sum: "$quantity" } } },
        ]);
        const available = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

        if (available < request.quantity) {
          return res.status(400).send({
            success: false,
            message: `Insufficient stock. Available: ${available} units`,
          });
        }
      }

      const inventory = new Inventory({
        inventoryType,
        bloodGroup: request.bloodGroup,
        quantity: request.quantity,
        email: request.requestedBy.email,
        organisation: request.organisation._id,
        hospital: request.requestType === "hospital" ? request.requestedBy._id : null,
        donor: request.requestType === "donor" ? request.requestedBy._id : null,
      });
      await inventory.save();
    }

    request.status = status;
    await request.save();

    const name = request.requestedBy.name || request.requestedBy.hospitalName;
    await sendRequestStatusEmail({
      email: request.requestedBy.email,
      requestType: request.requestType,
      name,
      status,
      bloodGroup: request.bloodGroup,
      quantity: request.quantity,
    });

    return res.status(200).send({ success: true, message: `Request ${status}`, request });
  } catch (e) {
    console.log(e)
    return res.status(500).send({ success: false, message: "An error occurred" });
  }
};

