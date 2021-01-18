import { Router } from "express";
import UserController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";
import { UserRole } from "../models/User";

const userController = new UserController();
const router = Router();

router.post(
  "/",
  authMiddleware({ role: [UserRole.ADMIN] }),
  userController.store
);

router.get(
  "/:id",
  authMiddleware({ role: [UserRole.ADMIN] }),
  userController.show
);

router.get(
  "/",
  authMiddleware({ role: [UserRole.ADMIN] }),
  userController.index
);

router.put(
  "/:id",
  authMiddleware({ role: [UserRole.ADMIN] }),
  userController.update
);

router.delete(
  "/:id",
  authMiddleware({ role: [UserRole.ADMIN] }),
  userController.destroy
);

export default router;
