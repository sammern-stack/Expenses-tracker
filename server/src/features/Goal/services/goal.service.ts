import Goal from "../models/Goal.model.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "@/shared/utils/customErrors.js";
import { GoalQueryOptions } from "@/config/mongoose.js";

import type { QueryFilter } from "mongoose";
import type {
  GoalsQuery,
  GoalSchema,
  CreateGoalBody,
  UpdateGoalBody,
} from "../types/goal.types.js";

export const getGoalsByUserId = async (
  userId: string,
  query: GoalsQuery = {},
) => {
  const { filter = {}, sortBy = "createdAt", order = "desc" } = query;

  const goalsQuery: QueryFilter<GoalSchema> = { userId, ...filter };
  const sort = { [sortBy]: order === "asc" ? 1 : -1 } as const;

  const filteredGoals = await Goal.find(goalsQuery).sort(sort);
  const allGoals = await Goal.find({ userId });
  const totalSavings = allGoals
    .map((g) => g.currentAmount)
    .reduce((total, amount) => total + amount, 0);

  return { filteredGoals, allGoals, totalSavings };
};

export const getGoalById = async (goalId: string) => {
  const goal = await Goal.findById(goalId);
  if (!goal) throw new NotFoundError(`goal with Id ${goalId}`);
  return goal;
};

export const createGoal = async (userId: string, goal: CreateGoalBody) => {
  const goalExist = await Goal.findOne({ name: goal.name });
  if (goalExist) {
    throw new ConflictError(`Goal with the name ${goal.name} already exists`);
  }

  const newGoal = await Goal.create({ ...goal, userId });
  return newGoal;
};

export const updateGoal = async (
  goalId: string,
  goalUpdates: UpdateGoalBody,
) => {
  const updatedGoal = await Goal.findByIdAndUpdate(
    goalId,
    goalUpdates,
    GoalQueryOptions,
  );
  if (!updatedGoal) throw new NotFoundError(`goal with Id ${goalId}`);
  return updatedGoal;
};

export const updateGoalAmount = async (goalId: string, deposit: number) => {
  const goal = await Goal.findById(goalId);
  if (!goal) throw new NotFoundError(`goal with Id ${goalId}`);

  const newCurrentAmount = goal.currentAmount + deposit;

  const updatedGoal = await Goal.findByIdAndUpdate(
    goalId,
    {
      currentAmount: newCurrentAmount,
      isCompleted: newCurrentAmount >= goal.targetAmount,
    },
    GoalQueryOptions,
  );
  if (!updatedGoal) throw new NotFoundError(`goal with Id ${goalId}`);

  return updatedGoal;
};

export const deleteGoal = async (goalId: string) => {
  const deletedGoal = await Goal.findByIdAndDelete(goalId);
  if (!deletedGoal) throw new NotFoundError(`goal with Id ${goalId}`);
  return deletedGoal;
};
