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
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "../../components/AppLayout";
import { getPatientRecords } from "../../api/doctor";

export default function DoctorPatientRecords() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const data = await getPatientRecords(patientId);
      setRecords(data || []);
    } catch (e) {
      console.error("Failed to load records", e);
    }
  };

  return (
    <AppLayout title="Patient Records">
      <Card sx={{ boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700}>
            Medical Records
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Records for selected patient
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Record ID</b>
                </TableCell>
                <TableCell>
                  <b>Uploaded At</b>
                </TableCell>
                <TableCell align="right">
                  <b>File</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {records.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No records found
                  </TableCell>
                </TableRow>
              )}

              {records.map((r) => (
                <TableRow key={r.id} hover>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>
                    {new Date(r.uploadedAt).toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => window.open(r.reportUrl, "_blank")}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button
            sx={{ mt: 3 }}
            variant="contained"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
