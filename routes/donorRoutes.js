import express from "express";
import { listDonorsController, getDonorProfileController } from "../controllers/donorController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const donorRouter = express.Router();

// GET /api/v1/donors?bloodGroup=A+&page=1&limit=8
donorRouter.get("/", authMiddleware, listDonorsController);

// GET /api/v1/donors/:id
donorRouter.get("/:id", authMiddleware, getDonorProfileController);

export default donorRouter;