import { React, useState } from "react";
import { Add } from "@mui/icons-material";
import { Container, Fab, Grid, Paper, Link, Typography } from "@mui/material";

import SingleTodo from "./SingleTodo";
import TaskDialog from "./TaskDialog";

export default function All({ todos, setTodos, loading }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 2 }}>
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
          <Grid item xs={12} md={1.75} sx={{ p: 2 }}>
            Task
          </Grid>
          <Grid item xs={12} md={1.75} sx={{ p: 2 }}>
            Assigned
          </Grid>
          <Grid item xs={12} md={1.25} sx={{ p: 2 }}>
            Pending
          </Grid>
          <Grid item xs={12} md={1.25} sx={{ p: 2 }}>
            Under Review
          </Grid>
          <Grid item xs={12} md={1.25} sx={{ p: 2 }}>
            Doing
          </Grid>
          <Grid item xs={12} md={1.25} sx={{ p: 2 }}>
            Completed
          </Grid>
          <Grid item xs={12} md={2} sx={{ p: 2 }}>
            Remarks
          </Grid>
          <Grid item xs={12} md={1.5} sx={{ p: 2 }}></Grid>
        </Grid>
      </Paper>
      <Paper square={true} elevation={3} sx={{ textAlign: "center" }}>
        {
          loading ? (
            <div style={{ padding: 40 }}>Loading...</div>
          ) : (
            todos && todos.length > 0 ?
              todos.map((todo) => (
                <SingleTodo key={todo.key} todo={todo} oldTodos={todos} setTodos={setTodos} />
              )) :
              <div style={{ padding: 40 }}>Kux ni mila bc</div>
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

      <Fab
        color="secondary"
        onClick={() => setDialogOpen(true)}
        sx={{
          position: "fixed",
          right: 20,
          bottom: 20,
        }}
      >
        <Add />
      </Fab>

      <TaskDialog open={dialogOpen} setOpen={setDialogOpen} oldTodos={todos} setTodos={setTodos} />
    </Container>
  );
}
