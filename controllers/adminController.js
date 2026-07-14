import Users from "../models/userModel.js";
import Inventory from "../models/inventoryModel.js";

// GET ALL DONORS
export const getAllDonorsController = async (req, res) => {
  try {
    const donors = await Users.find({ role: "donor" }).select("-password");
    return res.status(200).send({ success: true, message: "Donors fetched", donors });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error fetching donors", error: error.message });
  }
};

// GET ALL HOSPITALS
export const getAllHospitalsController = async (req, res) => {
  try {
    const hospitals = await Users.find({ role: "hospital" }).select("-password");
    return res.status(200).send({ success: true, message: "Hospitals fetched", hospitals });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error fetching hospitals", error: error.message });
  }
};

// GET ALL ORGANISATIONS
export const getAllOrganisationsController = async (req, res) => {
  try {
    const organisations = await Users.find({ role: "organisation" }).select("-password");
    return res.status(200).send({ success: true, message: "Organisations fetched", organisations });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error fetching organisations", error: error.message });
  }
};

// DELETE USER
export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    await Users.findByIdAndDelete(id);
    return res.status(200).send({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error deleting user", error: error.message });
  }
};

// GET OVERALL STATS
export const getAdminStatsController = async (req, res) => {
  try {
    const totalDonors = await Users.countDocuments({ role: "donor" });
    const totalHospitals = await Users.countDocuments({ role: "hospital" });
    const totalOrganisations = await Users.countDocuments({ role: "organisation" });

    const totalBloodIn = await Inventory.aggregate([
      { $match: { inventoryType: "in" } },
      { $group: { _id: null, total: { $sum: "$quantity" } } },
    ]);
    const totalBloodOut = await Inventory.aggregate([
      { $match: { inventoryType: "out" } },
      { $group: { _id: null, total: { $sum: "$quantity" } } },
    ]);

    return res.status(200).send({
      success: true,
      message: "Admin stats fetched",
      stats: {
        totalDonors,
        totalHospitals,
        totalOrganisations,
        totalBloodIn: totalBloodIn[0]?.total || 0,
        totalBloodOut: totalBloodOut[0]?.total || 0,
      },
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: "Error fetching stats", error: error.message });
  }
};
