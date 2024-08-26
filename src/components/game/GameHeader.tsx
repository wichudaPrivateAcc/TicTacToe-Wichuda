import { Grid, Typography } from "@mui/material"

interface Props {
  score: number
  consecutiveWin: number
  isXNext: boolean
  winner?: any
}

export default function GameHeader(props: Props) {
  const { score, consecutiveWin, isXNext, winner } = props
  return (
    <Grid
      container
      py={2}
      flexDirection={{ xs: "column", sm: "row" }}
      display={"flex"}
      alignItems={"center"}
    >
      <Grid item xs={12} sm={3} order={{ xs: 2, sm: 1 }}>
        <Typography variant="h6">Total Scores: {score}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} order={{ xs: 1, sm: 2 }}>
        <Typography variant="h3" color={"primary.main"}>
          {winner
            ? `Winner: ${winner === "X" ? "You win!" : "Bot Win!"}`
            : `${isXNext ? "Your Turn!" : "Bot Turn!"}`}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={3} order={{ xs: 3, sm: 3 }}>
        <Typography variant="h6">
          Consecutive Wins: {consecutiveWin} Times.
        </Typography>
      </Grid>
    </Grid>
  )
}
