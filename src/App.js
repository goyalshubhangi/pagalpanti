import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material"
import Login from "./pages/Login"
import Todo from "./pages/Todo"
import NotFound from "./pages/NotFound"
import Signup from "./pages/Signup"
import { useAuth } from "./contexts/AuthProvider"
import Account from "./pages/Account"
import Report from "./pages/Report"

function App() {
  const { currentUser } = useAuth()
  const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        `,
      },
    },
    typography: {
      fontFamily: "Lato",
    },
    palette: {
      primary: {
        main: "#8684f3",
        dark: "#6962e6",
        light: "#7367F0",
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to={currentUser ? "/todo/Dashboard" : "/login"} />
          </Route>
          {/* <Route path="/todo" component={Todo} /> */}
          <Route path="/todo/:tab" component={Todo} />
          <Route path="/reports/:period" component={Report} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/account" component={Account} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>

    </ThemeProvider>
  )
}

export default App
