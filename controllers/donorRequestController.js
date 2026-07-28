import DonorRequest from "../models/donorRequestModel.js";
import Users from "../models/userModel.js";

// CREATE — send a blood request to another donor
export const createDonorRequestController = async (req, res) => {
  try {
    const { bloodGroup, quantity, targetDonor, message } = req.body;

    // You should not be able to send request to yourself at all
    if (targetDonor === req.user.userId) {
      return res.status(403).send({ success: false, message: "You cannot send a request to yourself" });
    }

    // Verify target donor exists and is actually a donor
    const target = await Users.findById(targetDonor);
    if (!target || target.role !== "donor") {
      return res.status(404).send({ success: false, message: "Donor not found" });
    }

    if (target.bloodGroup !== bloodGroup) {
     return res.status(400).send({ success: false, message: `This donor can only donate ${target.bloodGroup}` });
    }

    const request = new DonorRequest({
      bloodGroup,
      quantity,
      message,
      requestedBy: req.user.userId,
      targetDonor: target._id,
    });

    await request.save();

    return res.status(201).send({
      success: true,
      message: "Request sent successfully",
      request,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ success: false, message: "An error occurred" });
  }
};

// GET SENT — requests I sent to other donors
export const getSentDonorRequestsController = async (req, res) => {
  try {
    const requests = await DonorRequest.find({ requestedBy: req.user.userId })
      .populate("targetDonor", "name email phone bloodGroup")
      .sort({ createdAt: -1 });

    return res.status(200).send({ success: true, requests });
  } catch (e) {
    console.log(e)
    return res.status(500).send({ success: false, message: "An error occurred" });
  }
};

// GET RECEIVED — requests other donors sent to me
export const getReceivedDonorRequestsController = async (req, res) => {
  try {
    const requests = await DonorRequest.find({ targetDonor: req.user.userId })
      .populate("requestedBy", "name email phone bloodGroup")
      .sort({ createdAt: -1 });

    return res.status(200).send({ success: true, requests });
  } catch (e) {
    return res.status(500).send({ success: false, message: "An error occurred" });
  }
};

// RESPOND — accept or reject a request sent to me my wish
export const respondDonorRequestController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, responseMessage} = req.body;

    const request = await DonorRequest.findById(id);
    if (!request) {
      return res.status(404).send({ success: false, message: "Request not found" });
    }

    // Only the target donor can respond
    if (request.targetDonor.toString() !== req.user.userId) {
      return res.status(403).send({ success: false, message: "You are not authorised to respond to this request hence forbidden" });
    }

    // Should only be able to respond to pending requests
    if (request.status !== "pending") {
      return res.status(400).send({ success: false, message: "This request has already been responded to" });
    }

    request.status = status;
    await request.save();

    return res.status(200).send({
      success: true,
      message: `Request ${status}`,
      request,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ success: false, message: "An error occurred" });
  }
};

// GET ALL DONORS — browse donors for sending requests (filterable by blood group)
export const getAllDonorsController = async (req, res) => {
  try {
    const { bloodGroup } = req.query;

    const filter = { role: "donor", _id: { $ne: req.user.userId } }; // exclude self
    if (bloodGroup) filter.bloodGroup = bloodGroup;

    const donors = await Users.find(filter)
      .select("name email bloodGroup phone address")
      .sort({ createdAt: -1 });

    return res.status(200).send({ success: true, donors });
  } catch (e) {
    return res.status(500).send({ success: false, message: "An error occurred" });
  }
};
