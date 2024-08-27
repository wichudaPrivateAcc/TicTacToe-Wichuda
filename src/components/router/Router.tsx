import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "../layout/Layout"
import Login from "../login/Login"
import Profile from "../Profile"
import Game from "../game/Game"
import ProtectedRoute from "../ProtectedRoute"
import PageNotFound from "../PageNotFound"

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
        {
          path: "*",
          element: <PageNotFound />,
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}
