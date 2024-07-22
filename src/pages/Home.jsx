import React from "react";
import { useState } from "react";
import Searchbar from "../components/Searchbar";
import Friends from "../components/Friends"
import Logbar from "../components/Logbar";
import Conversations from "../components/Conversations";
import Welcome from "../components/Welcome";
import { Provider } from "react-redux";
import store from "../redux/store";
export default function Home() {
  const [isWelcome,setisWelcome] = useState(true);
  const handleWelcome =()=>{
   
         setisWelcome(false)
  }
  return (
    <div className="grid grid-cols-3   h-full w-full  rounded-md bg-gray-200 overflow-y-hidden ">
      <div className="  flex flex-col bg-white h-screen ">
        <Searchbar />
        <div className=" px-3 "></div>
        <Provider store={store}>
        <Friends handleWelcome={handleWelcome}/>
        </Provider>
        <Logbar />
      </div>
      <div className="  col-span-2 ">
        {isWelcome? <Welcome/>:
        <Provider store={store}>
        <Conversations/>
        </Provider>
        }
      </div>
      
     
     
    </div>
  );
}
