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
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear(); // token, role, username
    navigate("/login", { replace: true });
  };

  const menu = [
    { text: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
    { text: "Users", path: "/admin/users", icon: <PeopleIcon /> },
    {
      text: "Register User",
      path: "/admin/users/register",
      icon: <PersonAddIcon />,
    },
    {
      text: "Audit Logs",
      path: "/admin/activity-logs",
      icon: <ListAltIcon />,
    },
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
      {/* LOGO */}
      <Box sx={{ p: 3, fontSize: 22, fontWeight: 700, color: "#38bdf8" }}>
        MediCloud
      </Box>

      {/* MAIN MENU */}
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
            <ListItemIcon sx={{ color: "#38bdf8" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      {/* LOGOUT */}
      <List>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            "&:hover": { bgcolor: "#7f1d1d" },
          }}
        >
          <ListItemIcon sx={{ color: "#f87171" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
