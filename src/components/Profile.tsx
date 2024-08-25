import {
  Typography,
  Avatar,
  Grid,
  List,
  ListItemText,
  ListItem,
  Box,
  ListItemIcon,
  Button,
  Stack,
} from "@mui/material"
import { useUser } from "../context/AuthContext"
import { getUserData } from "../api/users"
import { useEffect, useState } from "react"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import GppBadIcon from "@mui/icons-material/GppBad"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"

export default function Profile() {
  const { userProfile } = useUser()
  const [userData, setUserData] = useState<any>(null)
  const navigate = useNavigate()

  const getUserScore = async () => {
    try {
      const res = await getUserData(userProfile.googleId)
      setUserData(res)
    } catch (error) {
      console.log("Error:", error)
    }
  }

  useEffect(() => {
    getUserScore()
  }, [])

  return (
    <Grid container flexDirection={"column"} gap={2}>
      {userProfile && (
        <>
          <Typography textAlign="center" variant="h1">
            {userProfile.name}
          </Typography>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={6}
              display={"flex"}
              alignItems={"center"}
              flexDirection={"column"}
              gap={2}
              py={2}
            >
              <Avatar
                alt={userProfile.name}
                src={userProfile.imageUrl}
                sx={{ width: 200, height: 200, marginBottom: 2 }}
              />
              <Typography variant="h5">Name: {userProfile.name}</Typography>
              <Typography variant="h5">Email: {userProfile.email}</Typography>
              <Button
                variant="contained"
                color="secondary"
                sx={{ borderRadius: 5 }}
                onClick={() => navigate("/")}
              >
                Play Game!
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"flex-start"}
              gap={2}
              py={2}
            >
              <Typography variant="h5">
                Current Scores: {userData?.score}
              </Typography>
              <Typography variant="h5">
                Consecutive Win Now: {userData?.consecutiveWins}
              </Typography>
              <Stack direction={"row"} spacing={2}>
                <Typography>
                  Total Wins:{" "}
                  {
                    userData?.gameHistoryLog?.filter((item: any) => item.isWin)
                      .length
                  }
                </Typography>
                <Typography>
                  Total Loses:{" "}
                  {
                    userData?.gameHistoryLog?.filter((item: any) => !item.isWin)
                      .length
                  }
                </Typography>
              </Stack>
              <Box sx={{ p: 2, borderRadius: 4, bgcolor: "background.paper" }}>
                <Typography variant="h6">Game History</Typography>
                {userData?.gameHistoryLog?.length > 0 ? (
                  <List>
                    {userData.gameHistoryLog.map((log: any, index: number) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          {log.isWin ? (
                            <EmojiEventsIcon
                              fontSize="large"
                              sx={{ color: "primary.main" }}
                            />
                          ) : (
                            <GppBadIcon
                              fontSize="large"
                              sx={{ color: "error.main" }}
                            />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={`Date: ${dayjs(log.date).format(
                            "YYYY-MM-DD HH:mm:ss",
                          )}`}
                          secondary={`Result: ${
                            log.isWin ? "Winner" : "Loser"
                          }`}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography>Not Found Game History</Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  )
}
