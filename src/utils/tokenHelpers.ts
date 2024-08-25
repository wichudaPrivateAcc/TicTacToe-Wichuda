export const getAccessToken = () => localStorage.getItem("accessToken")
export const getRefreshToken = () => localStorage.getItem("refreshToken")

export const removeAccessToken = () => localStorage.removeItem("accessToken")
export const removeRefreshToken = () => localStorage.removeItem("refreshToken")
export const removeUserProfile = () => localStorage.removeItem("userProfile")

export const clearAllToken = () => {
  removeAccessToken()
  removeRefreshToken()
  removeUserProfile()
}

export const setAccessToken = (accessToken: string) =>
  localStorage.setItem("accessToken", accessToken)

export const setRefreshToken = (refreshToken: string) =>
  localStorage.setItem("refreshToken", refreshToken)

export const setUserProfileLocal = (userProfile: any) =>
  localStorage.setItem("userProfile", JSON.stringify(userProfile))
