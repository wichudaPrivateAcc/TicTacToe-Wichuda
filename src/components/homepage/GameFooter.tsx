import { Button, Grid } from "@mui/material"
import HistoryToggleOffRoundedIcon from "@mui/icons-material/HistoryToggleOffRounded"
import SyncRoundedIcon from "@mui/icons-material/SyncRounded"
import { useNavigate } from "react-router-dom"

export default function GameFooter({ onReset }: { onReset: Function }) {
  const navigate = useNavigate()
  return (
    <Grid container justifyContent={"space-between"}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onReset()}
        sx={{ marginTop: 5, borderRadius: 5 }}
        startIcon={<SyncRoundedIcon />}
      >
        Restart Game
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/profile")}
        sx={{ marginTop: 5, borderRadius: 5 }}
        startIcon={<HistoryToggleOffRoundedIcon />}
      >
        View History
      </Button>
    </Grid>
  )
}
