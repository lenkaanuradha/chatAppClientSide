import {createSlice} from "@reduxjs/toolkit"
const receiverSlice  = createSlice({
    name:"receiver",
    initialState:{
        selectedReceiver:null,
        onlineUsers:null,
        otherUsers:[],
        persistUsers:[]
    },
    reducers:{
        setReceiver:(state,action)=>{
            state.selectedReceiver=action.payload;
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers=action.payload;
        },
        setOtherUsers:(state,action)=>{
            state.otherUsers=action.payload;
        },
        setpersistUsers:(state,action)=>{
            state.persistUsers=action.payload
        }
    }
})
export const {setReceiver,setOnlineUsers,setOtherUsers,setpersistUsers}= receiverSlice.actions;
export default receiverSlice.reducer