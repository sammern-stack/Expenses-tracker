import { Navigate, Outlet, useLocation } from "react-router";

export const ProtectedRoute = () => {
  const authorize = false;
  const location = useLocation();

  if (!authorize) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
