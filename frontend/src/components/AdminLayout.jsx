//AdminLayout
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Box } from "@mui/material";

export default function AdminLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3, bgcolor: "#f8fafc" }}>
        <Outlet />
      </Box>
    </Box>
  );
}
