import { Grid, Typography } from "@mui/material"
import React from "react"

interface Props {
  score: number
  consecutiveWin: number
  isXNext: boolean
  winner?: any
}

export default function GameHeader(props: Props) {
  const { score, consecutiveWin, isXNext, winner } = props
  return (
    <Grid container py={2}>
      <Grid item flex={1}>
        <Typography variant="h6">Total Scores: {score}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3" color={"secondary.main"}>
          {winner
            ? `Winner: ${winner === "X" ? "You win!" : "Bot Win!"}`
            : `${isXNext ? "Your Turn!" : "Bot Turn!"}`}
        </Typography>
      </Grid>
      <Grid item flex={1}>
        <Typography variant="h6">
          Consecutive Wins: {consecutiveWin} Times.
        </Typography>
      </Grid>
    </Grid>
  )
}
