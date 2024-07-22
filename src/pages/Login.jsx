import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [credentials, setCredentials] = useState({
    useremail: undefined,
    password: undefined,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/backend/auth/login`,
        credentials
      );

      if (response.data.success) {
      
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        navigate("/home");
      }
      else{
        console.log(response.data,"response")
      }
    } catch (error) {
    
      toast(error.response.data.error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto bg-white border border-red ">
        <div className="w-full p-6 rounded-lg shadow-md  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-center text-3xl text-gray-500">Login ChatApp</h1>
          <form action="" className="my-3">
            <label className="block text-black mt-3">
              Email?
              <div className="input input-bordered flex items-center gap-2 bg-gray mt-1">
                <input
                  id="useremail"
                  type="email"
                  className="grow text-black"
                 
                  onChange={handleChange}
                />
              </div>
            </label>

            <label className="block text-black mt-3">
              Password?
              <div className="input input-bordered flex items-center gap-2 bg-gray mt-1">
                <input
                  id="password"
                  type="password"
                  className="grow text-black"
                 
                  onChange={handleChange}
                />
              </div>
            </label>
          </form>
          <div className="">
            <button
              className="btn btn-block mt-2 p-4 border-none text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded"
              onClick={handleLogin}
            >
              Login
            </button>
            <span className="text-black mt-5 mb-3 text-center block ">
              Not a member? <span className="text-sky-500 hover:cursor-pointer" onClick={()=>navigate('/register')}>SignUp now</span>
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
