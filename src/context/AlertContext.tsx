import { createContext, useContext, useState } from "react"
import Alert from "../components/common/Alert"

const initModal: Modal = {
  open: false,
  title: "",
  isWinner: false,
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
    // setTimeout(() => {
    //   handleClose()
    // }, 10000)
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

export const useAlert = () => {
  const context = useContext(AlertContext)
  return context
}
