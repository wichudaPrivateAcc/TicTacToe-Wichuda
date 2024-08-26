import { Button, Grid } from "@mui/material"

interface Props {
  board: string[]
  handleClick: Function
}

export default function GameBox(props: Props) {
  const { board, handleClick } = props

  const renderSquare = (index: number) => (
    <Button
      fullWidth
      variant={board[index] ? "contained" : "outlined"}
      sx={{
        fontSize: { xs: 80, sm: 100, md: 100, lg: 80 },
        height: { xs: 100, sm: 130, md: 180, lg: 140 },
        borderRadius: { xs: 4, sm: 6 },
      }}
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </Button>
  )

  return (
    <>
      <Grid container justifyContent="center">
        {[0, 1, 2].map((index) => (
          <Grid
            item
            key={index}
            xs={4}
            p={2}
            sx={{
              borderRight: index !== 2 ? "2px solid" : "none",
              borderBottom: "2px solid",
              borderColor: "primary.main",
            }}
          >
            {renderSquare(index)}
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center">
        {[3, 4, 5].map((index) => (
          <Grid
            item
            key={index}
            xs={4}
            p={2}
            sx={{
              borderRight: index !== 5 ? "2px solid" : "none",
              borderBottom: "2px solid",
              borderColor: "primary.main",
            }}
          >
            {renderSquare(index)}
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent="center">
        {[6, 7, 8].map((index) => (
          <Grid
            item
            key={index}
            xs={4}
            p={2}
            sx={{
              borderRight: index !== 8 ? "2px solid" : "none",
              borderColor: "primary.main",
            }}
          >
            {renderSquare(index)}
          </Grid>
        ))}
      </Grid>
    </>
  )
}
