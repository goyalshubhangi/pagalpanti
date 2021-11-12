import {
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { db } from "../utils/firebase";
import { ref, update } from "firebase/database";

export default function TaskDialog({ open, setOpen, taskobj }) {
  const deleteTask = () => {
    const updates = {};
    updates["/todo/" + taskobj.key] = null;
    update(ref(db), updates)
      .then(() => console.log())
      .catch((e) => console.log(e));
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent sx={{ width: 500, maxWidth: "100%" }}>
        <Typography variant='body1'>Delete this task?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>CANCEL</Button>
        <Button onClick={deleteTask}>DELETE</Button>
      </DialogActions>
    </Dialog >
  );
}
