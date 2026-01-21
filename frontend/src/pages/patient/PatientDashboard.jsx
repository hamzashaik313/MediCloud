import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import AppLayout from "../../components/AppLayout";
import { useEffect, useState } from "react";
import { getMyRecords, downloadRecord } from "../../api/patient";

export default function PatientDashboard() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const data = await getMyRecords();
      setRecords(data || []);
    } catch (e) {
      console.error("Failed to load records", e);
    }
  };

  const handleDownload = async (recordId) => {
    try {
      const url = await downloadRecord(recordId);
      window.open(url, "_blank");
    } catch (e) {
      alert("Failed to download file");
    }
  };

  return (
    <AppLayout title="My Medical Records">
      <Stack spacing={3}>
        {records.length === 0 && (
          <Card>
            <CardContent>
              <Typography align="center" color="text.secondary">
                No medical records available yet
              </Typography>
            </CardContent>
          </Card>
        )}

        {records.map((r) => (
          <Card key={r.id} sx={{ boxShadow: 4 }}>
            <CardContent>
              <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <Box>
                  <Typography fontWeight={700}>Medical Report</Typography>

                  <Typography variant="body2" color="text.secondary">
                    Uploaded by: {r.uploadedBy}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Date: {new Date(r.uploadedAt).toLocaleString()}
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1}>
                  <Chip label="Secure" color="success" />
                  <Button
                    variant="contained"
                    onClick={() => handleDownload(r.id)}
                  >
                    Download
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </AppLayout>
  );
}
