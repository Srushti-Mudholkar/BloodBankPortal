import express from "express";
import {updateProfileController, changePasswordController, forgotPasswordController, resetPasswordController}  from "../controllers/userController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

// PUT /api/v1/user/update-profile
userRouter.put("/update-profile", authMiddleware, updateProfileController);

// PUT /api/v1/user/change-password
userRouter.put("/change-password", authMiddleware, changePasswordController);

// POST /api/v1/user/forgot-password
userRouter.post("/forgot-password",forgotPasswordController);

// PUT /api/v1/user/reset-password/:token
userRouter.post("/reset-password/:token",resetPasswordController);

export default userRouter;

