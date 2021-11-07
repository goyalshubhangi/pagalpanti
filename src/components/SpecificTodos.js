import { useState } from "react";
import { Add } from "@mui/icons-material";
import { Container, Fab, Grid, Paper, Link, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { ref, push, set } from "firebase/database"
import { db } from "../utils/firebase"

export default function SpecificTodos({ todos }) {
	const [open, setOpen] = useState(false)
	const [taskName, setTaskName] = useState('')
	const saveTask = () => {
		if (taskName.trim() !== '') {
			const todos = ref(db, 'todo')
			const list = push(todos)
			set(list, {
				createdAt: new Date().toISOString(),
				details: taskName,
				status: 'pending'
			})
			setTaskName('')
			setOpen(false)
		}
	}

	return (
		<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
			<Paper
				square={true}
				elevation={3}
				sx={{
					p: 2,
					// display: "flex",
					// flexDirection: "column",
					// height: "calc(100vh - 200px)",
				}}
			>
				<Grid container>
					<Grid item xs={12} md={4}>
						Task
					</Grid>
					<Grid item xs={12} md={2}>
						Assigned to
					</Grid>
					<Grid item xs={12} md={1}>
						P
					</Grid>
					<Grid item xs={12} md={1}>
						UR
					</Grid>
					<Grid item xs={12} md={1}>
						D
					</Grid>
					<Grid item xs={12} md={1}>
						C
					</Grid>
					<Grid item xs={12} md={2}>
						Remarks
					</Grid>
				</Grid>

				{
					todos.map(todo => {
						return (
							<Grid container key={todo.key}>
								<Grid item xs={12} md={4}>
									{todo.details}
								</Grid>
								<Grid item xs={12} md={2}>
									{todo.assignedTo}
								</Grid>
								<Grid item xs={12} md={1}>
									P
								</Grid>
								<Grid item xs={12} md={1}>
									UR
								</Grid>
								<Grid item xs={12} md={1}>
									D
								</Grid>
								<Grid item xs={12} md={1}>
									C
								</Grid>
								<Grid item xs={12} md={2}>
									Remarks
								</Grid>
							</Grid>
						)
					})
				}
			</Paper>

			<Grid sx={{ pt: 4 }}>
				<Typography variant="body2" color="text.secondary" align="center">
					{"Copyright © "}
					<Link color="inherit" href="https://mui.com/">
						YelloDrive
					</Link>{" "}
					{new Date().getFullYear()}
					{"."}
				</Typography>
			</Grid>

			<Fab
				color='secondary'
				onClick={() => setOpen(true)}
				sx={{
					position: 'fixed',
					right: 20,
					bottom: 20
				}}>
				<Add />
			</Fab>

			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Add a task</DialogTitle>
				<DialogContent sx={{ width: 500, maxWidth: '100%' }}>
					<TextField
						label='Task title'
						type='text'
						margin='normal'
						value={taskName}
						onChange={e => setTaskName(e.target.value)}
						fullWidth
						autoFocus
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={saveTask}>SAVE</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
}
