import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { ProtectedRoute } from "@/pages/Auth/ProtectedRoutes";

const LoadingPage = lazy(() => import("@/pages/Loading/Loading"));
const NotFoundPage = lazy(() => import("@/pages/NotFound/NotFound"));
const LoginPage = lazy(() => import("@/pages/Auth/Login"));
const RegisterPage = lazy(() => import("@/pages/Auth/Register"));

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Authorized Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
