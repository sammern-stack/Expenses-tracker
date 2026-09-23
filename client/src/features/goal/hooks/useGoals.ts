import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as goalsApi from "../services/goalsApi";
import type {
  CreateGoalBody,
  GoalsQuery,
  UpdateGoalBody,
} from "../types/goal.types";

export const useGetGoalsByUserId = (userId: string, filters?: GoalsQuery) => {
  return useQuery({
    queryKey: ["goals", userId],
    queryFn: () => goalsApi.getGoalsByUserIdReq(filters),
  });
};

export const useGetGoalById = (goalId: string) => {
  return useQuery({
    queryKey: ["goal", goalId],
    queryFn: () => goalsApi.getGoalById(goalId),
  });
};

export const useCreateGoal = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (goal: CreateGoalBody) => goalsApi.createGoalReq(goal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals", userId] });
    },
  });
};

export const useUpdateGoal = (goalId: string) => {
  const queryClient = useQueryClient();

  interface Props {
    goal: UpdateGoalBody;
  }

  return useMutation({
    mutationFn: ({ goal }: Props) => goalsApi.updateGoalReq(goalId, goal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goal", goalId] });
    },
  });
};

export const useDeleteGoal = (goalId: string, userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => goalsApi.deleteGoalReq(goalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals", userId] });
    },
  });
};
