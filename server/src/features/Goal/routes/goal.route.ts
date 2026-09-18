import { Router } from "express";
import * as goalController from "../controllers/goal.controller.js";
import * as depositController from "../controllers/deposit.controller.js";
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
router
  .route("/:goalId/deposits")
  .get(authenticate, depositController.getDepositsByGoalId)
  .post(authenticate, depositController.createDeposit);
router
  .route("/deposits/:depositId")
  .get(authenticate, depositController.getDepositById)
  .put(authenticate, depositController.updateDeposit)
  .delete(authenticate, depositController.deleteDeposit);

export default router;
