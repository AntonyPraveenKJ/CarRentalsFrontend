import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MenuItem } from "@mui/material";
import Appbar from './Appbar'
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const Location=[{
    _id: {
      $oid: "63efb6ac795aaacd575c533d"
    },
    name: "Aluva"
  },{
    _id: {
      $oid: "63efb6d0795aaacd575c533e"
    },
    name: "Angamaly"
  },{
    _id: {
      $oid: "63efb6d8795aaacd575c533f"
    },
    name: "Kochi"
  },{
    _id: {
      $oid: "63efb6e4795aaacd575c5340"
    },
    name: "Kothamangalam"
  },{
    _id: {
      $oid: "63efb6ec795aaacd575c5341"
    },
    name: "Muvattupuzha"
  },{
    _id: {
      $oid: "63efb6f4795aaacd575c5342"
    },
    name: "Kakkanad"
  },{
    _id: {
      $oid: "63efb6fd795aaacd575c5343"
    },
    name: "Kolenchery"
  },{
    _id: {
      $oid: "63efb706795aaacd575c5344"
    },
    name: "Cheranallur"
  },{
    _id: {
      $oid: "63efb70d795aaacd575c5345"
    },
    name: "Maradu"
  },{
    _id: {
      $oid: "63efb718795aaacd575c5346"
    },
    name: "North Paravur"
  },{
    _id: {
      $oid: "63efb723795aaacd575c5347"
    },
    name: "Vyttila"
  }]

function Filter() {
    const navigate=useNavigate();
    const [location,setLocation]=useState("");
    const [date, setDate] = useState();
    const [errors, setErrors] = useState({});
    
    const now = new Date();
    const user =
    now.getFullYear() +
    "-" +
    ("0" + (now.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + now.getDate()).slice(-2);

    const validateForm = () => {
        let newErrors = {};
        if (!location) {
          newErrors.location = "Please Select Location";
        }
        if (!date) {
          newErrors.date = "Please Select Date";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const handleSubmit=async(e)=>{
        e.preventDefault();
        if(validateForm()){
            navigate(`/availablecars?date=${date}&location=${location}`);
        }
      }

  return (
    <>
    <Appbar/>
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "black" }}>
              <ShoppingCartOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Select Location & date
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              
               
            
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="location"
                  select
                  label="Select Location"
                  name="location"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  defaultValue="None"
                >
                  {Location.map((item) => {
                    return (
                      <MenuItem key={item.name} value={item.name}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
                {errors.location && (
                <div className="error">{errors.location}</div>
              )}

                <TextField
                  fullWidth
                  id="date"
                  label="Select Date"
                  type="date"
                  defaultValue="12-01-2023"
                  sx={{ width: 220 }}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: user }}
                  onChange={(e)=>setDate(e.target.value)}
                />
                  {errors.date && (
                <div className="error">{errors.date}</div>
              )}
                

              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "black", color: "white" }}
                sx={{ mt: 3, mb: 2 }}
              >
                View Cars
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
    
  )
}

export default Filter