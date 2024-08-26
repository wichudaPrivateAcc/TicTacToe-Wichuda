import "./App.css"
import Router from "./components/router/Router"
import CssBaseline from "@mui/material/CssBaseline"
import theme from "./theme"
import { ThemeProvider } from "@mui/material"
import { UserProvider } from "./context/AuthContext"
import { AlertProvider } from "./context/AlertContext"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AlertProvider>
        <CssBaseline />
        <UserProvider>
          <Router />
        </UserProvider>
      </AlertProvider>
    </ThemeProvider>
  )
}

export default App
