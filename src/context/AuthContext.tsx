import React, { createContext, useState, useContext, useEffect } from "react"
import { addUser } from "../api/users"
import {
  clearAllToken,
  setAccessToken,
  setRefreshToken,
  setUserProfileLocal,
} from "../utils/tokenHelpers"

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState<any>(() => {
    const storedProfile = localStorage.getItem("userProfile")
    return storedProfile ? JSON.parse(storedProfile) : null
  })

  const login = async (res: any) => {
    try {
      const payload = {
        googleid: res.profileObj.googleId,
        name: res.profileObj.name,
        email: res.profileObj.email,
      }
      const response = await addUser(payload)
      if (response?.data.exists) {
        console.log("User already exists.")
      } else {
        console.log("New user created.")
      }
      setAccessToken(response?.data.accessToken)
      setRefreshToken(response?.data.refreshToken)
      setUserProfile(res.profileObj)
    } catch (error) {
      console.error("Error adding or checking user:", error)
    }
  }

  const logout = () => {
    setUserProfile(null)
    clearAllToken()
  }

  useEffect(() => {
    if (userProfile) {
      setUserProfileLocal(userProfile)
    }
  }, [userProfile])

  return (
    <UserContext.Provider
      value={{ userProfile, setUserProfile, logout, login  }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
