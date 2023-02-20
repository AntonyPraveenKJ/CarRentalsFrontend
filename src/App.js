import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddProduct from './Components/Admin/AddProduct';
import Home from './Components/Admin/Home';
import Login from './Components/Admin/Login';
import Products from './Components/Admin/Products';
import Cars from './Components/User/Cars';
import Filter from './Components/User/Filter';


function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/cars" element={<Products/>}/>
        <Route path="/addcars" element={<AddProduct/>}/>
        <Route path="/sort" element={<Filter/>}/>
        <Route path="/availablecars" element={<Cars/>}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
