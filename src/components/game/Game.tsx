import { Box } from "@mui/material"
import React, { useEffect, useState } from "react"
import { calculateWinner } from "../../utils/calculateWinner"
import { useUser } from "../../context/AuthContext"
import { getUserData, updateUserScore } from "../../api/users"
import dayjs from "dayjs"
import GameHeader from "./GameHeader"
import GameContent from "./GameContent"
import GameFooter from "./GameFooter"
import { useAlert } from "../../context/AlertContext"
import GameBox from "./GameBox"

const initialBoard = Array(9).fill(null)

export default function Game() {
  const { userProfile } = useUser()

  const [board, setBoard] = useState<string[]>(initialBoard)
  const [isXNext, setIsXNext] = useState<boolean>(true)
  const [winner, setWinner] = useState<string | null>(null)

  const [userScore, setUserScore] = useState<UserData | null>(null)
  const isBoardFull = (board: string[]) => board.every((cell) => cell !== null)
  const { handleOpen } = useAlert()

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
      await updateUserScore(payload)
    } catch (error) {
      console.log("Error:", error)
    }
  }

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
        newScore += 1
        newConsecutiveWins = 0
      }
    } else {
      newScore -= 1
      newConsecutiveWins = 0
    }

    await updateScoreFromApi(
      newScore,
      newConsecutiveWins,
      winner === "X" ? true : false,
    )
  }

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

  useEffect(() => {
    if (winner || isBoardFull(board)) {
      handleOpen({
        open: true,
        title: winner
          ? winner === "X"
            ? "Congratulation! You are the winner."
            : "Sorry, You Lost.."
          : "The Board Is Full.",
        isWinner: winner === "X",
      })

      const timer = setTimeout(() => {
        handleRestart()
        if (winner) getUserScore()
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [winner, board])

  return (
    <Box textAlign={"center"}>
      <GameHeader
        score={userScore?.score}
        consecutiveWin={userScore?.consecutiveWins}
        isXNext={isXNext}
        winner={winner}
      />
      <GameContent isXNext={isXNext}>
        <GameBox board={board} handleClick={handleClick} />
        <GameFooter onReset={handleRestart} />
      </GameContent>
    </Box>
  )
}
