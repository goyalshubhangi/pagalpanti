import { Container, Grid, Paper, Link, Typography } from "@mui/material";

export default function SpecificTodos({ todos, loading }) {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper
        square={true}
        elevation={3}
        sx={{
          bgcolor: "#6962e6",
          color: "#fff",
          fontSize: "16px",
          textAlign: "center",
        }}
      >
        <Grid container>
          <Grid item xs={12} md={5} sx={{ p: 2 }}>
            Task
          </Grid>
          <Grid item xs={12} md={3} sx={{ p: 2 }}>
            Assigned
          </Grid>
          <Grid item xs={12} md={4} sx={{ p: 2 }}>
            Remarks
          </Grid>
        </Grid>
      </Paper>

      <Paper square={true} elevation={3} sx={{ textAlign: "center" }}>
        {
          loading ? (
            <div style={{ padding: 40 }}>Loading...</div>
          ) : (
            todos && todos.length > 0 ?
              todos.map((todo) => {
                return (
                  <Grid container key={todo.key}>
                    <Grid item xs={12} md={5} sx={{ p: 2 }}>
                      <Typography variant="body1" color="inherit" noWrap>
                        {todo.details}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={3} sx={{ p: 2 }}>
                      <Typography variant="body1" color="inherit" noWrap>
                        {todo.assign ? todo.assign.assignedTo : "—"}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={4} sx={{ p: 2 }}>
                      <Typography
                        variant="body1"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                      >
                        {todo.remark ? todo.remark : "—"}
                      </Typography>
                    </Grid>
                  </Grid>
                )
              }) :
              <div style={{ padding: 32, fontStyle: 'italic', color: 'grey' }}>No todos found</div>
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
  );
}
