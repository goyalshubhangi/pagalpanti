import { useState } from "react";
import {
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { db } from "../utils/firebase";
import { ref, update } from "firebase/database";
import Snacks from "./Snacks";

export default function TaskDialog({ open, setOpen, taskobj, oldTodos, setTodos }) {
  const [snackbar, setSnackbar] = useState(false)
  const [msg, setMsg] = useState("")

  const deleteTask = () => {
    const updates = {};
    updates["/todo/" + taskobj.key] = null;
    update(ref(db), updates)
      .then(() => {
        let newTodo = [...oldTodos]
        newTodo.splice(newTodo.findIndex(i => i.key === taskobj.key), 1)
        setTodos(newTodo)
        setMsg("Task deleted")
        setSnackbar(true)
      })
      .catch(e => {
        console.log(e)
        setMsg("Something went wrong! Try again")
        setSnackbar(true)
      })
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent sx={{ width: 500, maxWidth: "100%" }}>
          <Typography variant='body1'>Delete this task?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>CANCEL</Button>
          <Button onClick={deleteTask}>DELETE</Button>
        </DialogActions>
      </Dialog >

      <Snacks open={snackbar} setOpen={setSnackbar} message={msg} />
    </>
  );
}
