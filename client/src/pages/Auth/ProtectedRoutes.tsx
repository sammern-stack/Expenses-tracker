import { useUserStore } from "@/features/auth/stores/userStore";
import { Navigate, Outlet, useLocation } from "react-router";

export const ProtectedRoute = () => {
  const user = useUserStore((s) => s.user);
  const status = useUserStore((s) => s.status);
  const location = useLocation();

  if (status === "idle" || status === "loading") return null;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
