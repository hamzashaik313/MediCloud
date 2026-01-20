import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import AppLayout from "../../components/AppLayout";
import { useEffect, useState } from "react";
import { getProfile, getMyRecords } from "../../api/patient";

export default function PatientDashboard() {
  const [profile, setProfile] = useState({});
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const p = await getProfile();
      setProfile(p || {});
      const r = await getMyRecords();
      setRecords(r || []);
    } catch (e) {
      console.error("Failed to load patient data", e);
    }
  };

  return (
    <AppLayout title="Patient Dashboard">
      {/* PROFILE */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700}>
                My Profile
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Typography>
                <b>Name:</b> {profile.name || "-"}
              </Typography>
              <Typography>
                <b>Age:</b> {profile.age || "-"}
              </Typography>
              <Typography>
                <b>Gender:</b> {profile.gender || "-"}
              </Typography>
              <Typography>
                <b>Disease:</b> {profile.disease || "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* MEDICAL RECORDS */}
      <Card sx={{ boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700}>
            My Medical Records
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Secure access to your uploaded medical reports
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>ID</b>
                </TableCell>
                <TableCell>
                  <b>Uploaded By</b>
                </TableCell>
                <TableCell>
                  <b>Uploaded At</b>
                </TableCell>
                <TableCell align="right">
                  <b>Action</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {records.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No medical records available
                  </TableCell>
                </TableRow>
              )}

              {records.map((r) => (
                <TableRow key={r.id} hover>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>{r.uploadedBy}</TableCell>
                  <TableCell>
                    {new Date(r.uploadedAt).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      size="small"
                      href={`http://localhost:8081/patient/download/${r.id}`}
                      target="_blank"
                    >
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
