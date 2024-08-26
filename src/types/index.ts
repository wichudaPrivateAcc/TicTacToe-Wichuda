type UpdatePayload = {
  googleid: string
  newScore: number
  consecutiveWins: number
  gameHistoryLog: { date: any; isWin: boolean }[]
}

type AddUserPayload = {
  googleid: string
  name: string
  email: string
}

interface UserContextType {
  userProfile: any
  setUserProfile: React.Dispatch<React.SetStateAction<any>>
  logout: () => void
}

type UserData = {
  consecutiveWins: number
  score: number
  email: string
  googleid: string
}

interface AlertContextType {
  handleClose: () => void
  handleOpen: (obj: Modal) => void
  modal: Modal
}

interface Modal {
  open: boolean
  title: string
  isWinner: boolean
}
