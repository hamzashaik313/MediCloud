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
  Chip,
} from "@mui/material";
import AppLayout from "../../components/AppLayout";
import { useEffect, useState } from "react";
import { getMyUploads } from "../../api/doctor";

export default function MyUploads() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const data = await getMyUploads();
      setRecords(data || []);
    } catch (err) {
      console.error("Failed to load uploads", err);
    }
  };

  return (
    <AppLayout title="My Uploaded Records">
      <Card sx={{ boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            Upload History
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Record ID</b>
                </TableCell>
                <TableCell>
                  <b>Patient ID</b>
                </TableCell>
                <TableCell>
                  <b>Uploaded At</b>
                </TableCell>
                <TableCell>
                  <b>File</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {records.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No uploads yet
                  </TableCell>
                </TableRow>
              )}

              {records.map((r) => (
                <TableRow key={r.id} hover>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>
                    <Chip label={`Patient ${r.patientId}`} />
                  </TableCell>
                  <TableCell>
                    {new Date(r.uploadedAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
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
        </CardContent>
      </Card>
    </AppLayout>
  );
}
