import { api } from "../api/client.js";

export async function register(payload) {
  const { data } = await api.post("/auth/register", payload);
  return data.data;
}

export async function login(payload) {
  const { data } = await api.post("/auth/login", payload);
  return data.data;
}

export async function loginWithGoogle(idToken) {
  const { data } = await api.post("/auth/google", { idToken });
  return data.data;
}

export async function refreshSession() {
  const { data } = await api.post("/auth/refresh");
  return data.data;
}

export async function logout() {
  const { data } = await api.post("/auth/logout");
  return data.data;
}
