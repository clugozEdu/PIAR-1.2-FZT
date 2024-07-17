import React, { useState, useEffect } from "react";
import {
  Alert,
  AlertTitle,
  Snackbar,
  Box,
  Button,
  CircularProgress,
  TextField,
  Paper,
  Grid,
  CssBaseline,
  Typography,
  Link,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdvisors } from "../../redux/loginAdvisor/advisorLoginSlice";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https:/fundacionzt.org/">
        Fundación Zamora Teran
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.advisorData
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowAlert(false);
    dispatch(fetchAdvisors(email));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    } else if (error) {
      setShowAlert(true);
    }
  }, [isAuthenticated, error, navigate]);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} sm={4} md={7} lg={7} className="backgroundLogin" />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        lg={5}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            marginBottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="src/assets/Logo.png"
            alt="Logo"
            style={{ height: "100px" }}
          />
          <Typography component="h1" variant="h5" sx={{ marginTop: 2 }}>
            Inicio de Sesión
          </Typography>
          {showAlert && (
            <Snackbar
              open={showAlert}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert severity="error" sx={{ mt: 2, borderRadius: 4 }}>
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            </Snackbar>
          )}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico @fztedu.org"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box sx={{ position: "relative" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading || !email || !password}
                startIcon={isLoading ? <CircularProgress size={24} /> : null}
              >
                {isLoading ? "Accediendo..." : "Iniciar Sesión"}
              </Button>
            </Box>
            <Copyright marginTop={2} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

// import React, { useState, useEffect } from "react";
// import {
//   Alert,
//   AlertTitle,
//   Snackbar,
//   Box,
//   Button,
//   CircularProgress,
//   TextField,
//   Paper,
//   Grid,
//   CssBaseline,
//   Typography,
//   Link,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAdvisors } from "../../redux/loginAdvisor/advisorLoginSlice";
// import { useNavigate } from "react-router-dom";
// import "../../App.css";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Copyright © "}
//       <Link color="inherit" href="https:/fundacionzt.org/">
//         Fundación Zamora Teran
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// export default function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showAlert, setShowAlert] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoading, error, isAuthenticated } = useSelector(
//     (state) => state.advisorData
//   );

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setShowAlert(false);
//     dispatch(fetchAdvisors(email));
//   };

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/home");
//     } else if (error) {
//       setShowAlert(true);
//     }
//   }, [isAuthenticated, error, navigate]);

//   return (
//     <Box
//       sx={{
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#f0f0f0", // Color de fondo para la página
//       }}
//     >
//       <Grid
//         container
//         component={Paper}
//         elevation={6}
//         sx={{
//           width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
//           padding: 4,
//           borderRadius: 2,
//           boxShadow: 3,
//           backgroundColor: "#fff", // Color de fondo para la tarjeta
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <CssBaseline />
//         <img src="src/assets/Logo.png" alt="Logo" style={{ height: "100px" }} />
//         <Typography component="h1" variant="h5" sx={{ marginTop: 2 }}>
//           Inicio de Sesión
//         </Typography>
//         {showAlert && (
//           <Snackbar
//             open={showAlert}
//             anchorOrigin={{ vertical: "top", horizontal: "right" }}
//           >
//             <Alert severity="error" sx={{ mt: 2, borderRadius: 4 }}>
//               <AlertTitle>Error</AlertTitle>
//               {error}
//             </Alert>
//           </Snackbar>
//         )}
//         <Box
//           component="form"
//           noValidate
//           onSubmit={handleSubmit}
//           sx={{ mt: 1, width: "100%" }}
//         >
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Correo electrónico @fztedu.org"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Contraseña"
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <Box sx={{ position: "relative" }}>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//               disabled={isLoading || !email || !password}
//               startIcon={isLoading ? <CircularProgress size={24} /> : null}
//             >
//               {isLoading ? "Accediendo..." : "Iniciar Sesión"}
//             </Button>
//           </Box>
//         </Box>
//         <Typography
//           variant="body2"
//           color="textSecondary"
//           align="center"
//           sx={{ mt: 2 }}
//         >
//           <Copyright />
//         </Typography>
//       </Grid>
//     </Box>
//   );
// }
