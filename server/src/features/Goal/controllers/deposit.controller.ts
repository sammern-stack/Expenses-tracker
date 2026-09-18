import * as depositService from "../services/deposit.service.js";
import { asyncHandler } from "@/shared/utils/asyncHandler.js";
import type { Request, Response } from "express";
import type {
  CreateDepositBody,
  UpdateDepositBody,
} from "../types/deposit.types.js";

export const getDepositsByGoalId = asyncHandler(
  async (req: Request<{ goalId?: string }>, res: Response) => {
    const { goalId } = req.params;
    const deposits = await depositService.getDepositsByGoalId(goalId!);
    res.status(200).json({
      ok: true,
      message: "Deposits fetched successfully",
      data: deposits,
    });
  },
);

export const getDepositById = asyncHandler(
  async (req: Request<{ depositId?: string }>, res: Response) => {
    const { depositId } = req.params;
    const deposit = await depositService.getDepositById(depositId!);
    res.status(200).json({
      ok: true,
      message: "Deposit fetched successfully",
      data: deposit,
    });
  },
);

export const createDeposit = asyncHandler(
  async (
    req: Request<{ goalId?: string }, {}, CreateDepositBody>,
    res: Response,
  ) => {
    const { goalId } = req.params;
    const newDeposit = await depositService.createDeposit(goalId!, req.body);
    res.status(201).json({
      ok: true,
      message: "Deposit created successfully",
      data: newDeposit,
    });
  },
);

export const updateDeposit = asyncHandler(
  async (
    req: Request<{ depositId?: string }, {}, UpdateDepositBody>,
    res: Response,
  ) => {
    const { depositId } = req.params;
    const updatedDeposit = await depositService.updateDeposit(
      depositId!,
      req.body,
    );
    res.status(200).json({
      ok: true,
      message: "Deposit updated successfully",
      data: updatedDeposit,
    });
  },
);

export const deleteDeposit = asyncHandler(
  async (req: Request<{ depositId?: string }>, res: Response) => {
    const { depositId } = req.params;
    const deletedDeposit = await depositService.deleteDeposit(depositId!);
    res.status(200).json({
      ok: true,
      message: "Deposit deleted successfully",
      data: deletedDeposit,
    });
  },
);
