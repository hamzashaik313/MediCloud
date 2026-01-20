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
} from "@mui/material";

import AppLayout from "../../components/AppLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPatients } from "../../api/doctor";

export default function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data || []);
    } catch (e) {
      console.error("Failed to load patients", e);
    }
  };

  return (
    <AppLayout title="Doctor Dashboard">
      <Card sx={{ boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700}>
            My Patients
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Patients assigned to you
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell>
                  <b>Age</b>
                </TableCell>
                <TableCell>
                  <b>Gender</b>
                </TableCell>
                <TableCell>
                  <b>Disease</b>
                </TableCell>
                <TableCell align="right">
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {patients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No patients found
                  </TableCell>
                </TableRow>
              )}

              {patients.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.age || "-"}</TableCell>
                  <TableCell>{p.gender || "-"}</TableCell>
                  <TableCell>{p.disease || "-"}</TableCell>
                  <TableCell align="right">
                    <Button size="small" variant="outlined" sx={{ mr: 1 }}>
                      View
                    </Button>

                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => navigate("/doctor/upload")}
                    >
                      Upload Record
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() =>
                        navigate(`/doctor/patient/${p.id}/records`)
                      }
                    >
                      View Records
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
