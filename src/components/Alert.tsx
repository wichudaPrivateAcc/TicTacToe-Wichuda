import {
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material"
import { useContext } from "react"
import { AlertContext } from "../context/AlertContext"

export default function Alert() {
  const {
    handleClose,
    modal: { open, isSuccess, title, message, isWarning },
  } = useContext(AlertContext)

  return (
    <Dialog open={open} maxWidth="xs" fullWidth onClose={handleClose}>
      <DialogTitle>
        <IconButton
          onClick={() => handleClose()}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
          }}
        >
          x
        </IconButton>
      </DialogTitle>
      <Grid
        container
        direction="column"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 5,
          px: 2,
          textAlign: "center",
        }}
      >
        <Grid item>x</Grid>

        {isWarning ? (
          <>
            <Grid item>
              <Typography color="text.primary" variant="h6">
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" color="info.dark">
                {message}
              </Typography>
            </Grid>
          </>
        ) : (
          <>
            <Grid item>
              <Typography
                color={isSuccess ? "success.main" : "error.main"}
                variant="h5"
              >
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="info.dark">{message}</Typography>
            </Grid>
          </>
        )}
      </Grid>
    </Dialog>
  )
}
