import "@/shared/styles/global.scss";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/shared/lib/queryClient.ts";
import App from "./App.tsx";

const root = document.getElementById("root")!;
createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
