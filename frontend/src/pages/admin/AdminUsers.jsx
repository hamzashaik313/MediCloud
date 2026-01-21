// src/pages/admin/AdminUsers.jsx
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Switch,
  Snackbar,
  Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  registerPatient,
  registerDoctor,
  getAllUsers,
  toggleUser,
} from "../../api/admin";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const [pUser, setPUser] = useState("");
  const [pPass, setPPass] = useState("");

  const [dUser, setDUser] = useState("");
  const [dPass, setDPass] = useState("");
  const [specialty, setSpecialty] = useState("");

  // 🔔 Snackbar state
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const showSnack = (message, severity = "success") => {
    setSnack({ open: true, message, severity });
  };

  const handleRegisterPatient = async () => {
    try {
      await registerPatient(pUser, pPass);
      showSnack("Patient registered successfully ✅");
      setPUser("");
      setPPass("");
      loadUsers();
    } catch (e) {
      showSnack(e.response?.data || "Failed to register patient ❌", "error");
    }
  };

  const handleRegisterDoctor = async () => {
    try {
      await registerDoctor(dUser, dPass, specialty);
      showSnack("Doctor registered successfully ✅");
      setDUser("");
      setDPass("");
      setSpecialty("");
      loadUsers();
    } catch (e) {
      showSnack(e.response?.data || "Failed to register doctor ❌", "error");
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleUser(id);
      showSnack("User status updated");
      loadUsers();
    } catch {
      showSnack("Failed to update user status", "error");
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <Typography variant="h5" fontWeight={700}>
          Admin – User Management
        </Typography>

        {/* REGISTER PATIENT */}
        <Card>
          <CardContent>
            <Typography fontWeight={700}>Register Patient</Typography>
            <Stack direction="row" spacing={2} mt={2}>
              <TextField
                label="Username"
                value={pUser}
                onChange={(e) => setPUser(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                value={pPass}
                onChange={(e) => setPPass(e.target.value)}
              />
              <Button variant="contained" onClick={handleRegisterPatient}>
                Register
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* REGISTER DOCTOR */}
        <Card>
          <CardContent>
            <Typography fontWeight={700}>Register Doctor</Typography>
            <Stack direction="row" spacing={2} mt={2}>
              <TextField
                label="Username"
                value={dUser}
                onChange={(e) => setDUser(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                value={dPass}
                onChange={(e) => setDPass(e.target.value)}
              />
              <TextField
                label="Specialty"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              />
              <Button
                variant="contained"
                color="success"
                onClick={handleRegisterDoctor}
              >
                Register
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* USERS TABLE */}
        <Card>
          <CardContent>
            <Typography fontWeight={700}>All Users</Typography>

            <Table sx={{ mt: 2 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.id}</TableCell>
                    <TableCell>{u.username}</TableCell>
                    <TableCell>{u.role}</TableCell>
                    <TableCell>{u.active ? "Active" : "Disabled"}</TableCell>
                    <TableCell>
                      <Switch
                        checked={u.active}
                        onChange={() => handleToggle(u.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Stack>

      {/* 🔔 SNACKBAR */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snack.severity}
          onClose={() => setSnack({ ...snack, open: false })}
          variant="filled"
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
}
