import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    adminIsLoggedIn: false,
  };



const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        adminLogin:(state)=>{
            if(state.adminIsLoggedIn===false){
                state.adminIsLoggedIn=true
            }
        },
        adminLogout:(state)=>{
            if(state.adminIsLoggedIn===true){
                state.adminIsLoggedIn=false
            }
        }
    }
});

export const { adminLogin,adminLogout } = loginSlice.actions;

export default loginSlice.reducer;