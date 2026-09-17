import { Schema, model } from "mongoose";
import type { GoalSchema } from "./goal.types.js";

const goalSchema = new Schema<GoalSchema>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    targetAmount: {
      type: Number,
      required: [true, "a target amount is required"],
      min: [0, "amount cant be negative"],
    },
    currentAmount: {
      type: Number,
      default: 0,
      min: [0, "amount cant be negative"],
    },
    deadline: {
      type: String,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { timestamps: true },
);

const Goal = model<GoalSchema>("goal", goalSchema);
export default Goal;
