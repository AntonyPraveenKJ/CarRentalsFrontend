import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import "../style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../Redux/Login";


const theme = createTheme();

function Login() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
      
    
      const [errors, setErrors] = useState({});
    
      const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
      };
    
      const validateForm = () => {
        let newErrors = {};
        if (!formData.email) {
          newErrors.email = "Enter Valid Email";
        }
        if (!formData.password) {
          newErrors.password = "Enter Valid Password";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const sendRequest=async()=>{
       const res= await axios.post("http://localhost:5000/login",{
            email:formData.email,
            password:formData.password,
        }).catch((err)=>{
            console.log(err);
        })
        const data=await res.data;
        return data;
      };

      const handleSubmit=(event)=>{
         event.preventDefault();
         if(validateForm()){
            //submit form to the server

            sendRequest().then(()=>dispatch(adminLogin())).then(()=>navigate('/home'));
         }
      }
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(istockphoto-1281150061-612x612.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "black" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

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
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                autoFocus
              />
              {errors.email && <div className="error">{errors.email}</div>}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "black", color: "white" }}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default Login