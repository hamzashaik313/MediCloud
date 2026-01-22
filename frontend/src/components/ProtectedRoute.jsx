// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ role, children }) {
//   const token = localStorage.getItem("token");
//   const userRole = localStorage.getItem("role");

//   //  Not logged in
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   //  Role mismatch
//   if (userRole !== role) {
//     return <Navigate to="/login" replace />;
//   }

//   // Authorized
//   return children;
// }

import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ role, children }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // 🔐 Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🔒 Role mismatch
  if (role && userRole !== role) {
    // Redirect to their own dashboard instead of login
    if (userRole === "ROLE_ADMIN") return <Navigate to="/admin/dashboard" />;
    if (userRole === "ROLE_DOCTOR") return <Navigate to="/doctor" />;
    if (userRole === "ROLE_PATIENT") return <Navigate to="/patient" />;

    return <Navigate to="/login" replace />;
  }

  // ✅ Authorized
  return children;
}

