import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
export default function Register() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    useremail: undefined,
    password: undefined,
    profilepic:undefined
  });

 const navigate=useNavigate();
  const handleChange = (e) => {
    if(e.target.id == 'profilepic'){
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.files[0] }));
      console.log(e.target.id)
    }
    else
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleRegister = async (e) => {
   
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", credentials.username);
    formData.append("useremail", credentials.useremail);
    formData.append("password", credentials.password);
    formData.append("file", credentials.profilepic);
  console.log(credentials.profilepic,credentials.password)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/backend/auth/register`,
        formData ,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast(response.data.message);
      }
    } catch (error) {
      console.log(error)
      console.log(error.response)
      toast("Enter Valid Credentials")
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto bg-white">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-center text-3xl text-gray-500 m-2">
            Register ChatApp
          </h1>
          <form action="" className="my-3" >

            <label className="block text-black mt-3 ">
              Email?
            <div className="input input-bordered flex items-center gap-2 bg-gray mt-1">
              <input
                id="useremail"
                type="text"
                className="grow text-black"
               
                onChange={handleChange}
                required
              />
              </div>
            </label>
            <label className="block text-black mt-3 ">
             Name?
             <div className="input input-bordered flex items-center gap-2 bg-gray mt-1">
              <input
                id="username"
                type="name"
                className="grow text-black"
              
                onChange={handleChange}
                required
              />
              </div>
            </label>
            <label className="block text-black mt-3 ">
             Profile_Pic?
             <div className="input input-bordered flex items-center gap-2 bg-gray mt-1">
              <input
                id="profilepic"
                type="file"
                className=""
              
                onChange={handleChange}
                required
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
            <div className="">
            <button
              className="btn btn-block my-3 p-4 border-none text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded "
            
            onClick={handleRegister}
            >
              Register
            </button>
            <span className="text-black mt-4 text-center block">
              Already a user? <span className="text-sky-500 hover:cursor-pointer" onClick={()=>navigate('/')}> Login</span>
            </span>
          </div>
          </form>
         
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
