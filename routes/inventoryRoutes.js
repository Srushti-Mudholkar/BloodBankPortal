import express from "express";
import {
  createInventoryController,
  getInventoryController,
  getBloodGroupAvailabilityController,
  getDonorHistoryController,
  getHospitalHistoryController,
  getOrgDonorsController,getOrgHospitalsController, getOrganisationsListController
} from "../controllers/inventoryController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { createInventorySchema } from "../validators/inventoryValidator.js";

const inventoryRouter = express.Router();

// POST /api/v1/inventory/create
// authMiddleware → validate → createInventoryController
inventoryRouter.post(
  "/create",
  authMiddleware,
  validate(createInventorySchema),
  createInventoryController
);


// GET routes — no body to validate
inventoryRouter.get("/get", authMiddleware, getInventoryController); // org login 
inventoryRouter.get("/availability", authMiddleware, getBloodGroupAvailabilityController);  // org login
inventoryRouter.get("/donor-history", authMiddleware, getDonorHistoryController); // donor login 
inventoryRouter.get("/hospital-history", authMiddleware, getHospitalHistoryController);  // hospital login

// GET /api/v1/inventory/org-donors  — all donors (for organisation view)
inventoryRouter.get("/org-donors", authMiddleware, getOrgDonorsController); // org login

// GET /api/v1/inventory/org-hospitals — all hospitals (for organisation view)
inventoryRouter.get("/org-hospitals", authMiddleware, getOrgHospitalsController); // org login

// GET /api/v1/inventory/organisations — all organisations (for donor/hospital request form dropdown)
inventoryRouter.get("/organisations", authMiddleware, getOrganisationsListController); // donor/hospital login

export default inventoryRouter;




