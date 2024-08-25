import { Grid } from "@mui/material"
import ImageComponent from "./ImageComponent"

export default function LoginContainer({ children }) {
  return (
    <Grid
      container
      sx={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        position: "relative",
      }}
      px={{ xs: 2, sm: 0 }}
    >
      <Grid
        item
        xs={12}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.5,
          // display: { xs: "none", sm: "block" },
        }}
      >
        <ImageComponent fileName="image1" />
      </Grid>
      <Grid
        item
        xs={12}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        gap={3}
        sx={{ zIndex: 1 }}
      >
        {children}
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          opacity: 0.5,
          // display: { xs: "none", sm: "block" },
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <ImageComponent fileName="image2" />
      </Grid>
    </Grid>
  )
}
