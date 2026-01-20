import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Divider,
} from "@mui/material";
import AppLayout from "../../components/AppLayout";
import { useEffect, useState } from "react";
import { getPatients, uploadRecord } from "../../api/doctor";
import { useNavigate } from "react-router-dom";

export default function UploadRecord() {
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");
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

  const handleUpload = async () => {
    if (!patientId || !file) {
      alert("Please select patient and file");
      return;
    }

    try {
      await uploadRecord(patientId, file, notes);
      alert("Record uploaded successfully");
      navigate("/doctor");
    } catch (e) {
      alert("Upload failed");
    }
  };

  return (
    <AppLayout title="Upload Medical Record">
      <Box maxWidth={600} mx="auto">
        <Card sx={{ boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700}>
              Upload Medical Record
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Upload reports securely for a patient
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* PATIENT SELECT */}
            <TextField
              select
              label="Select Patient"
              fullWidth
              margin="normal"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            >
              {patients.map((p) => (
                <MenuItem key={p.id} value={p.id}>
                  {p.name}
                </MenuItem>
              ))}
            </TextField>

            {/* FILE */}
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ my: 2 }}
            >
              {file ? file.name : "Select Medical File"}
              <input
                type="file"
                hidden
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>

            {/* NOTES */}
            <TextField
              label="Notes (optional)"
              fullWidth
              multiline
              rows={3}
              margin="normal"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />

            {/* ACTION */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
              onClick={handleUpload}
            >
              Upload Record
            </Button>
          </CardContent>
        </Card>
      </Box>
    </AppLayout>
  );
}
