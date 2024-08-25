import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "../layout/Layout"
import Login from "../Login"
import Profile from "../Profile"
import Game from "../homepage/Game"
import ProtectedRoute from "../ProtectedRoute"

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: (
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
          ),
          index: true,
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}
