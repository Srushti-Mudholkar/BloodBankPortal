import express from "express";
import {
  registerController,
  loginController,
  currentUserController,
  verifyEmailController
  
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { registerSchema, loginSchema } from "../validators/authValidator.js";

const authRouter = express.Router();

// POST /api/v1/auth/register
// validate(registerSchema) runs first → if passes → registerController runs
authRouter.post("/register", validate(registerSchema), registerController);

// POST /api/v1/auth/login
// validate(loginSchema) runs first → if passes → loginController runs
authRouter.post("/login", validate(loginSchema), loginController);

authRouter.get("/verify-email/:token", verifyEmailController);

// GET /api/v1/auth/current-user
// authMiddleware checks token → if valid → currentUserController runs
authRouter.get("/current-user", authMiddleware, currentUserController);

export default authRouter;
