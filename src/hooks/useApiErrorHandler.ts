import { useUser } from "../context/AuthContext"
import { refreshAccessToken } from "../api/users"
import { setAccessToken } from "../utils/tokenHelpers"
import { axiosInstance } from "../api"

export const useApiErrorHandler = () => {
  const { logout } = useUser()

  const handleApiError = async (error: any) => {
    const originalRequest = error.config

    if (!error.response) {
      console.error("No response from server:", error)
      return Promise.reject(error)
    }

    const { status } = error.response

    if ((status === 401 || status === 403) && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const newAccessToken = await refreshAccessToken()
        if (newAccessToken) {
          setAccessToken(newAccessToken)
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
          return axiosInstance(originalRequest) // รีทราย request ด้วย token ใหม่
        } else {
          logout() // ถ้า refresh token ไม่สำเร็จ ให้ log out ไปเลย
        }
      } catch (refreshError) {
        console.error("Failed to refresh access token:", refreshError)
        logout()
      }
    } else if (status === 500) {
      console.log("Server error.")
    } else {
      console.log("Unhandled error:", error)
    }

    return Promise.reject(error)
  }

  return { handleApiError }
}
