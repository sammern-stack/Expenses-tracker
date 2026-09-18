import type { QueryOptions } from "mongoose";
import type { GoalSchema } from "@/features/Goal/types/goal.types.js";

export const GoalQueryOptions: QueryOptions<GoalSchema> = {
  returnDocument: "after",
  runValidators: true,
};
