import Goal from "./Goal.model.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "@/shared/utils/customErrors.js";

import type { QueryFilter, QueryOptions } from "mongoose";
import type {
  GoalsQuery,
  GoalSchema,
  CreateGoalBody,
  UpdateGoalBody,
} from "./goal.types.js";

// Helper
const GoalQueryOptions: QueryOptions<GoalSchema> = {
  returnDocument: "after",
  runValidators: true,
};

export const getGoalsByUserId = async (
  userId: string,
  query: GoalsQuery = {},
) => {
  const { filter = {}, sortBy = "createdAt", order = "desc" } = query;

  const goalsQuery: QueryFilter<GoalSchema> = { userId, ...filter };
  const sort = { [sortBy]: order === "asc" ? 1 : -1 } as const;

  const goals = await Goal.find(goalsQuery).sort(sort);
  return goals;
};

export const getGoalById = async (goalId: string) => {
  const goal = await Goal.findById(goalId);
  if (!goal) throw new NotFoundError(`goal with Id ${goalId}`);
  return goal;
}

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
  if (deposit === 0) throw new BadRequestError("Deposit can't be 0");

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
