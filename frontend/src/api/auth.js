import api from "./api";

export async function login(username, password) {
  const response = await api.post("/auth/login", {
    username,
    password,
  });

  const { token, role } = response.data;

  //  STORE AUTH STATE
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);

  return response.data;
}
export const registerHospital = async (payload) => {
  const res = await api.post("/auth/hospital/signup", payload);
  return res.data;
};

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}
