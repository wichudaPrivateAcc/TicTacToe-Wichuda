import axios from "axios"
import { refreshAccessToken } from "./users"
import { clearAllToken, getAccessToken } from "../utils/tokenHelpers"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    console.log("Error response:", error.response)
    console.log("Original Request:", originalRequest)

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      console.log("Attempting to refresh token...")
      originalRequest._retry = true

      try {
        const newAccessToken = await refreshAccessToken()

        if (newAccessToken) {
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
          return axiosInstance(originalRequest)
        } else {
          return Promise.reject(error)
        }
      } catch (refreshError) {
        console.error("Failed to refresh access token:", refreshError)
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export { axiosInstance }
