import React, { createContext, useState, useContext, useEffect } from "react"
import { clearAllToken, setUserProfileLocal } from "../utils/tokenHelpers"

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userProfile, setUserProfile] = useState<any>(() => {
    const storedProfile = localStorage.getItem("userProfile")
    return storedProfile ? JSON.parse(storedProfile) : null
  })

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
    <UserContext.Provider value={{ userProfile, setUserProfile, logout }}>
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
