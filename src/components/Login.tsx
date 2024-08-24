import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Typography } from "@mui/material"
import { gapi } from "gapi-script"
import GoogleLogin from "react-google-login"
import { useUser } from "../context/AuthContext"
import { addUser } from "../api/users"

export default function Login() {
  const navigate = useNavigate()
  const { setUserProfile, userProfile } = useUser()

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
    setUserProfile(res.profileObj)

    try {
      const payload = {
        googleid: res.profileObj.googleId,
        name: res.profileObj.name,
        email: res.profileObj.email,
      }
      const response = await addUser(payload)
      if (response.data.exists) {
        console.log("User already exists.")
      } else {
        console.log("New user created.")
      }

      navigate("/")
    } catch (error) {
      console.error("Error adding or checking user:", error)
    }
  }

  const onError = (res: any) => {
    console.log("failed:", res)
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <Typography variant="h1" color={"primary"}>
        Welcome To TicTacToe!
      </Typography>
      <GoogleLogin
        clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}
        buttonText="Login With Google Account"
        onSuccess={onSuccess}
        onFailure={onError}
        cookiePolicy="single_host_origin"
        isSignedIn={true}
      />
    </Container>
  )
}
