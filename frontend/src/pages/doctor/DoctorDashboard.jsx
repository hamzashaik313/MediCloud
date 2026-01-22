// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Button,
//   Stack,
//   Chip,
//   Divider,
// } from "@mui/material";
// import AppLayout from "../../components/AppLayout";
// import { useEffect, useState } from "react";
// import { getPatients } from "../../api/doctor";
// import { useNavigate } from "react-router-dom";

// export default function DoctorDashboard() {
//   const [patients, setPatients] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadPatients();
//   }, []);

//   const loadPatients = async () => {
//     try {
//       const data = await getPatients();
//       setPatients(data || []);
//     } catch (e) {
//       console.error("Failed to load patients", e);
//     }
//   };

//   return (
//     <AppLayout title="Doctor Dashboard">
//       <Stack spacing={3}>
//         {/* ===== TOP SUMMARY CARDS ===== */}
//         <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
//           <Card sx={{ flex: 1 }}>
//             <CardContent>
//               <Typography variant="overline">Total Patients</Typography>
//               <Typography variant="h4" fontWeight={700}>
//                 {patients.length}
//               </Typography>
//             </CardContent>
//           </Card>

//           <Card sx={{ flex: 1 }}>
//             <CardContent>
//               <Typography variant="overline">Role</Typography>
//               <Typography variant="h5" fontWeight={600}>
//                 Doctor
//               </Typography>
//             </CardContent>
//           </Card>
//         </Stack>

//         {/* ===== PATIENT TABLE ===== */}
//         <Card sx={{ boxShadow: 4 }}>
//           <CardContent>
//             <Typography variant="h6" fontWeight={700}>
//               My Patients
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Patients assigned to you
//             </Typography>

//             <Divider sx={{ my: 2 }} />

//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#f5f7fa" }}>
//                   <TableCell>
//                     <b>Name</b>
//                   </TableCell>
//                   <TableCell>
//                     <b>Age</b>
//                   </TableCell>
//                   <TableCell>
//                     <b>Gender</b>
//                   </TableCell>
//                   <TableCell>
//                     <b>Disease</b>
//                   </TableCell>
//                   <TableCell align="right">
//                     <b>Actions</b>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {patients.length === 0 && (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center">
//                       No patients found
//                     </TableCell>
//                   </TableRow>
//                 )}

//                 {patients.map((p) => (
//                   <TableRow key={p.id} hover>
//                     <TableCell>
//                       <Typography fontWeight={600}>{p.name}</Typography>
//                     </TableCell>

//                     <TableCell>{p.age || "-"}</TableCell>

//                     <TableCell>
//                       {p.gender ? <Chip label={p.gender} size="small" /> : "-"}
//                     </TableCell>

//                     <TableCell>
//                       {p.disease ? (
//                         <Chip
//                           label={p.disease}
//                           color="primary"
//                           size="small"
//                           variant="outlined"
//                         />
//                       ) : (
//                         "-"
//                       )}
//                     </TableCell>

//                     <TableCell align="right">
//                       <Stack
//                         direction="row"
//                         spacing={1}
//                         justifyContent="flex-end"
//                       >
//                         <Button
//                           size="small"
//                           variant="outlined"
//                           onClick={() =>
//                             navigate(`/doctor/patient/${p.id}/records`)
//                           }
//                         >
//                           View Records
//                         </Button>

//                         <Button
//                           size="small"
//                           variant="contained"
//                           onClick={() =>
//                             navigate(`/doctor/upload?patientId=${p.id}`)
//                           }
//                         >
//                           Upload Record
//                         </Button>
//                       </Stack>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </Stack>
//     </AppLayout>
//   );
// }

//ui

import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
  Chip,
  Divider,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getPatients, searchPatients } from "../../api/doctor";
import { useNavigate } from "react-router-dom";

export default function DoctorDashboard() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const data = await getPatients();
      console.log("Patients API Response:", data);
      setPatients(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Failed to load patients", e);
      setPatients([]);
    }
  };

  const handleSearch = async (value) => {
    setSearch(value);

    if (!value) {
      loadPatients();
      return;
    }

    try {
      const data = await searchPatients(value);
      setPatients(Array.isArray(data) ? data : []);
    } catch {
      setPatients([]);
    }
  };

  return (
    <Stack spacing={3}>
      {/* SUMMARY */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="overline">Total Patients</Typography>
            <Typography variant="h4" fontWeight={700}>
              {patients.length}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="overline">Role</Typography>
            <Typography variant="h5" fontWeight={600}>
              Doctor
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      {/* PATIENT TABLE */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={700}>
            Global Patient Directory
          </Typography>

          <TextField
            label="Search by Name or Health ID"
            size="small"
            fullWidth
            sx={{ my: 2 }}
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />

          <Divider sx={{ mb: 2 }} />

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell>
                  <b>Health ID</b>
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
                  <TableCell colSpan={6} align="center">
                    No patients found
                  </TableCell>
                </TableRow>
              )}

              {patients.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell>{p.name}</TableCell>

                  <TableCell>
                    {p.healthId ? (
                      <Chip label={p.healthId} size="small" />
                    ) : (
                      "-"
                    )}
                  </TableCell>

                  <TableCell>{p.age || "-"}</TableCell>
                  <TableCell>{p.gender || "-"}</TableCell>
                  <TableCell>{p.disease || "-"}</TableCell>

                  <TableCell align="right">
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() =>
                          navigate(`/doctor/patient/${p.id}/records`)
                        }
                      >
                        View History
                      </Button>

                      <Button
                        size="small"
                        variant="contained"
                        onClick={() =>
                          navigate(`/doctor/upload?patientId=${p.id}`)
                        }
                      >
                        Upload Record
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Stack>
  );
}
