import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Appbar from './Appbar';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import {
  Button,
  CardActionArea,
  CardActions,
  Grid
} from "@mui/material";
import axios from 'axios';

function Cars() {
    const location=useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedDate = searchParams.get('date');
    const selectedLocation = searchParams.get('location');
    const [cars,setCars]=useState([]);
    const [update,setUpdate]=useState("")
    console.log(selectedDate)
    const getCars = async () => {
        await axios
          .get(`http://localhost:5000/user/getCars?date=${selectedDate}&location=${selectedLocation}`)
          .then((response) => {
            console.log(response.data.cars[0].cars);
            setCars(response.data.cars[0].cars);
          });
      };

      const handleBooking=async(id)=>{
        await axios.post('http://localhost:5000/user/bookCar',{
            carId:id,
            location:selectedLocation ,
            date:selectedDate
        }).then((response)=>{
           alert("Booking Confirmed!!");
           setUpdate(response.data.message.newBooking);
        })
      }

      useEffect(() => {
        getCars();
      }, []);

      useEffect(() => {
        getCars();
      }, [update]);

  return (
   <>
   <Appbar/>
   <div className="heading">
        <h1>All Cars</h1>
      </div>

      <Grid container spacing={2} p={4}>
        {cars.map((item) => {
          return (
            <Grid item key={item._id} xs={12} sm={6} lg={3} md={4}>
              <Card
                sx={{ maxWidth: 250, height: "100%" }}
                key={item._id}
                className="productCard"
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    sx={{ width: "250px", height: "170px" }}
                    image={item.image[0]}
                    alt="proImage"
                  />
                  <CardContent sx={{ textAlign: "center", height: "100%" }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.brand}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.segment}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      minHeight: "48px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {(item.booked==="true")?
                    <Typography variant="body2" sx={{color:'red'}}>
                        Already Booked!!
                    </Typography>:
                        <Button
                        className="book"
                        size="small"
                        variant="contained"
                        onClick={()=>handleBooking(item._id)}
                        style={{ backgroundColor: "black", color: "white" }}
                      >
                        BOOK NOW
                      </Button>
                    }
                    
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
              );
            })}
          </Grid>
   </>
  )
}

export default Cars