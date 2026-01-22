

import { Outlet, useNavigate } from "react-router-dom";
import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

export default function DoctorLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const menu = [
    { text: "Dashboard", path: "/doctor/dashboard", icon: <DashboardIcon /> },
    { text: "My Uploads", path: "/doctor/uploads", icon: <UploadFileIcon /> },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
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
        <Box sx={{ p: 3, fontSize: 22, fontWeight: 700, color: "#38bdf8" }}>
          MediCloud
        </Box>

        <List sx={{ flexGrow: 1 }}>
          {menu.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                "&:hover": { bgcolor: "#1e293b" },
              }}
            >
              <ListItemIcon sx={{ color: "#38bdf8" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>

        <Divider />

        <List>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon sx={{ color: "#f87171" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* PAGE CONTENT */}
      <Box sx={{ flexGrow: 1, p: 3, bgcolor: "#f8fafc" }}>
        <Outlet />
      </Box>
    </Box>
  );
}
