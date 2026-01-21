import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const drawerWidth = 260;

export default function AppLayout({ title, children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            bgcolor: "#0f172a",
            color: "#e5e7eb",
            borderRight: "none",
          },
        }}
      >
        <Box sx={{ p: 3, fontSize: 22, fontWeight: 800, color: "#38bdf8" }}>
          MediCloud
        </Box>

        <List>
          {[
            { text: "Dashboard", icon: <DashboardIcon /> },
            { text: "Users", icon: <PeopleIcon /> },
            { text: "Records", icon: <MedicalServicesIcon /> },
          ].map((item) => (
            <ListItem button key={item.text}>
              <ListItemIcon sx={{ color: "#38bdf8" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Area */}
      <Box sx={{ flexGrow: 1, bgcolor: "background.default" }}>
        <AppBar position="static" elevation={0} color="inherit">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">{title}</Typography>
            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={logout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 4 }}>{children}</Box>
      </Box>
    </Box>
  );
}

// import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { useNavigate, Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";

// export default function AppLayout({ title }) {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Area */}
//       <Box sx={{ flexGrow: 1 }}>
//         <AppBar position="static" elevation={0} color="inherit">
//           <Toolbar sx={{ justifyContent: "space-between" }}>
//             <Typography variant="h6">{title}</Typography>
//             <Button
//               variant="outlined"
//               startIcon={<LogoutIcon />}
//               onClick={logout}
//             >
//               Logout
//             </Button>
//           </Toolbar>
//         </AppBar>

//         {/* 🔥 ROUTER OUTPUT */}
//         <Box sx={{ p: 4 }}>
//           <Outlet />
//         </Box>
//       </Box>
//     </Box>
//   );
// }
