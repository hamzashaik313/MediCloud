// import {
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   Stack,
// } from "@mui/material";
// import { useState } from "react";
// import { registerPatient, registerDoctor } from "../../api/admin";

// export default function AdminRegisterUser() {
//   const [pUser, setPUser] = useState("");
//   const [pPass, setPPass] = useState("");
//   const [dUser, setDUser] = useState("");
//   const [dPass, setDPass] = useState("");
//   const [specialty, setSpecialty] = useState("");

//   const handleRegisterPatient = async () => {
//     await registerPatient(pUser, pPass);
//     setPUser("");
//     setPPass("");
//     alert("Patient registered successfully");
//   };

//   const handleRegisterDoctor = async () => {
//     await registerDoctor(dUser, dPass, specialty);
//     setDUser("");
//     setDPass("");
//     setSpecialty("");
//     alert("Doctor registered successfully");
//   };

//   return (
//     <Stack spacing={3}>
//       <Typography variant="h5" fontWeight={700}>
//         Register Users
//       </Typography>

//       {/* REGISTER PATIENT */}
//       <Card>
//         <CardContent>
//           <Typography fontWeight={700}>Register Patient</Typography>
//           <Stack direction="row" spacing={2} mt={2}>
//             <TextField
//               label="Username"
//               value={pUser}
//               onChange={(e) => setPUser(e.target.value)}
//             />
//             <TextField
//               label="Password"
//               type="password"
//               value={pPass}
//               onChange={(e) => setPPass(e.target.value)}
//             />
//             <Button variant="contained" onClick={handleRegisterPatient}>
//               Register
//             </Button>
//           </Stack>
//         </CardContent>
//       </Card>

//       {/* REGISTER DOCTOR */}
//       <Card>
//         <CardContent>
//           <Typography fontWeight={700}>Register Doctor</Typography>
//           <Stack direction="row" spacing={2} mt={2}>
//             <TextField
//               label="Username"
//               value={dUser}
//               onChange={(e) => setDUser(e.target.value)}
//             />
//             <TextField
//               label="Password"
//               type="password"
//               value={dPass}
//               onChange={(e) => setDPass(e.target.value)}
//             />
//             <TextField
//               label="Specialty"
//               value={specialty}
//               onChange={(e) => setSpecialty(e.target.value)}
//             />
//             <Button
//               variant="contained"
//               color="success"
//               onClick={handleRegisterDoctor}
//             >
//               Register
//             </Button>
//           </Stack>
//         </CardContent>
//       </Card>
//     </Stack>
//   );
// }



import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { registerPatient, registerDoctor } from "../../api/admin";

export default function AdminRegisterUser() {
  const [pUser, setPUser] = useState("");
  const [pPass, setPPass] = useState("");
  const [dUser, setDUser] = useState("");
  const [dPass, setDPass] = useState("");
  const [specialty, setSpecialty] = useState("");

  const handleRegisterPatient = async () => {
    await registerPatient(pUser, pPass);
    setPUser("");
    setPPass("");
    alert("Patient registered successfully");
  };

  const handleRegisterDoctor = async () => {
    await registerDoctor(dUser, dPass, specialty);
    setDUser("");
    setDPass("");
    setSpecialty("");
    alert("Doctor registered successfully");
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h5" fontWeight={700}>
        Register Users
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
    </Stack>
  );
}
