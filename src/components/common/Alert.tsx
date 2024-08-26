import {
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material"
import { useAlert } from "../../context/AlertContext"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import GppBadIcon from "@mui/icons-material/GppBad"

export default function Alert() {
  const {
    handleClose,
    modal: { open, isWinner, title },
  } = useAlert()

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogTitle>
        <IconButton
          onClick={() => handleClose()}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
          }}
        >
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <Grid
        container
        direction="column"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          pt: 2,
          px: 2,
          pb: 4,
        }}
      >
        {isWinner ? (
          <EmojiEventsIcon sx={{ color: "primary.main", fontSize: 150 }} />
        ) : (
          <GppBadIcon sx={{ color: "error.main", fontSize: 150 }} />
        )}
        <Grid item>
          <Typography
            variant="h5"
            color={isWinner ? "primary.main" : "error.main"}
          >
            {title}
          </Typography>
        </Grid>
      </Grid>
    </Dialog>
  )
}
