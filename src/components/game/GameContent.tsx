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
    <Grid
      container
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"row"}
    >
      <Grid
        item
        xs={3}
        display={{ xs: "none", sm: "none", md: "none", lg: "flex" }}
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
      <Grid item xs={12} sm={10} md={8} lg={6} px={{ xs: 0, lg: 10 }}>
        {children}
      </Grid>
      <Grid
        item
        xs={3}
        flex={1}
        display={{ xs: "none", sm: "none", md: "none", lg: "flex" }}
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
