// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Divider,
// } from "@mui/material";
// import PeopleIcon from "@mui/icons-material/People";
// import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
// import PersonIcon from "@mui/icons-material/Person";
// import AppLayout from "../../components/AppLayout";
// import { useEffect, useState } from "react";
// import {
//   getAdminStats,
//   registerPatient,
//   registerDoctor,
// } from "../../api/admin";

// /* ---------- Safe Stat Card ---------- */
// function StatCard({ label, value = 0, icon, color }) {
//   return (
//     <Card sx={{ boxShadow: 4 }}>
//       <CardContent sx={{ display: "flex", gap: 2, alignItems: "center" }}>
//         <Box
//           sx={{
//             bgcolor: color,
//             color: "#fff",
//             p: 2,
//             borderRadius: "50%",
//           }}
//         >
//           {icon}
//         </Box>
//         <Box>
//           <Typography variant="body2" color="text.secondary">
//             {label}
//           </Typography>
//           <Typography variant="h5" fontWeight={700}>
//             {value}
//           </Typography>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({
//     users: 0,
//     doctors: 0,
//     patients: 0,
//     records: 0,
//   });

//   const [patient, setPatient] = useState({ username: "", password: "" });
//   const [doctor, setDoctor] = useState({
//     username: "",
//     password: "",
//     speciality: "",
//   });

//   useEffect(() => {
//     loadStats();
//   }, []);

//   const loadStats = async () => {
//     try {
//       const data = await getAdminStats();
//       setStats(data || {});
//     } catch (e) {
//       console.error("Stats load failed", e);
//     }
//   };

//   const createPatient = async () => {
//     try {
//       await registerPatient(patient);
//       setPatient({ username: "", password: "" });
//       loadStats();
//     } catch (e) {
//       alert("Patient creation failed");
//     }
//   };

//   const createDoctor = async () => {
//     try {
//       await registerDoctor(doctor);
//       setDoctor({ username: "", password: "", speciality: "" });
//       loadStats();
//     } catch (e) {
//       alert("Doctor creation failed");
//     }
//   };

//   return (
//     <AppLayout title="Admin Dashboard">
//       {/* STATS */}
//       <Grid container spacing={3} mb={4}>
//         <Grid item xs={12} md={3}>
//           <StatCard
//             label="Users"
//             value={stats.users}
//             icon={<PeopleIcon />}
//             color="#2563eb"
//           />
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <StatCard
//             label="Doctors"
//             value={stats.doctors}
//             icon={<MedicalServicesIcon />}
//             color="#16a34a"
//           />
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <StatCard
//             label="Patients"
//             value={stats.patients}
//             icon={<PersonIcon />}
//             color="#9333ea"
//           />
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <StatCard
//             label="Records"
//             value={stats.records}
//             icon={<MedicalServicesIcon />}
//             color="#ea580c"
//           />
//         </Grid>
//       </Grid>

//       {/* FORMS */}
//       <Grid container spacing={4}>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Register Patient</Typography>
//               <Divider sx={{ my: 2 }} />

//               <TextField
//                 label="Username"
//                 fullWidth
//                 margin="normal"
//                 value={patient.username}
//                 onChange={(e) =>
//                   setPatient({ ...patient, username: e.target.value })
//                 }
//               />

//               <TextField
//                 label="Password"
//                 type="password"
//                 fullWidth
//                 margin="normal"
//                 value={patient.password}
//                 onChange={(e) =>
//                   setPatient({ ...patient, password: e.target.value })
//                 }
//               />

//               <Button variant="contained" fullWidth onClick={createPatient}>
//                 Create Patient
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6">Register Doctor</Typography>
//               <Divider sx={{ my: 2 }} />

//               <TextField
//                 label="Username"
//                 fullWidth
//                 margin="normal"
//                 value={doctor.username}
//                 onChange={(e) =>
//                   setDoctor({ ...doctor, username: e.target.value })
//                 }
//               />

//               <TextField
//                 label="Password"
//                 type="password"
//                 fullWidth
//                 margin="normal"
//                 value={doctor.password}
//                 onChange={(e) =>
//                   setDoctor({ ...doctor, password: e.target.value })
//                 }
//               />

//               <TextField
//                 label="Speciality"
//                 fullWidth
//                 margin="normal"
//                 value={doctor.speciality}
//                 onChange={(e) =>
//                   setDoctor({ ...doctor, speciality: e.target.value })
//                 }
//               />

//               <Button
//                 variant="contained"
//                 color="secondary"
//                 fullWidth
//                 onClick={createDoctor}
//               >
//                 Create Doctor
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </AppLayout>
//   );
// }

import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import PersonIcon from "@mui/icons-material/Person";
import AppLayout from "../../components/AppLayout";
import { useEffect, useState } from "react";
import {
  getAdminStats,
  registerPatient,
  registerDoctor,
} from "../../api/admin";

/* ====== KPI CARD ====== */
function StatCard({ label, value, icon, gradient }) {
  return (
    <Card
      sx={{
        background: gradient,
        color: "#fff",
        boxShadow: 6,
        borderRadius: 3,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {label}
          </Typography>
          <Typography variant="h4" fontWeight={700}>
            {value}
          </Typography>
        </Box>
        <Box sx={{ opacity: 0.9 }}>{icon}</Box>
      </CardContent>
    </Card>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    doctors: 0,
    patients: 0,
    records: 0,
  });

  const [patient, setPatient] = useState({ username: "", password: "" });
  const [doctor, setDoctor] = useState({
    username: "",
    password: "",
    speciality: "",
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const data = await getAdminStats();
    setStats(data);
  };

  const createPatient = async () => {
    await registerPatient(patient);
    setPatient({ username: "", password: "" });
    loadStats();
  };

  const createDoctor = async () => {
    await registerDoctor(doctor);
    setDoctor({ username: "", password: "", speciality: "" });
    loadStats();
  };

  return (
    <AppLayout title="Admin Dashboard">
      {/* KPI SECTION */}
      <Grid container spacing={3} mb={5}>
        <Grid item xs={12} md={3}>
          <StatCard
            label="Total Users"
            value={stats.users}
            icon={<PeopleIcon fontSize="large" />}
            gradient="linear-gradient(135deg,#2563eb,#1e40af)"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            label="Doctors"
            value={stats.doctors}
            icon={<MedicalServicesIcon fontSize="large" />}
            gradient="linear-gradient(135deg,#16a34a,#166534)"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            label="Patients"
            value={stats.patients}
            icon={<PersonIcon fontSize="large" />}
            gradient="linear-gradient(135deg,#9333ea,#6b21a8)"
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            label="Records"
            value={stats.records}
            icon={<MedicalServicesIcon fontSize="large" />}
            gradient="linear-gradient(135deg,#ea580c,#9a3412)"
          />
        </Grid>
      </Grid>

      {/* FORMS */}
      <Grid container spacing={4}>
        {/* PATIENT */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6">Register Patient</Typography>
              <Divider sx={{ my: 2 }} />

              <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={patient.username}
                onChange={(e) =>
                  setPatient({ ...patient, username: e.target.value })
                }
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={patient.password}
                onChange={(e) =>
                  setPatient({ ...patient, password: e.target.value })
                }
              />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                onClick={createPatient}
              >
                Create Patient
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* DOCTOR */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 4 }}>
            <CardContent>
              <Typography variant="h6">Register Doctor</Typography>
              <Divider sx={{ my: 2 }} />

              <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={doctor.username}
                onChange={(e) =>
                  setDoctor({ ...doctor, username: e.target.value })
                }
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={doctor.password}
                onChange={(e) =>
                  setDoctor({ ...doctor, password: e.target.value })
                }
              />

              <TextField
                label="Speciality"
                fullWidth
                margin="normal"
                value={doctor.speciality}
                onChange={(e) =>
                  setDoctor({ ...doctor, speciality: e.target.value })
                }
              />

              <Button
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={createDoctor}
              >
                Create Doctor
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </AppLayout>
  );
}
