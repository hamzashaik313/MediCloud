import api from "./api";

export const getMyRecords = async () => {
  const res = await api.get("/patient/my-records");
  return res.data;
};

export const downloadRecord = async (recordId) => {
  const res = await api.get(`/patient/download/${recordId}`);
  return res.data;
};
