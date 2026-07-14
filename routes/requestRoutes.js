import express from "express";
import {createRequestController,getMyRequestsController,getOrgRequestsController,updateRequestStatusController} from "../controllers/requestController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { createRequestSchema, updateRequestStatusSchema } from "../validators/requestValidator.js";

const requestRouter = express.Router();

// POST /api/v1/request/create
// authMiddleware → validate → createRequestController
requestRouter.post("/create",authMiddleware,validate(createRequestSchema),createRequestController);

// GET routes — no body to validate
requestRouter.get("/my-requests", authMiddleware, getMyRequestsController);
requestRouter.get("/org-requests", authMiddleware, getOrgRequestsController);

// PUT /api/v1/request/update-status/:id
// authMiddleware → validate → updateRequestStatusController
requestRouter.put("/update-status/:id",authMiddleware,validate(updateRequestStatusSchema),updateRequestStatusController);

export default requestRouter;
