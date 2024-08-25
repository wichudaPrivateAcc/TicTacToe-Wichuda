import { createContext, useState } from "react"
import Alert from "../components/Alert"

interface AlertContextType {
  handleClose: () => void
  handleOpen: (obj: Modal) => void
  modal: Modal
}

interface Modal {
  open: boolean
  title: string
  message: string
  isSuccess: boolean
  isWarning?: boolean
}

const initModal: Modal = {
  open: false,
  title: "",
  message: "",
  isSuccess: false,
  isWarning: false,
}

export const AlertContext = createContext<AlertContextType>({
  modal: initModal,
  handleClose: () => {},
  handleOpen: () => {},
})

export const AlertProvider = ({ children }) => {
  const [modal, setModal] = useState<Modal>({ ...initModal })

  const handleOpen = (obj: Modal) => {
    setModal(obj)
    setTimeout(() => {
      handleClose()
    }, 3000)
  }

  const handleClose = () => {
    setModal((prev) => ({ ...prev, open: false }))
  }

  return (
    <AlertContext.Provider value={{ modal, handleClose, handleOpen }}>
      {children}
      <Alert />
    </AlertContext.Provider>
  )
}
