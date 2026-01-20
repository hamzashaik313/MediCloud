// import { useState } from "react";
// import {
//   TextField,
//   Button,
//   Card,
//   CardContent,
//   Typography,
// } from "@mui/material";
// import { login } from "../api/auth";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const data = await login(username, password);

//       // ✅ ROLE BASED REDIRECT
//       if (data.role === "ROLE_ADMIN") navigate("/admin");
//       else if (data.role === "ROLE_DOCTOR") navigate("/doctor");
//       else if (data.role === "ROLE_PATIENT") navigate("/patient");
//       else setError("Unknown role");
//     } catch (err) {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         height: "100vh",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Card sx={{ width: 400 }}>
//         <CardContent>
//           <Typography variant="h5" align="center" gutterBottom>
//             MediCloud Login
//           </Typography>

//           <TextField
//             fullWidth
//             label="Username"
//             margin="normal"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />

//           <TextField
//             fullWidth
//             type="password"
//             label="Password"
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           {error && (
//             <Typography color="error" variant="body2">
//               {error}
//             </Typography>
//           )}

//           <Button
//             fullWidth
//             variant="contained"
//             sx={{ mt: 2 }}
//             onClick={handleLogin}
//           >
//             LOGIN
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login(username, password);

      if (data.role === "ROLE_ADMIN") navigate("/admin");
      else if (data.role === "ROLE_DOCTOR") navigate("/doctor");
      else if (data.role === "ROLE_PATIENT") navigate("/patient");
      else setError("Unknown role");
    } catch (e) {
      setError("Invalid username or password");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #020617 100%)",
      }}
    >
      <Card
        sx={{
          width: 420,
          borderRadius: 3,
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* BRAND */}
          <Typography
            variant="h4"
            fontWeight={800}
            align="center"
            sx={{ color: "#2563eb", mb: 1 }}
          >
            MediCloud
          </Typography>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Secure Hospital Management System
          </Typography>

          {/* USERNAME */}
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* PASSWORD */}
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          {/* LOGIN BUTTON */}
          <Button
            fullWidth
            size="large"
            variant="contained"
            sx={{
              mt: 3,
              py: 1.4,
              fontSize: 16,
              borderRadius: 2,
            }}
            onClick={handleLogin}
          >
            Sign In
          </Button>

          {/* FOOTER */}
          <Typography
            variant="caption"
            align="center"
            display="block"
            sx={{ mt: 4, color: "text.secondary" }}
          >
            © 2026 MediCloud · All rights reserved
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
