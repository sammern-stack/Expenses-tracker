import { Schema, model } from "mongoose";
import { EMAIL_FORMAT } from "@/shared/constants/regex.js";

import type {
  UserSchema,
  UserModel,
  UserMethods,
} from "../types/user.types.js";
import bcrypt from "bcryptjs";

const userSchema = new Schema<UserSchema, UserModel, UserMethods>(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      match: [EMAIL_FORMAT, "must provide a valid email"],
      required: [true, "email is required"],
    },
    password: {
      type: String,
      trim: true,
      select: true,
      minLength: [8, "password must be at least 8 characters"],
      required: [true, "password is required"],
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
  return;
});

userSchema.methods.comparePasswords = async function (
  incomingPassword: string,
) {
  return bcrypt.compare(incomingPassword, this.password);
};

const User = model<UserSchema, UserModel>("user", userSchema);
export default User;
