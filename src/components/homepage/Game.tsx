import { Box, Button, Grid, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { calculateWinner } from "../../utils/calculateWinner"
import { useUser } from "../../context/AuthContext"
import { getUserData, updateUserScore } from "../../api/users"
import dayjs from "dayjs"
import GameHeader from "./GameHeader"
import GameContent from "./GameContent"
import GameFooter from "./GameFooter"

const initialBoard = Array(9).fill(null)

type UserData = {
  consecutiveWins: number
  score: number
  email: string
  googleid: string
}

export default function Game() {
  const { userProfile } = useUser()

  const [board, setBoard] = useState<string[]>(initialBoard)
  const [isXNext, setIsXNext] = useState<boolean>(true)
  const [winner, setWinner] = useState<string | null>(null)

  const updateScoreFromApi = async (
    scoreUpdate: number,
    newConsecutiveWins: number,
    isXWin: boolean,
  ) => {
    try {
      const gameLog = {
        date: dayjs().toISOString(),
        isWin: isXWin,
      }
      const payload = {
        googleid: userProfile.googleId,
        newScore: scoreUpdate,
        consecutiveWins: newConsecutiveWins,
        gameHistoryLog: [gameLog],
      }
      const res = await updateUserScore(payload)
      console.log(res)
    } catch (error) {
      console.log("Error:", error)
    }
  }

  const [userScore, setUserScore] = useState<UserData>(null)

  const isBoardFull = (board: string[]) => board.every((cell) => cell !== null)

  const handleClick = (index: number) => {
    if (board[index] || winner) return

    const newBoard = board.slice()
    newBoard[index] = isXNext ? "X" : "O"
    setBoard(newBoard)
    setIsXNext(!isXNext)

    const newWinner = calculateWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      updateScore(newWinner)
    }
  }

  const updateScore = async (winner: string) => {
    let newScore = userScore?.score
    let newConsecutiveWins = userScore?.consecutiveWins

    if (winner === "X") {
      newScore += 1
      newConsecutiveWins += 1

      if (newConsecutiveWins >= 3) {
        newScore += 1 // เพิ่มคะแนนพิเศษ
        newConsecutiveWins = 0 // รีเซ็ต consecutiveWins
      }
    } else {
      newScore -= 1
      newConsecutiveWins = 0 // รีเซ็ต consecutiveWins
    }
    // เรียกใช้ API เพื่ออัปเดตคะแนน
    await updateScoreFromApi(
      newScore,
      newConsecutiveWins,
      winner === "X" ? true : false,
    )
  }

  const renderSquare = (index: number) => (
    <Button
      fullWidth
      variant={board[index] ? "contained" : "outlined"}
      sx={{ fontSize: 100, height: 180, borderRadius: 8 }}
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </Button>
  )

  const botMove = () => {
    const availableMoves = board
      .map((value, index) => (value === null ? index : null))
      .filter((index: number) => index !== null)

    const move =
      availableMoves[Math.floor(Math.random() * availableMoves.length)]

    if (move !== undefined) {
      const newBoard = board.slice()
      newBoard[move] = "O"
      setBoard(newBoard)
      setIsXNext(true)

      const newWinner = calculateWinner(newBoard)
      if (newWinner) {
        setWinner(newWinner)
        updateScore(newWinner)
      }
    }
  }

  const handleRestart = () => {
    setBoard(initialBoard)
    setIsXNext(true)
    setWinner(null)
  }

  useEffect(() => {
    if (!isXNext && !winner) {
      const timer = setTimeout(() => {
        botMove()
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [board, isXNext, winner])

  useEffect(() => {
    if (winner) {
      const timer = setTimeout(() => {
        handleRestart()
        getUserScore()
      }, 1000)
      return () => clearTimeout(timer)
    } else if (isBoardFull(board)) {
      const timer = setTimeout(() => {
        handleRestart()
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [winner, board])

  const getUserScore = async () => {
    try {
      const res = await getUserData(userProfile.googleId)
      setUserScore(res)
    } catch (error) {
      console.log("Error:", error)
    }
  }

  useEffect(() => {
    getUserScore()
  }, [])

  if (!userProfile) {
    return (
      <Typography variant="h4" textAlign={"center"}>
        Please Login To Start The Game.
      </Typography>
    )
  }

  return (
    <Box textAlign={"center"}>
      <GameHeader
        score={userScore?.score}
        consecutiveWin={userScore?.consecutiveWins}
        isXNext={isXNext}
        winner={winner}
      />
      <GameContent isXNext={isXNext}>
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
        <GameFooter onReset={handleRestart} />
      </GameContent>
    </Box>
  )
}
