import { create } from "zustand";
import type { UserSchema } from "../types/user.types";

type UserStatus = "idle" | "loading" | "authenticated" | "unauthenticated";
interface UserStore {
  user: UserSchema | null;
  status: UserStatus;
  authenticateUser: (user: UserSchema) => void;
  unauthenticatedUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  status: "idle",
  authenticateUser: (user) => set({ user, status: "authenticated" }),
  unauthenticatedUser: () => set({ user: null, status: "unauthenticated" }),
}));
