import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { addMessage } from '../src/redux/MessageSlice';
export default function useGetRealTimeMessages() {
  const {socket} = useSelector((store)=>store.socket);
  const {message} =useSelector((store)=>store.message);
  const dispatch =useDispatch();
  useEffect(()=>{
    socket?.on("newMessage",(newMessage)=>{
        dispatch(addMessage(newMessage));
    })
  },[socket,message,addMessage])
}
