import React, { useRef } from "react";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { toast } from "react-toastify";
import axios from "axios";
import { Provider } from "react-redux";
import store from "../redux/store";
import GetMessages from "./GetMessages";
import { useSelector } from "react-redux";

import { setMessages } from "../redux/MessageSlice";
import useGetRealTimeMessages from "../../hooks/useGetRealTimeMessages";
export default function Conversations(props) {
  const searchInputRef = useRef(null);
  const [msgbody, setMsgbody] = useState("");

  const { selectedReceiver } = useSelector((store) => store.receiver);

  const handleChange = (e) => {
    e.preventDefault();
    setMsgbody(e.target.value);
  };

  const handleSend = async () => {
    const senderId = localStorage.getItem("userId");
   
    const reqbdy = { message_body: msgbody };
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/backend/message/sendMessage/${senderId}/${selectedReceiver?._id}`,
        reqbdy
      );
      if (response.data.success) {
        setMsgbody("")
        useGetRealTimeMessages();
      }
    } catch (error) {
      console.log("error", error);
      toast(error.response);
    }
  };

  return (
    <div className="flex flex-col w-full  gap-2 ">
      <Provider store={store}>
        <GetMessages />
      </Provider>

      <div className="flex  gap-2 mt-3  w-full fixed bottom-0 mb-2">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="  Send Message.."
          id="msg"
          value={msgbody}
          className="input input-bordered w-[60%] ml-4 "
          onChange={handleChange}
        />
        <button
          className="btn bg-sky-500 text-white text-xl mr-2"
          onClick={handleSend}
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
}
