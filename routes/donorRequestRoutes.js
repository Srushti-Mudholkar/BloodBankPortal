import express from "express";
import {
  createDonorRequestController,
  getSentDonorRequestsController,
  getReceivedDonorRequestsController,
  respondDonorRequestController,
  getAllDonorsController,
} from "../controllers/donorRequestController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { createDonorRequestSchema, respondDonorRequestSchema } from "../validators/DonorRequestValidator.js";

const donorRequestRouter = express.Router();

// POST /api/v1/donor-request/create
donorRequestRouter.post("/create", authMiddleware, validate(createDonorRequestSchema), createDonorRequestController);

// GET /api/v1/donor-request/sent
donorRequestRouter.get("/sent", authMiddleware, getSentDonorRequestsController);

// GET /api/v1/donor-request/received
donorRequestRouter.get("/received", authMiddleware, getReceivedDonorRequestsController);

// PUT /api/v1/donor-request/respond/:id
donorRequestRouter.put("/respond/:id", authMiddleware, validate(respondDonorRequestSchema), respondDonorRequestController);

// GET /api/v1/donor-request/donors?bloodGroup=A+
donorRequestRouter.get("/donors", authMiddleware, getAllDonorsController);

export default donorRequestRouter;
