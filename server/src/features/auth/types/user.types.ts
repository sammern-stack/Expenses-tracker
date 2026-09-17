import type { HydratedDocument, Model } from "mongoose";

export type UserSchema = {
  username: string;
  email: string;
  password: string;
};

export type UserDocument = HydratedDocument<UserSchema>;

export type UserMethods = {
  comparePasswords(incomingPassword: string): Promise<boolean>;
};

export interface UserStaticMethods {
  findByEmail(this: UserModel, userEmail: string): Promise<UserDocument | null>;
}

export interface UserModel
  extends Model<UserSchema, {}, UserMethods>, UserStaticMethods {}

export type RegisterUserBody = UserSchema;
export type LoginUserBody = Omit<UserSchema, "username">;
