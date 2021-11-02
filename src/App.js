import { BrowserRouter, Switch, Route } from "react-router-dom"
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material"
import Login from "./pages/Login"
import Todo from "./pages/Todo"
import NotFound from "./pages/NotFound"
import Signup from "./pages/Signup"
import { AuthProvider } from "./contexts/AuthProvider"

function App() {
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
			<CssBaseline />

			<AuthProvider>
				<BrowserRouter>
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={Signup} />
						<Route path="/todo" component={Todo} />
						<Route component={NotFound} />
					</Switch>
				</BrowserRouter>
			</AuthProvider>

		</ThemeProvider>
	)
}

export default App
