import { Navigate } from "react-router-dom"
import { useUser } from "../context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { userProfile } = useUser()

  return userProfile ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
