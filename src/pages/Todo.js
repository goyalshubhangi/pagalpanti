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
import { mainListItems, secondaryListItems, teritiaryListItems } from "../utils/listitems";
import AllTodos from "../components/AllTodos";
import { useAuth } from "../contexts/AuthProvider";
import { AppBar, Drawer } from "../utils/drawer";
import SpecificTodos from "../components/SpecificTodos";
import Snacks from "../components/Snacks";

export default function Todo({ match }) {
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState("Dashboard");
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState(false)
  const [msg, setMsg] = useState("")
  const [todoFromDB, setTodoFromDB] = useState([]);
  const { currentUser, logOut } = useAuth();
  const history = useHistory();

  useEffect(() => {
    setTab(match.params.tab);
  }, [history.location, match.params.tab]);

  useEffect(() => {
    if (currentUser) {
      let dbRef = ref(getDatabase());
      setLoading(true)

      switch (tab) {
        case "Dashboard":
          get(child(dbRef, "todo"))
            .then((snap) => {
              let temp = [];
              snap.forEach((todo) => {
                temp.push({ key: todo.key, ...todo.val() });
              });
              setTodoFromDB(temp);
            })
            .catch((err) => {
              console.error(err);
              setMsg('Something went wrong while fetching data!')
              setSnackbar(true)
            })
            .finally(() => setLoading(false))
          break;

        case "Assigned":
          get(child(dbRef, "todo"))
            .then((snap) => {
              let temp = [];
              snap.forEach((todo) => {
                if (todo.val().assign)
                  temp.push({ key: todo.key, ...todo.val() });
              });
              setTodoFromDB(temp);
            })
            .catch((err) => {
              console.error(err);
              setMsg('Something went wrong while fetching data!')
              setSnackbar(true)
            })
            .finally(() => setLoading(false))
          break;

        case "Doing":
          get(child(dbRef, "todo"))
            .then((snap) => {
              let temp = [];
              snap.forEach((todo) => {
                if (todo.val().status === "Doing")
                  temp.push({ key: todo.key, ...todo.val() });
              });
              setTodoFromDB(temp);
            })
            .catch((err) => {
              console.error(err);
              setMsg('Something went wrong while fetching data!')
              setSnackbar(true)
            })
            .finally(() => setLoading(false))
          break;

        case "Pending":
          get(child(dbRef, "todo"))
            .then((snap) => {
              let temp = [];
              snap.forEach((todo) => {
                if (todo.val().status === "Pending")
                  temp.push({ key: todo.key, ...todo.val() });
              });
              setTodoFromDB(temp);
            })
            .catch((err) => {
              console.error(err);
              setMsg('Something went wrong while fetching data!')
              setSnackbar(true)
            })
            .finally(() => setLoading(false))
          break;

        case "UnderReview":
          get(child(dbRef, "todo"))
            .then((snap) => {
              let temp = [];
              snap.forEach((todo) => {
                if (todo.val().status === "UnderReview")
                  temp.push({ key: todo.key, ...todo.val() });
              });
              setTodoFromDB(temp);
            })
            .catch((err) => {
              console.error(err);
              setMsg('Something went wrong while fetching data!')
              setSnackbar(true)
            })
            .finally(() => setLoading(false))
          break;

        case "Completed":
          get(child(dbRef, "todo"))
            .then((snap) => {
              let temp = [];
              snap.forEach((todo) => {
                if (todo.val().status === "Completed")
                  temp.push({ key: todo.key, ...todo.val() });
              });
              setTodoFromDB(temp);
            })
            .catch((err) => {
              console.error(err);
              setMsg('Something went wrong while fetching data!')
              setSnackbar(true)
            })
            .finally(() => setLoading(false))
          break;

        default:
          setTodoFromDB([]);
          setLoading(false)
          break;
      }
    } else setTodoFromDB([]);
  }, [currentUser, tab]);

  // useEffect(() => {
  // 	if (currentUser) {
  // 		console.log(currentUser)
  // 	} else {
  // 		history.replace('/login')
  // 	}
  // }, [currentUser, history])

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

        {tab === "Dashboard" ? (
          <AllTodos loading={loading} todos={todoFromDB} setTodos={setTodoFromDB} />
        ) : (
          <SpecificTodos loading={loading} todos={todoFromDB} />
        )}
      </Box>

      <Snacks open={snackbar} setOpen={setSnackbar} message={msg} />
    </Box>
  );
}
