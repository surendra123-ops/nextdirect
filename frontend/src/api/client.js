import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE || "/api/v1";

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

let refreshPromise = null;

function shouldAttemptRefresh(config) {
  if (!config || config._retry) return false;
  const url = String(config.url || "");
  return !["/auth/login", "/auth/register", "/auth/google", "/auth/refresh"].some((p) => url.includes(p));
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;

    if (status === 401 && shouldAttemptRefresh(original)) {
      original._retry = true;
      try {
        if (!refreshPromise) {
          refreshPromise = api.post("/auth/refresh").finally(() => {
            refreshPromise = null;
          });
        }
        await refreshPromise;
        return api(original);
      } catch {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
