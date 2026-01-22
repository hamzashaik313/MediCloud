import api from "./api";

// ===== DASHBOARD STATS =====
export const getAdminStats = async () => {
  const res = await api.get("/admin/dashboard-stats");
  return res.data;
};

// ===== REGISTER PATIENT =====
export const registerPatient = async (username, password) => {
  return api.post("/admin/register", {
    username,
    password,
    role: "ROLE_PATIENT",
  });
};

// ===== REGISTER DOCTOR =====
export const registerDoctor = async (username, password, specialty) => {
  return api.post("/admin/register-doctor", null, {
    params: { username, password, specialty },
  });
};

// ===== GET ALL USERS =====
export const getAllUsers = async (
  page = 0,
  size = 10,
  username = "",
  role = ""
) => {
  const res = await api.get("/admin/users", {
    params: {
      page,
      size,
      username: username || undefined,
      role: role || undefined,
    },
  });
  return res.data;
};


// ===== TOGGLE USER =====
export const toggleUser = async (id) => {
  return api.put(`/admin/users/${id}/toggle`);
};

export const getAllDoctors = async () => {
  const res = await api.get("/admin/doctors");
  return res.data;
};
export const getAllPatients = async () => {
  const res = await api.get("/admin/patients");
  return res.data;
};

export const getActivityLogs = async (page = 0, size = 10) => {
  const res = await api.get("/admin/activity-logs", {
    params: { page, size },
  });
  return res.data;
};

