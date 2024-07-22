import React from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
export default function Logbar() {
  const navigate=useNavigate();
  const handleLogout =()=>{
     localStorage.removeItem("userId")
     localStorage.removeItem("token")
     localStorage.removeItem("username")
         navigate('/')
  }
  return (
    <div className="mt-auto">
    
      <button className="w-8 h-8 m-2 text-gray-400 text-2xl ml-3 " onClick={handleLogout}>
        <RiLogoutBoxLine />
      </button>
    </div>
  );
}
