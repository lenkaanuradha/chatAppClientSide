import { createSlice } from "@reduxjs/toolkit";
const socketSlice=createSlice({
    name:"socket",
    initialState:{
        selectedSocket:null
    },
    reducers:{
        setselectedSocket:(state,action)=>{
            state.selectedSocket=action.payload;
        }
    }
})
export const {setselectedSocket} = socketSlice.actions;
export default socketSlice.reducer