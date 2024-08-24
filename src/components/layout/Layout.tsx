import { Outlet } from "react-router-dom"
import { Container } from "@mui/material"
import Header from "./Header"

export default function Layout() {
  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Outlet />
      </Container>
    </>
  )
}
