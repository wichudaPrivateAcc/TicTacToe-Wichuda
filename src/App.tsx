import "./App.css"
import Router from "./components/router/Router"
import CssBaseline from "@mui/material/CssBaseline"
import theme from "./theme"
import { ThemeProvider } from "@mui/material"
import { UserProvider } from "./context/AuthContext"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <Router />
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
