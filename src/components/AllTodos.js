import { React, useState } from "react";
import { Add } from "@mui/icons-material";
import {
  Container,
  Fab,
  Grid,
  Paper,
  Link,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Radio,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ref, push, set } from "firebase/database";
import { db } from "../utils/firebase";

export default function All({ todos }) {
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [selectedValue, setSelectedValue] = useState("Pending");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const saveTask = () => {
    if (taskName.trim() !== "") {
      const todos = ref(db, "todo");
      const list = push(todos);
      set(list, {
        createdAt: new Date().toISOString(),
        details: taskName,
        status: "pending",
        assign: assignedTo,
      });
      setTaskName("");
      setAssignedTo("");
      setOpen(false);
    }
  };

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
          <Grid item xs={12} md={2} sx={{ p: 2 }}>
            Task
          </Grid>
          <Grid item xs={12} md={2} sx={{ p: 2 }}>
            Assigned
          </Grid>
          <Grid item xs={12} md={1.5} sx={{ p: 2 }}>
            Pending
          </Grid>
          <Grid item xs={12} md={1.5} sx={{ p: 2 }}>
            UnderReview
          </Grid>
          <Grid item xs={12} md={1.5} sx={{ p: 2 }}>
            Doing
          </Grid>
          <Grid item xs={12} md={1.5} sx={{ p: 2 }}>
            Completed
          </Grid>
          <Grid item xs={12} md={2} sx={{ pl: 4, pt: 2, pb: 2, pr: 2 }}>
            Remarks
          </Grid>
        </Grid>
      </Paper>
      <Paper square={true} elevation={3} sx={{ textAlign: "center" }}>
        {todos.map((todo) => {
          return (
            <Grid container key={todo.key}>
              <Grid item xs={12} md={2} sx={{ p: 2 }}>
                {todo.details}
              </Grid>
              <Grid item xs={12} md={2} sx={{ p: 2 }}>
                {todo.assign}
              </Grid>
              <Grid item xs={12} md={1.5} sx={{ p: 2 }}>
                <Radio
                  checked={selectedValue === "Pending"}
                  onChange={handleChange}
                  value="Pending"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "Pending" }}
                />
              </Grid>
              <Grid item xs={12} md={1.5} sx={{ p: 2 }}>
                <Radio
                  checked={selectedValue === "UnderReview"}
                  onChange={handleChange}
                  value="UnderReview"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "UnderReview" }}
                />
              </Grid>
              <Grid item xs={12} md={1.5} sx={{ p: 2 }}>
                <Radio
                  checked={selectedValue === "Doing"}
                  onChange={handleChange}
                  value="Doing"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "Doing" }}
                />
              </Grid>
              <Grid item xs={12} md={1.5} sx={{ p: 2 }}>
                <Radio
                  checked={selectedValue === "Completed"}
                  onChange={handleChange}
                  value="Completed"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "Completed" }}
                />
              </Grid>
              <Grid item xs={12} md={2} sx={{ pl: 4, pt: 2, pb: 2, pr: 2 }}>
                <TextField
                  label="Remark"
                  id="outlined-end-adornment"
                  sx={{ m: 1 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EditIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          );
        })}
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
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          right: 20,
          bottom: 20,
        }}
      >
        <Add />
      </Fab>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add a task</DialogTitle>
        <DialogContent sx={{ width: 500, maxWidth: "100%" }}>
          <TextField
            label="Task title"
            type="text"
            margin="normal"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            fullWidth
            autoFocus
          />
          <TextField
            label="Assigned To"
            type="text"
            margin="normal"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
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
