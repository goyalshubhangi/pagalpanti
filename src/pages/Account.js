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
import Snacks from "../components/Snacks";
import UserDetails from "../components/UserDetails";

export default function Account() {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false)
  const [userDetails, setUserDetails] = useState(null)
  const [snackbar, setSnackbar] = useState(false)
  const [msg, setMsg] = useState("")
  const { currentUser, logOut } = useAuth()
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser)
      setLoading(true)
      let dbRef = ref(getDatabase())
      get(child(dbRef, "users/" + currentUser.uid))
        .then((snap) => {
          setUserDetails(snap.val())
        })
        .catch((err) => {
        })
        .finally(() => setLoading(false))
    }
  }, [currentUser])

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

        <UserDetails loading={loading} userDetails={userDetails} currentUser={currentUser} />
      </Box>

      <Snacks open={snackbar} setOpen={setSnackbar} message={msg} />
    </Box>
  )
}
