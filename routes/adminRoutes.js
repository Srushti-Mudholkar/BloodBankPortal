import express from "express";
import {getAllDonorsController, getAllHospitalsController, getAllOrganisationsController,  deleteUserController, getAdminStatsController} from "../controllers/adminController.js";
import {adminMiddleware} from "../middlewares/authMiddleware.js";

const adminRoute = express.Router();

// GET /api/v1/admin/donors
adminRoute.get("/donors", adminMiddleware, getAllDonorsController);

// GET /api/v1/admin/hospitals
adminRoute.get("/hospitals", adminMiddleware, getAllHospitalsController);

// GET /api/v1/admin/organisations
adminRoute.get("/organisations",adminMiddleware, getAllOrganisationsController);

// DELETE /api/v1/admin/delete-user/:id
adminRoute.delete("/delete-user/:id", adminMiddleware, deleteUserController);

// GET /api/v1/admin/stats
adminRoute.get("/stats",adminMiddleware, getAdminStatsController);

export default adminRoute;