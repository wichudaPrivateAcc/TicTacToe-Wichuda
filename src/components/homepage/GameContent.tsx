import { Grid } from "@mui/material"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import PanoramaFishEyeRoundedIcon from "@mui/icons-material/PanoramaFishEyeRounded"

export default function GameContent({
  isXNext,
  children,
}: {
  isXNext: boolean
  children: any
}) {
  return (
    <Grid container>
      <Grid
        item
        flex={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <CloseRoundedIcon
          sx={{
            fontSize: 330,
            opacity: isXNext ? 1 : 0.1,
            color: "primary.main",
          }}
        />
      </Grid>
      <Grid item xs={6} px={4}>
        {children}
      </Grid>
      <Grid
        item
        flex={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <PanoramaFishEyeRoundedIcon
          sx={{
            fontSize: 250,
            opacity: !isXNext ? 1 : 0.1,
            color: "primary.main",
          }}
        />
      </Grid>
    </Grid>
  )
}
