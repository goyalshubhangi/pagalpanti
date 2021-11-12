import { useState } from "react";
import { Grid, IconButton, Radio, Typography } from "@mui/material";
import { ref, update } from "firebase/database";
import { db } from "../utils/firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TaskDialog from "./TaskDialog";

function SingleTodo({ todo }) {
  const [selectedValue, setSelectedValue] = useState(
    todo ? todo.status : "Pending"
  );
  const [editDialog, setEditDialog] = useState(false);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    let obj = { ...todo, status: event.target.value };
    let key = obj.key;
    delete obj.key;
    const updates = {};
    updates["/todo/" + key] = obj;
    update(ref(db), updates)
      .then(() => console.log())
      .catch((e) => console.log(e));
  };
  return (
    <Grid container key={todo.key}>
      <Grid item xs={12} md={1.75} sx={{ p: 2 }}>
        <Typography component="body1" color="inherit" noWrap>
          {todo.details}
        </Typography>
      </Grid>
      <Grid item xs={12} md={1.75} sx={{ p: 2 }}>
        <Typography component="body1" color="inherit" noWrap>
          {todo.assign ? todo.assign.assignedTo : "—"}
        </Typography>
      </Grid>
      <Grid item xs={12} md={1.25} sx={{ p: 2 }}>
        <Radio
          checked={selectedValue === "Pending"}
          onChange={handleChange}
          value="Pending"
          name="radio-buttons"
          inputProps={{ "aria-label": "Pending" }}
        />
      </Grid>
      <Grid item xs={12} md={1.25} sx={{ p: 2 }}>
        <Radio
          checked={selectedValue === "UnderReview"}
          onChange={handleChange}
          value="UnderReview"
          name="radio-buttons"
          inputProps={{ "aria-label": "UnderReview" }}
        />
      </Grid>
      <Grid item xs={12} md={1.25} sx={{ p: 2 }}>
        <Radio
          checked={selectedValue === "Doing"}
          onChange={handleChange}
          value="Doing"
          name="radio-buttons"
          inputProps={{ "aria-label": "Doing" }}
        />
      </Grid>
      <Grid item xs={12} md={1.25} sx={{ p: 2 }}>
        <Radio
          checked={selectedValue === "Completed"}
          onChange={handleChange}
          value="Completed"
          name="radio-buttons"
          inputProps={{ "aria-label": "Completed" }}
        />
      </Grid>

      <Grid item xs={12} md={2} sx={{ p: 2 }}>
        <Typography
          component="body1"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {todo.remark ? todo.remark : "—"}
        </Typography>
      </Grid>
      <Grid item xs={12} md={1.5} sx={{ p: 2 }}>
        <IconButton>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={() => setEditDialog(true)}>
          <EditIcon />
        </IconButton>
      </Grid>

      <TaskDialog open={editDialog} setOpen={setEditDialog} isEditing={true} taskobj={todo} />
    </Grid>
  );
}

export default SingleTodo;
