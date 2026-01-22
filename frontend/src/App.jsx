//App.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAuditLogs from "./pages/admin/AdminAuditLogs";

import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";
import UploadRecord from "./pages/doctor/UploadRecord";
import MyUploads from "./pages/doctor/MyUploads";
import DoctorPatientRecords from "./pages/doctor/DoctorPatientRecords";
import AdminRegisterUser from "./pages/admin/AdminRegisterUser";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* ===== ADMIN ROUTES ===== */}
        {/* <Route
          path="/admin"
          element={
            <ProtectedRoute role="ROLE_ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="activity-logs" element={<AdminAuditLogs />} />
        </Route> */}
        <Route
  path="/admin"
  element={
    <ProtectedRoute role="ROLE_ADMIN">
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<Navigate to="dashboard" replace />} />
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="users" element={<AdminUsers />} />
  <Route path="users/register" element={<AdminRegisterUser />} />
  <Route path="activity-logs" element={<AdminAuditLogs />} />
</Route>


        {/* ===== DOCTOR ROUTES ===== */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="ROLE_DOCTOR">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/doctor/upload" element={<UploadRecord />} />
        <Route path="/doctor/uploads" element={<MyUploads />} />
        <Route
          path="/doctor/patient/:patientId/records"
          element={<DoctorPatientRecords />}
        />

        {/* ===== PATIENT ROUTES ===== */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute role="ROLE_PATIENT">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
