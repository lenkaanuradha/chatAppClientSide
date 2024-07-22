import React, { useEffect, useState } from "react";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import io from "socket.io-client"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setselectedSocket } from "./redux/SocketSlice.jsx";
import { setOnlineUsers } from "./redux/ReceiverSlice.jsx";

export default function App() {
  const loggedinUser = localStorage.getItem("userId");
  const {socket} =useSelector((store)=>store.socket)
 const dispatch =useDispatch();
const port =`${import.meta.env.VITE_BACKEND_URL}`
  useEffect(() => {
    if (loggedinUser) {
      const socketConnection = io(port,{
        query:{userId:localStorage.getItem("userId")}
      }); 
     
      dispatch(setselectedSocket(socketConnection))
     socketConnection.on('getOnlineUsers',(onlineUsers)=>{
          dispatch(setOnlineUsers(onlineUsers))
     })
     return ()=>socket.close();
    }
    else{
      if(socket){
        socket.close();
        dispatch(setselectedSocket(null))
      }
    }
  }, [loggedinUser]);
  return (
    <div className=" h-screen  flex items-center justify-center bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="p-4 h-[70vh]  w-[70%] border border-white flex items-center justify-content-center">
                <Login />
              </div>
            }
          />
           <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
