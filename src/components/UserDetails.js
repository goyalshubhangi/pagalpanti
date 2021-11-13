import { Container, Grid, Paper, Link, Typography } from "@mui/material";

export default function UserDetails({ loading, userDetails, currentUser }) {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 2 }}>
      <Paper
        square={true}
        elevation={3}
        sx={{
          bgcolor: "#6962e6",
          color: "#fff",
          textAlign: "center",
          fontSize: 20,
          p: 3
        }}
      >Account Details</Paper>
      <Paper square={true} elevation={3}>
        {
          loading || !userDetails ? (
            <div style={{ padding: 40 }}>Loading...</div>
          ) : (
            <>
              <Grid container sx={{ p: 3 }}>
                <Grid item xs={5.5}>Email</Grid>
                <Grid item xs={5.5}>{userDetails.email}</Grid>
                <Grid item xs={1}>
                  {!currentUser.emailVerified ? (
                    <Link>Verify</Link>
                  ) : ''}
                </Grid>
              </Grid>

              <Grid container sx={{ p: 3 }}>
                <Grid item xs={5.5}>Name</Grid>
                <Grid item xs={5.5}>{userDetails.name}</Grid>
                <Grid item xs={1}>
                  <Link>Edit</Link>
                </Grid>
              </Grid>

              <Grid container sx={{ p: 3 }}>
                <Grid item xs={5.5}>Phone Number</Grid>
                <Grid item xs={5.5}>{userDetails.phone}</Grid>
                <Grid item xs={1}>
                  <Link>Edit</Link>
                </Grid>
              </Grid>

              <Grid container sx={{ p: 3 }}>
                <Grid item xs={5.5}>Password</Grid>
                <Grid item xs={5.5}>************</Grid>
                <Grid item xs={1}>
                  <Link>Change</Link>
                </Grid>
              </Grid>
            </>
          )
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
    </Container>
  )
}
