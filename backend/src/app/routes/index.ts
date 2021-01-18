import { Router } from "express";

import sessionRoutes from "./session.routes";
import userRoutes from "./user.routes";

const router = Router();

router.use("/user", userRoutes);
router.use("/session", sessionRoutes);

export default router;
