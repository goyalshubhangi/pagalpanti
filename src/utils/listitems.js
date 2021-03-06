import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import LayersIcon from "@mui/icons-material/Layers";
import PendingIcon from "@mui/icons-material/Pending";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";

export const mainListItems = (history) => (
  <div>
    <ListItem button onClick={() => history.push("/todo/Dashboard")}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem button onClick={() => history.push("/todo/Assigned")}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Assigned" />
    </ListItem>

    <ListItem button onClick={() => history.push("/todo/Pending")}>
      <ListItemIcon>
        <PendingActionsIcon />
      </ListItemIcon>
      <ListItemText primary="Pending" />
    </ListItem>

    <ListItem button onClick={() => history.push("/todo/UnderReview")}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Under Review" />
    </ListItem>

    <ListItem button onClick={() => history.push("/todo/Doing")}>
      <ListItemIcon>
        <PendingIcon />
      </ListItemIcon>
      <ListItemText primary="Doing" />
    </ListItem>

    <ListItem button onClick={() => history.push("/todo/Completed")}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Completed" />
    </ListItem>
  </div>
);

export const secondaryListItems = (history) => (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>

    <ListItem button onClick={() => history.push("/reports/currentweek")}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current Week" />
    </ListItem>

    <ListItem button onClick={() => history.push("/reports/lastweek")}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last Week" />
    </ListItem>
  </div>
);

export const teritiaryListItems = (history) => (
  <div>
    <ListSubheader inset>Account</ListSubheader>

    <ListItem button onClick={() => history.push("/account")}>
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Account details" />
    </ListItem>
  </div>
);
