import type { Types } from "mongoose";

export type GoalSchema = {
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  isCompleted: boolean;
  userId: Types.ObjectId;
}
