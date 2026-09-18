import Deposit from "../models/Deposit.model.js";
import Goal from "@/features/Goal/models/Goal.model.js";
import { GoalQueryOptions } from "@/config/mongoose.js";
import { BadRequestError, NotFoundError } from "@/shared/utils/customErrors.js";
import type {
  CreateDepositBody,
  UpdateDepositBody,
} from "../types/deposit.types.js";

// Helper
const updateGoalAmount = async (goalId: string, amount: number) => {
  const goal = await Goal.findById(goalId);
  if (!goal) throw new NotFoundError(`goal with Id ${goalId}`);

  const newCurrentAmount = goal.currentAmount + amount;

  const updatedGoal = await Goal.findByIdAndUpdate(
    goalId,
    {
      currentAmount: newCurrentAmount,
      isCompleted: newCurrentAmount >= goal.targetAmount,
    },
    GoalQueryOptions,
  );
  if (!updatedGoal) throw new NotFoundError(`goal with Id ${goalId}`);
};

export const getDepositsByGoalId = async (goalId: string) => {
  const deposits = await Deposit.find({ goalId });
  return deposits;
};

export const getDepositById = async (depositId: string) => {
  const deposit = await Deposit.findById(depositId);
  if (!deposit) throw new NotFoundError(`deposit with id ${depositId}`);
  return deposit;
};

export const createDeposit = async (
  goalId: string,
  deposit: CreateDepositBody,
) => {
  await updateGoalAmount(goalId, deposit.amount);
  const newDeposit = await Deposit.create({ ...deposit, goalId });
  return newDeposit;
};

export const updateDeposit = async (
  depositId: string,
  updates: UpdateDepositBody,
) => {
  const deposit = await Deposit.findById(depositId);
  if (!deposit) throw new NotFoundError(`deposit with id ${depositId}`);

  if ("amount" in updates) {
    const goalId = deposit.goalId.toString();
    const amountDiff = updates.amount - deposit.amount;
    await updateGoalAmount(goalId, amountDiff);
  }

  const updatedDeposit = await Deposit.findByIdAndUpdate(deposit._id, updates, {
    returnDocument: "after",
    runValidators: true,
  });

  return updatedDeposit!;
};

export const deleteDeposit = async (depositId: string) => {
  const deposit = await Deposit.findById(depositId);
  if (!deposit) throw new NotFoundError(`deposit with id ${depositId}`);

  await updateGoalAmount(deposit.goalId.toString(), -deposit.amount);

  const deletedDeposit = await Deposit.findByIdAndDelete(deposit._id);
  return deletedDeposit!;
};
