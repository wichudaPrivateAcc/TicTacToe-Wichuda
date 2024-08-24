import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "../layout/Layout"
import Login from "../Login"
import Profile from "../Profile"
import Game from "../homepage/Game"

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
          element: <Game />,
          index: true,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}
