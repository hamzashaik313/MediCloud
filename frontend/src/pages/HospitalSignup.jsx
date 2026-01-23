import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { registerHospital } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function HospitalSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    hospitalName: "",
    city: "",
    licenseCode: "",
    adminUsername: "",
    adminPassword: "",
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setMessage(null);
    setError(null);

    try {
      const res = await registerHospital(form);
      setMessage(res);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data || "Registration failed");
    }
  };

  return (
    <Card sx={{ maxWidth: 520, mx: "auto", mt: 8, p: 2 }}>
      <CardContent>
        <Typography variant="h5" fontWeight={700}>
          Hospital Registration
        </Typography>

        <Stack spacing={2} mt={3}>
          {message && <Alert severity="success">{message}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            label="Hospital Name"
            name="hospitalName"
            onChange={handleChange}
          />
          <TextField label="City" name="city" onChange={handleChange} />
          <TextField
            label="License Code"
            name="licenseCode"
            onChange={handleChange}
          />

          <Typography fontWeight={600}>Admin Account</Typography>

          <TextField
            label="Admin Username"
            name="adminUsername"
            onChange={handleChange}
          />
          <TextField
            label="Admin Password"
            name="adminPassword"
            type="password"
            onChange={handleChange}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Register Hospital
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
