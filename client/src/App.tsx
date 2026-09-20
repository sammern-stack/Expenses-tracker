import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { ProtectedRoute } from "@/pages/Auth/ProtectedRoutes";
import { useAuthBootstrap } from "@/features/auth/hooks/useAuthBootstrap";

const LoadingPage = lazy(() => import("@/pages/Loading/Loading"));
const NotFoundPage = lazy(() => import("@/pages/NotFound/NotFound"));
const LoginPage = lazy(() => import("@/pages/Auth/Login"));
const RegisterPage = lazy(() => import("@/pages/Auth/Register"));
const HomePage = lazy(() => import("@/pages/Home/Home"));

function App() {
  useAuthBootstrap();

  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Authorized Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
