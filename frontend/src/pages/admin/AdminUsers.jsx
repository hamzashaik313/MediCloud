
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
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  registerPatient,
  registerDoctor,
  getAllUsers,
  toggleUser,
} from "../../api/admin";

export default function AdminUsers() {
  // ================= STATE =================
  const [users, setUsers] = useState([]);

  // register states
  const [pUser, setPUser] = useState("");
  const [pPass, setPPass] = useState("");
  const [dUser, setDUser] = useState("");
  const [dPass, setDPass] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  // pagination
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  // search & filter
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");

  // ================= EFFECT =================
  useEffect(() => {
    loadUsers();
  }, [page, search, role]);

  // ================= API =================
  const loadUsers = async () => {
    const data = await getAllUsers(page, pageSize, search, role);
    setUsers(data.content || []);
    setTotalPages(data.totalPages || 0);
  };

  const handleRegisterPatient = async () => {
    try {
      await registerPatient(pUser, pPass);
      setPUser("");
      setPPass("");
      setPage(0);
      loadUsers();
      alert("Patient registered successfully");
    } catch (e) {
      alert("Failed to register patient");
    }
  };

  const handleRegisterDoctor = async () => {
    try {
      await registerDoctor(dUser, dPass, specialty);
      setDUser("");
      setDPass("");
      setSpecialty("");
      setPage(0);
      loadUsers();
      alert("Doctor registered successfully");
    } catch (e) {
      alert("Failed to register doctor");
    }
  };

  const handleToggle = async (id) => {
    await toggleUser(id);
    loadUsers();
  };

  // ================= UI =================
  return (
    <Stack spacing={3}>
      <Typography variant="h5" fontWeight={700}>
        Admin – User Management
      </Typography>

      {/* ===== SEARCH & FILTER ===== */}
      <Card>
        <CardContent>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Search Username"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
            />
            <TextField
              select
              label="Filter Role"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setPage(0);
              }}
              sx={{ width: 200 }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
              <MenuItem value="ROLE_DOCTOR">Doctor</MenuItem>
              <MenuItem value="ROLE_PATIENT">Patient</MenuItem>
            </TextField>
          </Stack>
        </CardContent>
      </Card>

      {/* ===== USERS TABLE ===== */}
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
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.id}</TableCell>
                    <TableCell>{u.username}</TableCell>
                    <TableCell>{u.role}</TableCell>
                    <TableCell>
                      {u.active ? "Active" : "Disabled"}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={u.active}
                        onChange={() => handleToggle(u.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* ===== PAGINATION ===== */}
          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
            <Button
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Typography sx={{ alignSelf: "center" }}>
              Page {page + 1} of {totalPages}
            </Typography>
            <Button
              disabled={page + 1 >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
