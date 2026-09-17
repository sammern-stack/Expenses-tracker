import type { UserDocument } from "@/features/auth/types/user.types.ts";

declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}
