import { api } from "../api/client.js";

export async function getMe() {
  const { data } = await api.get("/users/me");
  return data.data.user;
}

export async function updateMe(payload) {
  const { data } = await api.patch("/users/me", payload);
  return data.data.user;
}
