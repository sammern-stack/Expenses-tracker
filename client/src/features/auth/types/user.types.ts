export type UserSchema = {
  _id: string;
  username: string;
  email: string;
  password: string;
  updatedAt: string;
  createdAt: string;
};

export type UserLoginInfo = Pick<UserSchema, "email" | "password">;
export type UserRegisterInfo = Omit<
  UserSchema,
  "_id" | "updatedAt" | "createdAt"
>;
