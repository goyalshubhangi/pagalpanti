import { useEffect, useRef, useState } from "react"
import { Box, Button, CssBaseline, Grid, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material"
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useHistory } from "react-router"
import { useAuth } from "../contexts/AuthProvider"
import BACKGROUND from '../img/background.jpg'

export default function Login({ setAuthtoken }) {
	const [errors, setErrors] = useState({})
	const [email, setEmail] = useState("")
	const [pass, setPass] = useState("")
	const [loading, setLoading] = useState(false)
	const [showPass, setShowPass] = useState(false)
	const emailRef = useRef(null)
	const passRef = useRef(null)
	const history = useHistory()
	const { currentUser, logIn } = useAuth()

	useEffect(() => {
		if (currentUser) history.replace('/todo/Dashboard')
		// eslint-disable-next-line
	}, [currentUser])

	const togglePassMask = () => {
		setShowPass(!showPass)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (email.trim() === "") {
			setErrors({ email: "Email cannot be empty" })
			emailRef.current.focus()
			return
		} else {
			const re =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			if (!re.test(String(email).toLowerCase())) {
				setErrors({ email: "Invalid email" })
				emailRef.current.focus()
				return
			}
		}

		if (pass.trim() === "") {
			setErrors({ pass: "Passwords cannot be empty" })
			passRef.current.focus()
			return
		} else if (String(pass).length < 8) {
			setErrors({ pass: "Invalid password" })
			passRef.current.focus()
			return
		}

		setErrors({})
		setLoading(true)
		await logIn(email, pass)
			.then((userCredential) => {
				console.log('Login successful')
			})
			.catch((error) => {
				console.log(error)
				alert(error.message)
			})
			.finally(() => setLoading(false))
	}

	return (
		<Grid
			component="main"
			container
			style={{
				height: "100%",
			}}
		>
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: `url(${BACKGROUND})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "contain",
					backgroundPosition: "center",
				}}
			/>

			<Grid
				item
				xs={12}
				sm={8}
				md={5}
				elevation={6}
				square
				sx={{
					display: "flex",
					flexWrap: "wrap",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					{/* <Avatar
						sx={{ m: 1, height: 75, width: 75 }}
						src="https://avatars.githubusercontent.com/faisalakhtar?size=75"
						alt=""
					/> */}
					<Typography component="h1" variant="h4" sx={{ color: "#8e84f3" }}>
						Log In
					</Typography>

					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							label="Email Address"
							type="email"
							id="email"
							name="email"
							autoComplete="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							error={errors.email !== undefined}
							helperText={errors.email}
							inputRef={emailRef}
							fullWidth
							required
							autoFocus
						/>
						<TextField
							margin="normal"
							label="Password"
							type={showPass ? "text" : "password"}
							id="password"
							name="password"
							autoComplete="current-password"
							value={pass}
							onChange={(e) => setPass(e.target.value)}
							error={errors.pass !== undefined}
							helperText={errors.pass}
							inputRef={passRef}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton style={{ cursor: 'pointer' }} onClick={togglePassMask} >
											{showPass ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								)
							}}
							fullWidth
							required
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2, }}
							disabled={loading}
						>
							Log In
						</Button>

						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>

							<Grid item>
								<Link href="/signup" variant="body2">
									New User? Sign Up
								</Link>
							</Grid>
						</Grid>

						<Typography
							sx={{ mt: 5 }}
							variant="body2"
							color="text.secondary"
							align="center"
						>
							{"Copyright © "}
							<Link color="inherit" href="#">
								Yellodrive
							</Link>{" "}
							{new Date().getFullYear()}
						</Typography>
					</Box>
				</Box>
			</Grid>
		</Grid>
	)
}
