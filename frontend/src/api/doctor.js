import api from "./api";

/**
 * Get patients assigned to the logged-in doctor
 */
export const getPatients = async () => {
  const res = await api.get("/doctor/patients");
  return res.data;
};

/**
 * Upload medical record for a patient
 */
export const uploadRecord = async (patientId, file, notes) => {
  const formData = new FormData();
  formData.append("file", file);

  if (notes) {
    formData.append("notes", notes);
  }

  const res = await api.post(`/records/upload/${patientId}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      // ❌ do NOT set Content-Type
    },
  });

  return res.data;
};
export const getMyUploads = async () => {
  const res = await api.get("/doctor/my-uploads");
  return res.data;
};

export const getPatientRecords = async (patientId) => {
  const res = await api.get(`/records/patient/${patientId}`);
  return res.data;
};

export const searchPatients = async (query) => {
  const res = await api.get("/doctor/patients/search", {
    params: { query },
  });
  return res.data;
};
