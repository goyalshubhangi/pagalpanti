import { Container, Grid, Paper, Link, Typography } from "@mui/material";

export default function All() {
	return (
		<Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
			<Grid container spacing={3}>
				<Grid item xs={12} md={4}>
					<Paper
						square={true}
						elevation={3}
						sx={{
							p: 2,
							display: "flex",
							flexDirection: "column",
							height: "calc(100vh - 200px)",
						}}
					>
						asdh asd
					</Paper>
				</Grid>
				<Grid item xs={12} md={4}>
					<Paper
						square={true}
						elevation={3}
						sx={{
							p: 2,
							display: "flex",
							flexDirection: "column",
							height: "calc(100vh - 200px)",
						}}
					>
						asdh asd
					</Paper>
				</Grid>
				<Grid item xs={12} md={4}>
					<Paper
						square={true}
						elevation={3}
						sx={{
							p: 2,
							display: "flex",
							flexDirection: "column",
							height: "calc(100vh - 200px)",
						}}
					>
						asdh asd
					</Paper>
				</Grid>
			</Grid>

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
		</Container>
	);
}
