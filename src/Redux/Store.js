import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Login"

export const store=configureStore({
    reducer:{
        login:loginReducer
    }
})