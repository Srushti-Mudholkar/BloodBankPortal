import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const protectedRouter = express.Router();

// Example protected route
protectedRouter.get("/dashboard", authMiddleware, (req, res) => {
  res.status(200).send({
    success: true,
    message: "Welcome to your dashboard",
    userId: req.user,
  });
});

export default protectedRouter;
