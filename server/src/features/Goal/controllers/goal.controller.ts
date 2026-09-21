import * as goalService from "@/features/Goal/services/goal.service.js";
import { asyncHandler } from "@/shared/utils/asyncHandler.js";
import type { Request, Response } from "express";
import type {
  CreateGoalBody,
  GoalsQuery,
  UpdateGoalBody,
} from "../types/goal.types.js";

export const getGoalsByUserId = asyncHandler(
  async (req: Request<{}, {}, {}, GoalsQuery>, res: Response) => {
    const userId = req.user?._id.toString()!;
    const goals = await goalService.getGoalsByUserId(userId, req.query);
    res.status(200).json({
      ok: true,
      message: "Goals fetched successfully",
      data: goals.filteredGoals,
      meta: {
        savings: goals.totalSavings,
        active: goals.allGoals.filter((g) => !g.isCompleted).length,
        completed: goals.allGoals.filter((g) => g.isCompleted).length,
      },
    });
  },
);

export const getGoalById = asyncHandler(
  async (req: Request<{ goalId?: string }>, res: Response) => {
    const { goalId } = req.params;
    const goal = await goalService.getGoalById(goalId!);
    res.status(200).json({
      ok: true,
      message: "Goal fetched successfully",
      data: goal,
    });
  },
);

export const createGoal = asyncHandler(
  async (req: Request<{}, {}, CreateGoalBody>, res: Response) => {
    const userId = req.user?._id.toString()!;
    const newGoal = await goalService.createGoal(userId, req.body);
    res.status(201).json({
      ok: true,
      message: "Goal created successfully",
      data: newGoal,
    });
  },
);

export const updateGoal = asyncHandler(
  async (
    req: Request<{ goalId?: string }, {}, UpdateGoalBody>,
    res: Response,
  ) => {
    const { goalId } = req.params;
    const updatedGoal = await goalService.updateGoal(goalId!, req.body);
    res.status(200).json({
      ok: true,
      message: "Goal updated successfully",
      data: updatedGoal,
    });
  },
);

export const updateGoalAmount = asyncHandler(
  async (
    req: Request<{ goalId?: string }, {}, { deposit: number }>,
    res: Response,
  ) => {
    const { goalId } = req.params;
    const { deposit } = req.body;
    const updatedGoal = await goalService.updateGoalAmount(goalId!, deposit);
    res.status(200).json({
      ok: true,
      message: "Goal updated successfully",
      data: updatedGoal,
    });
  },
);

export const deleteGoal = asyncHandler(
  async (req: Request<{ goalId?: string }>, res: Response) => {
    const { goalId } = req.params;
    const deletedGoal = await goalService.deleteGoal(goalId!);
    res.status(200).json({
      ok: true,
      message: "Goal deleted successfully",
      data: deletedGoal,
    });
  },
);
