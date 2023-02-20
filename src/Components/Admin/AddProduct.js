import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import axios from "axios";
import Navbar from "./Navbar";
axios.defaults.withCredentials = true;
let firstRender = true;

const theme = createTheme();

const Brands= [
    {
        _id: {
          $oid: "63efb761795aaacd575c5349"
        },
        name: "Maruti Suzuki"
      },{
        _id: {
          $oid: "63efb783795aaacd575c534a"
        },
        name: "Hyundai"
      },{
        _id: {
          $oid: "63efb78b795aaacd575c534b"
        },
        name: "Mahindra"
      },{
        _id: {
          $oid: "63efb793795aaacd575c534c"
        },
        name: "Tata"
      },{
        _id: {
          $oid: "63efb79b795aaacd575c534d"
        },
        name: "Toyota"
      },{
        _id: {
          $oid: "63efb7a4795aaacd575c534e"
        },
        name: "Kia"
      },{
        _id: {
          $oid: "63efb7ae795aaacd575c534f"
        },
        name: "Volkswagen"
      },{
        _id: {
          $oid: "63efb7b5795aaacd575c5350"
        },
        name: "Renault"
      },{
        _id: {
          $oid: "63efb7bd795aaacd575c5351"
        },
        name: "Nissan"
      },{
        _id: {
          $oid: "63efb7c5795aaacd575c5352"
        },
        name: "Skoda"
      }
];

const Segment=[
    {name:"Sedan"},
    {name:"HatchBack"},
    {name:"SUV"},
    {name:"MUV"},
]

function AddProduct() {
  const [image, setImage] = useState([]);
  const [carName, setCarName] = useState("");
  const [brand,setBrand] = useState("");
  const [segment,setSegment] = useState("")
  const [errors, setErrors] = useState({});
  const Admin= useSelector((state) => state.login);
  const [admin, setAdmin] = useState([]);
  
  const refreshToken = async () => {
    const res = await axios
      .get("http://localhost:5000/refresh", {
        withCredentials: true,
      }).catch((err) => console.log(err));
      const data = await res.data;
      console.log(data,'After  refresh')
      return data;
    };
  
    const sendRequest = async () => {
      const res = await axios
        .get("http://localhost:5000/home", {
          withCredentials: true,
        })
        .catch((err) => console.log(err));
      const data = await res.data;
      console.log(data, "=== user data before refreshing");
      return data;
    };

  const validateForm = () => {
    let newErrors = {};
    if (!carName) {
      newErrors.carName = "Please Enter Car Name";
    }
    if (!brand) {
      newErrors.brand = "Please Select Brand Name";
    }
    if (!segment) {
      newErrors.segment = "Please Select Car Segment";
    }
    if (!image) {
      newErrors.image = "Please select Image";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addNewCar = async () => {
    const formData = new FormData();
    formData.append("carName", carName);
    formData.append("brand", brand);
    formData.append("segment", segment);
    formData.append("image", image);

    const res = await axios
      .post("http://localhost:5000/addNewCar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((err) => console.log(err));
    return res.data;
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    //send http request
    if (validateForm()) {
        addNewCar()
        .then(() => alert("Car Added Successfully!!"))
        .then(() => {
          setCarName("");
          setBrand("");
          setSegment("");
          setImage("");
        });
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    // getProducts();
     if (Admin.adminIsLoggedIn) {
       if (firstRender) {
         firstRender = false;
         sendRequest().then((data) => setAdmin(data.message));
       }
       let interval = setInterval(() => {
         refreshToken().then((data) => setAdmin(data.message));
       }, 1000 * 29);
 
       return () => clearInterval(interval);
     }
   }, []);

  return (
    <>
      <Navbar name={admin && admin.name}/>
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
              Add Car
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
                  id="carName"
                  label="Car Name"
                  name="carName"
                  autoComplete="carName"
                  value={carName}
                  onChange={(e) => setCarName(e.target.value)}
                  autoFocus
                /> 
              {errors.carName && <div className="error">{errors.carName}</div>}
            
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="brand"
                  select
                  label="Select Brand"
                  name="brand"
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                  }}
                  defaultValue="None"
                >
                  {Brands.map((item) => {
                    return (
                      <MenuItem key={item.name} value={item.name}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
                {errors.brand && (
                <div className="error">{errors.brand}</div>
              )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="segment"
                  select
                  label="Select Segment"
                  name="segment"
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  defaultValue="None"
                >
                  {Segment.map((item) => {
                    console.log(item);
                    return (
                      <MenuItem key={item.name} value={item.name}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              {errors.segment && (
                <div className="error">{errors.segment}</div>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="image"
                type="file"
                name="image"
                onChange={handleImageChange}
              />
              {errors.image && <div className="error">{errors.image}</div>}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "black", color: "white" }}
                sx={{ mt: 3, mb: 2 }}
              >
                Add Car
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default AddProduct;
