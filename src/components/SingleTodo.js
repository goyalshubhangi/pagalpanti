import { useState } from "react";
import { Grid, TextField, Radio, InputAdornment } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ref, update } from "firebase/database";
import { db } from "../utils/firebase";

function SingleTodo({ todo }) {
  const [selectedValue, setSelectedValue] = useState(
    todo ? todo.status : "Pending"
  );

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
}

export default SingleTodo;
