import React, { createContext, useState, useContext, useEffect } from "react"

interface UserContextType {
  userProfile: any
  setUserProfile: React.Dispatch<React.SetStateAction<any>>
  logout: () => void
}

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
    localStorage.removeItem("userProfile")
  }

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem("userProfile", JSON.stringify(userProfile))
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
