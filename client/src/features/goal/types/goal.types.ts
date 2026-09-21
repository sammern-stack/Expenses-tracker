export type GoalSchema = {
  _id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  isCompleted: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type GoalProperties = Omit<
  GoalSchema,
  "currentAmount" | "isCompleted" | "userId" | "_id" | "createdAt" | "updatedAt"
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
