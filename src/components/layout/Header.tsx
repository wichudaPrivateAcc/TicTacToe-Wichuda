import {
  AppBar,
  Avatar,
  Button,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../context/AuthContext"
import { GoogleLogout } from "react-google-login"

export default function Header() {
  const navigate = useNavigate()
  const { userProfile, logout } = useUser()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar>
        <Grid
          container
          display={"flex"}
          justifyContent={{ xs: "center", sm: "space-between" }}
          alignItems={"center"}
          py={{ xs: 2, sm: 0 }}
        >
          <Typography
            variant="h1"
            color="info.light"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            TicTacToe
          </Typography>
          {userProfile ? (
            <Stack
              direction={"row"}
              spacing={2}
              display={"flex"}
              alignItems={"center"}
            >
              <Avatar
                alt={userProfile.name}
                src={userProfile.imageUrl}
                sx={{
                  width: 40,
                  height: 40,
                  marginBottom: 2,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/profile")}
              />
              <Typography variant="h6" color={"info.light"}>
                {userProfile.name}
              </Typography>
              <GoogleLogout
                clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}
                buttonText="Log Out"
                onLogoutSuccess={handleLogout}
                style={{ backgroundColor: "pink", borderRadius: 10 }}
              />
            </Stack>
          ) : (
            <Button
              variant="contained"
              sx={{ borderRadius: 50 }}
              onClick={() => navigate("/login")}
            >
              Log in
            </Button>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
