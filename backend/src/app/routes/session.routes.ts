import { Router } from "express";
import SessionController from "../controllers/sessionController";
import authMiddleware from "../middlewares/authMiddleware";
import { UserRole } from "../models/User";

const sessionController = new SessionController();
const router = Router();

router.post("/", sessionController.store);

router.post(
  "/me",
  authMiddleware({ role: [UserRole.ADMIN, UserRole.CLIENT] }),
  sessionController.connect
);

export default router;
