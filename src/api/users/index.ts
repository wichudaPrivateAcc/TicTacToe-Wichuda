import { axiosInstance } from ".."

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

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้
export const getUserData = async (googleid: string) => {
  try {
    const response = await axiosInstance.get(`users/${googleid}`)
    return response.data
  } catch (error) {
    console.error("Error fetching user data", error)
  }
}

// ฟังก์ชันสำหรับอัปเดตคะแนน
export const updateUserScore = async (payload: UpdatePayload) => {
  try {
    const res = await axiosInstance.put(`users/${payload.googleid}`, {
      score: payload.newScore,
      consecutiveWins: payload.consecutiveWins,
      gameHistoryLog: payload.gameHistoryLog,
    })
    return res
  } catch (error) {
    console.error("Error updating score", error)
  }
}

// เพิ่มผู้ใช้ใหม่
export const addUser = async (payload: AddUserPayload) => {
  console.log(payload)
  try {
    const res = await axiosInstance.post(`users/${payload.googleid}`, {
      googleid: payload.googleid,
      name: name,
      email: payload.email,
    })
    return res
  } catch (error) {
    console.error("Error updating user", error)
  }
}
