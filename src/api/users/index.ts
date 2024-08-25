import { axiosInstance } from ".."
import {
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../../utils/tokenHelpers"

export const getUserData = async (googleid: string) => {
  try {
    const response = await axiosInstance.get(`users/${googleid}`)
    return response.data
  } catch (error) {
    console.error("Error fetching user data", error)
  }
}

export const updateUserScore = async (payload: UpdatePayload) => {
  try {
    const res = await axiosInstance.put(`users/${payload.googleid}`, {
      score: payload.newScore,
      consecutiveWins: payload.consecutiveWins,
      gameHistoryLog: payload.gameHistoryLog,
    })
    return res
  } catch (error) {
    console.error("Error updating score", error)
  }
}

export const addUser = async (payload: AddUserPayload) => {
  try {
    const res = await axiosInstance.post(`users/${payload.googleid}`, {
      googleid: payload.googleid,
      name: name,
      email: payload.email,
    })
    return res
  } catch (error) {
    console.error("Error updating user", error)
  }
}

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    console.error("No refresh token available")
    return null
  }

  try {
    const response = await axiosInstance.post("users/refresh-token", {
      refreshToken,
    })

    const { accessToken, refreshToken: newRefreshToken } = response.data
    setAccessToken(accessToken)
    setRefreshToken(newRefreshToken)

    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`

    return accessToken
  } catch (error) {
    console.error("Failed to refresh token", error)
    return null
  }
}
