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
    const goals = await goalService.getGoalsByUserId(
      req.user?._id.toString()!,
      req.query,
    );
    res.status(200).json({
      ok: true,
      message: "Goals fetched successfully",
      data: goals,
    });
  },
);

export const getGoalById = asyncHandler(
  async (req: Request<{ goalId?: string }>, res: Response) => {
    const goal = await goalService.getGoalById(req.params.goalId!);
    res.status(200).json({
      ok: true,
      message: "Goal fetched successfully",
      data: goal,
    });
  },
);

export const createGoal = asyncHandler(
  async (req: Request<{}, {}, CreateGoalBody>, res: Response) => {
    const newGoal = await goalService.createGoal(
      req.user?._id.toString()!,
      req.body,
    );
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
    const updatedGoal = await goalService.updateGoal(
      req.params.goalId!,
      req.body,
    );
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
    const updatedGoal = await goalService.updateGoalAmount(
      req.params.goalId!,
      req.body.deposit,
    );
    res.status(200).json({
      ok: true,
      message: "Goal updated successfully",
      data: updatedGoal,
    });
  },
);

export const deleteGoal = asyncHandler(
  async (req: Request<{ goalId?: string }>, res: Response) => {
    const deletedGoal = await goalService.deleteGoal(req.params.goalId!);
    res.status(200).json({
      ok: true,
      message: "Goal deleted successfully",
      data: deletedGoal,
    });
  },
);
