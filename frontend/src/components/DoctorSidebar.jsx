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

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

export default function DoctorSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const menu = [
    { text: "Dashboard", path: "/doctor/dashboard" },
    { text: "My Uploads", path: "/doctor/uploads" },
  ];

  return (
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
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              "&.Mui-selected": { bgcolor: "#1e293b" },
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
  );
}
