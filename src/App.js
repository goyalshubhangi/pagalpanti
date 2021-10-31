import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import Login from "./components/Login";
import Todo from "./components/Todo";
import NotFound from "./components/NotFound";
import Signup from "./components/Signup";

function App() {
  const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: `
        `,
      },
    },
    palette: {
      primary: {
        main: "#8684f3",
        dark: "#6962e6",
        light: "#7367F0",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/todo" exact>
            <Todo />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
