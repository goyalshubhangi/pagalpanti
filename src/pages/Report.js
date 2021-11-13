import { useEffect, useState } from "react";
import {
  CssBaseline,
  Box,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useHistory } from "react-router";
import { getDatabase, ref, child, get } from "firebase/database";
import { useAuth } from "../contexts/AuthProvider";
import { mainListItems, secondaryListItems, teritiaryListItems } from "../utils/listitems";
import { AppBar, Drawer } from "../utils/drawer";
import AllReports from "../components/AllReports";
import Snacks from "../components/Snacks";

export default function Report({ match }) {
  const [open, setOpen] = useState(true)
  const [period, setPeriod] = useState("currentweek")
  const [loading, setLoading] = useState(false)
  const [reports, setReports] = useState([])
  const [snackbar, setSnackbar] = useState(false)
  const [msg, setMsg] = useState("")
  const { currentUser, logOut } = useAuth()
  const history = useHistory();

  useEffect(() => {
    setPeriod(match.params.period);
  }, [history.location, match.params.period]);

  useEffect(() => {
    if (currentUser) {
      setLoading(true)
      let dbRef = ref(getDatabase())

      switch (period) {
        case "currentweek":
          get(child(dbRef, "logs"))
            .then((snap) => {
              let reps = []
              let xyz
              let curr = new Date()
              snap.forEach(tmp => {
                xyz = tmp.val().time
                xyz = new Date(xyz)
                if (curr - xyz <= 604800000)
                  reps.push({ ...tmp.val(), key: tmp.key })
              })
              setReports(reps)
            })
            .catch((err) => {
              setMsg('Error while fetching account details')
              setSnackbar(true)
            })
            .finally(() => setLoading(false))
          break;

        case "lastweek":
          get(child(dbRef, "logs"))
            .then((snap) => {
              let reps = []
              let xyz
              let curr = new Date()
              snap.forEach(tmp => {
                xyz = tmp.val().time
                xyz = new Date(xyz)
                if ((curr - xyz) > 604800000 && (curr - xyz) <= 1209600000)
                  reps.push({ ...tmp.val(), key: tmp.key })
              })
              setReports(reps)
            })
            .catch((err) => {
              setMsg('Error while fetching account details')
              setSnackbar(true)
            })
            .finally(() => setLoading(false))
          break;

        default:
          break;
      }
    }
  }, [currentUser, period])

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    await logOut()
      .then(() => {
        console.log("Logout successful");
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            ToDo App
          </Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>{mainListItems(history)}</List>
        <Divider />
        <List>{secondaryListItems(history)}</List>
        <Divider />
        <List>{teritiaryListItems(history)}</List>
      </Drawer>

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />

        <AllReports loading={loading} reports={reports} />
      </Box>

      <Snacks open={snackbar} setOpen={setSnackbar} message={msg} />
    </Box>
  )
}