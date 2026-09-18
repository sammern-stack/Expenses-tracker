import { Router } from "express";
import authRoutes from "@/features/auth/routes/auth.route.js";
import goalRoutes from "@/features/Goal/routes/goal.route.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/goals", goalRoutes);

export default router;
