import axios from "axios";
//import Navbar from "./Navbar";
import React, { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import {
//   Button,
//   CardActionArea,
//   CardActions,
//   Grid,
//   IconButton,
// } from "@mui/material";
//import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
let firstRender = true;

function Home() {
    
    //const navigate = useNavigate();
   // const [products, setProducts] = useState([]);
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
    
    //   const getProducts = async () => {
    //     await axios
    //       .get("http://localhost:5000/admin/getAllProducts")
    //       .then((response) => {
    //         console.log(response.data.products);
    //         setProducts(response.data.products);
    //       });
    //   };
    
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
    </>
    
  )
}

export default Home