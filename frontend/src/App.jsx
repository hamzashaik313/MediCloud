import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
//import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UploadRecord from "./pages/doctor/UploadRecord";
import MyUploads from "./pages/doctor/MyUploads";
import DoctorPatientRecords from "./pages/doctor/DoctorPatientRecords";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ DEFAULT ROUTE */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}

        <Route path="/doctor/upload" element={<UploadRecord />} />
        <Route
          path="/doctor/patient/:patientId/records"
          element={<DoctorPatientRecords />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ROLE_ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="ROLE_DOCTOR">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/doctor/uploads" element={<MyUploads />} />

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
