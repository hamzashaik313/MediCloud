// src/pages/admin/AdminDashboard.jsx
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminStats } from "../../api/admin";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalPatients: 0,
    totalMedicalRecords: 0,
  });

  useEffect(() => {
    getAdminStats().then(setStats);
  }, []);

  return (
    <Stack spacing={4}>
      <Typography variant="h5" fontWeight={700}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Doctors" value={stats.totalDoctors} color="primary" />
        <StatCard
          title="Patients"
          value={stats.totalPatients}
          color="success"
        />
        <StatCard
          title="Medical Records"
          value={stats.totalMedicalRecords}
          color="warning"
        />
      </Grid>

      <Card>
        <CardContent>
          <Typography fontWeight={700}>Admin Actions</Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid item>
              <Chip
                label="Manage Users"
                clickable
                onClick={() => navigate("/admin/users")}
              />
            </Grid>
            <Grid item>
              <Chip
                label="Audit Logs"
                clickable
                color="warning"
                onClick={() => navigate("/admin/activity-logs")}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
}

function StatCard({ title, value, color = "default" }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardContent>
          <Typography variant="overline">{title}</Typography>
          <Typography variant="h4">{value}</Typography>
          <Chip label="Live" size="small" color={color} />
        </CardContent>
      </Card>
    </Grid>
  );
}
