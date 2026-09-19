import "@tanstack/react-query";
import type { ErrorResponse } from "./api.types";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ErrorResponse;
  }
}
