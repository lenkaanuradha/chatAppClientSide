import { createSlice } from "@reduxjs/toolkit";
const messageSlice = createSlice({
     name:"message",
     initialState:{
        selectedMessage:[],
     },
   reducers:{
    setMessages:(state,action)=>{
        state.selectedMessage=action.payload;
    },
    addMessage: (state, action) => {
        state.selectedMessage.push(action.payload);
      }
}

})
export const {setMessages,addMessage}= messageSlice.actions;
export default messageSlice.reducer

