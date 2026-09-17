import type { Types } from "mongoose";

export type GoalSchema = {
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  isCompleted: boolean;
  userId: Types.ObjectId;
};

export type GoalProperties = Omit<
  GoalSchema,
  "currentAmount" | "isCompleted" | "userId"
>;

export type CreateGoalBody = GoalProperties;
export type UpdateGoalBody = Partial<GoalProperties>;

export type GoalFilter = {
  isCompleted?: boolean;
  currentAmount: number;
};

export type GoalSortField = "name" | "deadline" | "targetAmount" | "createdAt";

export type GoalsQuery = {
  filter?: GoalFilter;
  sortBy?: GoalSortField;
  order?: "asc" | "desc";
};
