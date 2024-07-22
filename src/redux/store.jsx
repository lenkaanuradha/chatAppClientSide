import {configureStore} from "@reduxjs/toolkit"
import receiverSlice from "./ReceiverSlice.jsx";
import messageSlice from "./MessageSlice.jsx";
import socketSlice from "./SocketSlice.jsx";
const store = configureStore({
    reducer:{
    
        receiver: receiverSlice,
        message:messageSlice,
        socket:socketSlice

    
    }
});
export default store;