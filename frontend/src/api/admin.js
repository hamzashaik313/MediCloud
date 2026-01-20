import api from "./api";

// ===== DASHBOARD STATS =====
export const getAdminStats = async () => {
  const res = await api.get("/admin/dashboard-stats");

  return {
    users: res.data.totalUsers ?? 0,
    doctors: res.data.totalDoctors ?? 0,
    patients: res.data.totalPatients ?? 0,
    records: res.data.totalMedicalRecords ?? 0,
  };
};

// ===== REGISTER PATIENT =====
export const registerPatient = async ({ username, password }) => {
  return api.post("/admin/register", {
    username,
    password,
    role: "ROLE_PATIENT",
  });
};

// ===== REGISTER DOCTOR =====
export const registerDoctor = async ({ username, password, speciality }) => {
  return api.post("/admin/register-doctor", null, {
    params: {
      username,
      password,
      specialty: speciality,
    },
  });
};
