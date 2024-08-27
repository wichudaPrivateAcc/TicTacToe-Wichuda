import { Box, Button, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function PageNotFound() {
  const navigate = useNavigate()
  return (
    <Stack direction={"column"} textAlign={"center"}>
      <Typography
        fontSize={{ xs: 100, sm: 200, lg: 250 }}
        fontWeight={700}
        color={"primary"}
        sx={{ opacity: 0.2 }}
      >
        404
      </Typography>
      <Typography variant="h2" color={"primary"}>
        Page Not Found
      </Typography>
      <Box mt={2}>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ borderRadius: 50 }}
        >
          Go to homepage
        </Button>
      </Box>
    </Stack>
  )
}
