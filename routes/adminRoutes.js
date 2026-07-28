import express from "express";
import {getAllDonorsController, getAllHospitalsController, getAllOrganisationsController,  deleteUserController, getAdminStatsController, getAdminInventoryController, getAdminOrgBreakdownController } from "../controllers/adminController.js";
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

// GET /api/v1/admin/inventory — all inventory across all orgs
adminRoute.get("/inventory", adminMiddleware, getAdminInventoryController);

// GET /api/v1/admin/org-breakdown — blood group wise stock per organisation
adminRoute.get("/org-breakdown", adminMiddleware, getAdminOrgBreakdownController);



export default adminRoute;