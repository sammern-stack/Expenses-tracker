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

export interface UserModel extends Model<UserSchema>, UserMethods {}
