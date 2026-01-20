import api from "./api";

/**
 * Get logged-in patient's profile
 */
export const getProfile = async () => {
  const res = await api.get("/patient/me");
  return res.data;
};

/**
 * Get logged-in patient's medical records
 */
export const getMyRecords = async () => {
  const res = await api.get("/patient/my-records");
  return res.data;
};
