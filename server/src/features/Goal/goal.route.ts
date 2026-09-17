import { Router } from "express";
import * as goalController from "./goal.controller.js";
import { authenticate } from "@/shared/middlewares/authenticate.js";

const router = Router();

router
  .route("/")
  .get(authenticate, goalController.getGoalsByUserId)
  .post(authenticate, goalController.createGoal);
router
  .route("/:goalId")
  .get(authenticate, goalController.getGoalById)
  .put(authenticate, goalController.updateGoal)
  .delete(authenticate, goalController.deleteGoal);
router
  .route("/:goalId/currentAmount")
  .patch(authenticate, goalController.updateGoalAmount);

export default router;
