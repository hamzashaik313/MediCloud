import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ role, children }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Role mismatch
  if (userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Authorized
  return children;
}
