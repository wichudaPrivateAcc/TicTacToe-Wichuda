import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Typography } from "@mui/material"
import { gapi } from "gapi-script"
import GoogleLogin from "react-google-login"
import { useUser } from "../../context/AuthContext"
import GoogleIcon from "@mui/icons-material/Google"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import LoginContainer from "./LoginContainer"
import { addUser } from "../../api/users"
import { setAccessToken, setRefreshToken } from "../../utils/tokenHelpers"

export default function Login() {
  const { setUserProfile, userProfile } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
        scope: "",
      })
    }

    gapi.load("client:auth2", initClient)
  }, [])

  const onSuccess = async (res: any) => {
    console.log("success:", res)
    try {
      const payload = {
        googleid: res.googleId,
        name: res.profileObj.name,
        email: res.profileObj.email,
      }
      const response = await addUser(payload)
      if (response.data.exists) {
        console.log("User already exists.")
      } else {
        console.log("New user created.")
      }
      setAccessToken(response.data.accessToken)
      setRefreshToken(response.data.refreshToken)
      setUserProfile(res.profileObj)
      navigate("/")
    } catch (error) {
      console.error("Error adding or checking user:", error)
    }
  }

  return (
    <LoginContainer>
      <Typography variant="h1" color={"primary"} textAlign={"center"}>
        Welcome To TicTacToe!
      </Typography>
      <GoogleLogin
        clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}
        buttonText="Login With Google Account"
        onSuccess={onSuccess}
        onFailure={() => {
          console.log("Login Failed")
        }}
        cookiePolicy="single_host_origin"
        isSignedIn={true}
        render={(renderProps) => (
          <Button
            variant="contained"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            startIcon={<GoogleIcon />}
            endIcon={<LogoutRoundedIcon />}
            sx={{ py: 1, px: 3, borderRadius: 50 }}
          >
            Login With Google Account
          </Button>
        )}
      />
      <Typography color={"primary.main"} textAlign={"center"}>
        Please Login In With Your Google Account To Start The Game.
      </Typography>
    </LoginContainer>
  )
}
