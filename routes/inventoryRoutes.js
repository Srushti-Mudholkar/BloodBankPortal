import express from "express";
import {
  createInventoryController,
  getInventoryController,
  getBloodGroupAvailabilityController,
  getDonorHistoryController,
  getHospitalHistoryController,
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

export default inventoryRouter;




