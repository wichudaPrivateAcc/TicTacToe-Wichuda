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
  login: (res: any) => void
}
