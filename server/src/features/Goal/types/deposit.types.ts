import type { Types } from "mongoose";

export type DepositSchema = {
  amount: number;
  note?: string;
  goalId: Types.ObjectId;
};

export type DepositProperties = Omit<DepositSchema, "goalId">;
export type CreateDepositBody = DepositProperties;
export type UpdateDepositBody = Partial<DepositProperties>;
