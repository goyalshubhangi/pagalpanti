import { useEffect, useRef, useState } from "react"
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useHistory } from "react-router"
import { useAuth } from "../contexts/AuthProvider"

export default function Signup({ setAuthtoken }) {
	const [errors, setErrors] = useState({})
	const [email, setEmail] = useState("")
	const [pass, setPass] = useState("")
	const [name, setName] = useState("")
	const [contact, setContact] = useState("")
	const [loading, setLoading] = useState(false)
	const emailRef = useRef(null)
	const passRef = useRef(null)
	const contactRef = useRef(null)
	const history = useHistory()
	const { currentUser, signUp } = useAuth()

	useEffect(() => {
		if (currentUser) history.replace('/todo')
		// eslint-disable-next-line
	}, [currentUser])

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
		} else {
			if (String(pass).length < 8) {
				setErrors({ pass: "Invalid password" })
				passRef.current.focus()
				return
			}
		}

		setErrors({})
		setLoading(true)
		await signUp(email, pass)
			.then((userCredential) => {
				console.log(userCredential.user)
				history.push('/todo')
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
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: "url(/To_do_list.jpg)",
					backgroundRepeat: "no-repeat",
					backgroundColor: (t) => t.palette.grey[900],
					backgroundSize: "cover",
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
					height: "100%",
					overflow: "auto",
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
					<Typography component="h1" variant="h4" color="primary">
						Sign Up
					</Typography>

					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							label="Name"
							type="name"
							id="name"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							fullWidth
							required
							autoFocus
						/>

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
						/>
						<TextField
							margin="normal"
							label="Phone Number"
							type="tel"
							id="contact"
							name="contact"
							value={contact}
							onChange={(e) => setContact(e.target.value)}
							error={errors.contact !== undefined}
							helperText={errors.contact}
							inputRef={contactRef}
							fullWidth
							required
						/>
						<TextField
							margin="normal"
							label="Password"
							type="password"
							id="password"
							name="password"
							autoComplete="current-password"
							value={pass}
							onChange={(e) => setPass(e.target.value)}
							error={errors.pass !== undefined}
							helperText={errors.pass}
							inputRef={passRef}
							fullWidth
							required
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							disabled={loading}
						>
							Sign Up
						</Button>

						<Grid container>
							<Grid item>
								<Link href="/login" variant="body2">
									Sign In
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
								YelloDrive
							</Link>{" "}
							{new Date().getFullYear()}
						</Typography>
					</Box>
				</Box>
			</Grid>
		</Grid>
	)
}
