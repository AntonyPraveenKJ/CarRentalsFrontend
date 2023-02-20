import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Navbar from "./Navbar";
import '../style.css'
import { Box, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useSelector } from "react-redux";
axios.defaults.withCredentials = true;
let firstRender = true;

const theme = createTheme({
    palette: {
      primary: {
        main: "#000000",
      },
    },
  });

function Products() {
    const navigate = useNavigate();
    const [update,setUpdate]=useState([])
    const [cars, setCars] = useState([]);
    const [modal,setModal]=useState(false);
    const [data,setData]=useState([]);
    const [carName, setCarName] = useState("");
    const [image, setImage] = useState([]);

    const toggleModal=()=>{
        setModal(!modal)
        //console.log("form rendered on modal")
       };

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

    const getCars = async () => {
        await axios
          .get("http://localhost:5000/getAllCars")
          .then((response) => {
            console.log(response.data.cars);
            setCars(response.data.cars);
          });
      };

      const handleEdit=async(id)=>{
        console.log(id,'carId')
        await axios.get(`http://localhost:5000/getDetails/${id}`).then((response)=>{
        setData(response.data.message);
        console.log(response.data.message)
        toggleModal();
       })
      };

      const handleImageChange = (event) => {
        setImage(event.target.files[0]);
      };

      const sendEditRequest=async()=>{
        const formData = new FormData();
        formData.append("id",data._id)
        formData.append("carName", carName);
        formData.append("image", image);
    
        await axios.put('http://localhost:5000/editDetails',formData,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }).then((response)=>{
            toggleModal();
            setUpdate(response.data.updatedCar)
          })
      };

      const handleDelete=async(id)=>{
        await axios.put(`http://localhost:5000/deleteCar/${id}`).then((response)=>{
          window.confirm("Are you sure you want to delete this car details?");
          setUpdate(response.data)
        })
      }

      const handleSubmit=async(e)=>{
        e.preventDefault();
        //Sent the request to edit
        sendEditRequest().then(()=>alert("Your Data Changed SuccessFully!!"))
      }

      useEffect(() => {
        getCars();
      }, []);

      useEffect(() => {
        getCars();
      }, [update]);

  return (
    <>
    <Navbar name={admin && admin.name}/>
    <div className="heading">
        <h1>All Cars</h1>
      </div>
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper} sx={{mt:10}}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Car</TableCell>
              <TableCell align="right">Car Name</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Segment</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cars.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ width: 500 }} component="th" scope="row">
                  <img
                    className="proImg"
                    alt="proImage"
                    src={row.image[0]}
                  ></img>
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.brand}</TableCell>
                <TableCell align="right">{row.segment}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">
                    <Button
                    className="edit"
                    variant="contained"
                    style={{ backgroundColor: "blue", color: "white" }}
                    sx={{ mt: 3, mb: 2 }}
                    onClick={()=>handleEdit(row._id)}
                    >Edit</Button>
                    </TableCell>
                    <TableCell align="right">
                    <Button
                    className="delete"
                    variant="contained"
                    style={{ backgroundColor: "red", color: "white" }}
                    onClick={()=>handleDelete(row._id)}
                    sx={{ mt: 3, mb: 2 }}
                    >Delete</Button>
                    </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>


    {modal && (
    <div className="modal">
    <div onClick={toggleModal} className='overlay'></div>
    <div className='modal-content' key={data._id}>
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
           
            <Typography component="h1" variant="h5">
             Edit Details
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
                  onChange={(e) => setCarName(e.target.value)}
                 defaultValue={data.name}
                  autoFocus
                /> 
           
              <TextField
                margin="normal"
                required
                fullWidth
                id="image"
                type="file"
                name="image"
                onChange={handleImageChange}
              />
              

              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "black", color: "white" }}
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
   </div>
      )}
  </>



  )
}

export default Products