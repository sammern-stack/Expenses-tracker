import { Schema, model } from "mongoose";
import type { DepositSchema } from "../types/deposit.types.js";

const depositSchema = new Schema<DepositSchema>(
  {
    amount: {
      type: Number,
      required: [true, "amount is required"],
      validate: {
        validator: (value: number) => value !== 0,
        message: "amount can't be 0",
      },
    },
    note: {
      type: String,
      trim: true,
    },
    goalId: {
      type: Schema.Types.ObjectId,
      ref: "goal",
      required: [true, "must associate deposit with a goalId"],
    },
  },
  { timestamps: true },
);

const Deposit = model<DepositSchema>("deposit", depositSchema);
export default Deposit;
