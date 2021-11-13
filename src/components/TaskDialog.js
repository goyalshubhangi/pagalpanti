import {
  Typography,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { ref, push, set, update } from "firebase/database";
import { db } from "../utils/firebase";
import Snacks from "./Snacks";

export default function TaskDialog({ open, setOpen, isEditing, taskobj, oldTodos, setTodos }) {
  const [taskName, setTaskName] = useState(isEditing ? taskobj.details : "");
  const [assignedTo, setAssignedTo] = useState(
    isEditing ? (taskobj.assign ? taskobj.assign.assignedTo : "") : ""
  );
  const [remark, setRemark] = useState(
    isEditing ? (taskobj.remark ? taskobj.remark : "") : ""
  );
  const [snackbar, setSnackbar] = useState(false)
  const [msg, setMsg] = useState("")

  const saveTask = () => {
    if (taskName.trim() !== "") {
      if (isEditing) {
        const key = taskobj.key;
        var obj = {
          ...taskobj,
          details: taskName,
          assign: { assignedTo, assignedAt: new Date().toISOString() },
          remark,
        };
        delete obj.key
        const updates = {};
        updates["/todo/" + key] = obj;
        update(ref(db), updates)
          .then(() => {
            let ind = oldTodos.findIndex(i => i.key === key)
            if (ind >= 0) {
              let newTodo = [...oldTodos]
              obj.key = key
              newTodo[ind] = obj
              setTodos(newTodo)
              setMsg("Task updated")
              setSnackbar(true)
            } else {
              setMsg("Something went wrong! Please refresh")
              setSnackbar(true)
            }
          })
          .catch(e => {
            console.log(e)
            setMsg("Something went wrong! Try again")
            setSnackbar(true)
          })
      } else {
        const todos = ref(db, "todo");
        const list = push(todos);
        const obj = {
          createdAt: new Date().toISOString(),
          details: taskName,
          status: "Pending",
          assign: {
            assignedTo,
            assignedAt: new Date().toISOString(),
          },
        }
        set(list, obj)
          .then(() => {
            obj.key = list.key
            let newTodo = [...oldTodos, obj]
            setTodos(newTodo)
            setMsg("Added new task")
            setSnackbar(true)
        })
          .catch(e => {
            console.log(e)
            setMsg("Something went wrong! Try again")
            setSnackbar(true)
          })
      }
      setTaskName("");
      setAssignedTo("");
      setOpen(false);
    } else {
      setMsg("Task title required")
      setSnackbar(true)
    }
  };
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flex: 1 }}>
              Add a task
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          </Toolbar>
        </AppBar>

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
          />
          {isEditing ? (
            <TextField
              label="Remark"
              type="text"
              margin="normal"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              fullWidth
            />
          ) : (
            ""
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={saveTask}>SAVE</Button>
        </DialogActions>
      </Dialog>

      <Snacks open={snackbar} setOpen={setSnackbar} message={msg} />
    </>
  );
}
