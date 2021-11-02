import { Container, Grid, Paper, Link, Typography } from "@mui/material";

export default function All() {
	return (
		<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
			<Grid container spacing={3}>
				{/* Chart */}
				<Grid item xs={12} md={6} lg={4}>
					<Paper
						sx={{
							p: 2,
							display: "flex",
							flexDirection: "column",
							height: 240,
						}}
					></Paper>
				</Grid>
				<Grid item xs={12} md={6} lg={4}>
					<Paper
						sx={{
							p: 2,
							display: "flex",
							flexDirection: "column",
							height: 240,
						}}
					></Paper>
				</Grid>
				{/* Recent Deposits */}
				<Grid item xs={12} md={6} lg={4}>
					<Paper
						sx={{
							p: 2,
							display: "flex",
							flexDirection: "column",
							height: 240,
						}}
					></Paper>
				</Grid>
				{/* Recent Orders */}
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
