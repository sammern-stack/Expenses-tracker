import axios from "@/shared/lib/axios";
import { requestHandler } from "@/shared/utils/requestHandler";
import type {
  CreateGoalBody,
  GoalSchema,
  GoalsQuery,
  UpdateGoalBody,
} from "../types/goal.types";

const BASE_URL = "/api/goals";

export const getGoalsByUserIdReq = (filters?: GoalsQuery) => {
  return requestHandler<GoalSchema[], GoalsQuery>((params) =>
    axios({
      url: BASE_URL,
      method: "GET",
      params,
    }),
  )(filters);
};

export const getGoalById = (goalId: string) => {
  const api = axios({ url: `${BASE_URL}/${goalId}`, method: "GET" });
  return requestHandler<GoalSchema>(() => api)();
};

export const createGoalReq = (goal: CreateGoalBody) => {
  const api = axios({ url: BASE_URL, method: "POST", data: goal });
  return requestHandler<GoalSchema>(() => api)();
};

export const updateGoalReq = (goalId: string, goal: UpdateGoalBody) => {
  const api = axios({
    url: `${BASE_URL}/${goalId}`,
    method: "PUT",
    data: goal,
  });
  return requestHandler<GoalSchema>(() => api)();
};

export const deleteGoalReq = (goalId: string) => {
  const api = axios({ url: `${BASE_URL}/${goalId}`, method: "DELETE" });
  return requestHandler<GoalSchema>(() => api)();
};
