import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/MessageSlice";

export default function GetMessages() {
  const [msgitems, setMsgItems] = useState([]);
  const dispatch = useDispatch();
  const { selectedReceiver } = useSelector((store) => store.receiver);
  const { selectedMessage } = useSelector((store) => store.message);

  useEffect(() => {
    const fetchMessages = async () => {
      const senderId = localStorage.getItem("userId");

      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/backend/message/getMessage/${senderId}/${selectedReceiver?._id}`
        );

        if (response.data.success) {
          const messages = Array.isArray(response.data.messages)
            ? response.data.messages.map((msg) => ({
                ...msg,
                formattedTime: formatTime(msg.createdAt), // Add formattedTime field
              }))
            : [];
          setMsgItems(messages);
          dispatch(setMessages(messages));
        } else {
          setMsgItems([]);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    if (selectedReceiver?._id) {
      fetchMessages();
    }
  }, [selectedReceiver, selectedMessage]);

  // Function to format timestamp to HH:mm AM/PM
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    return `${hours}:${minutes} ${period}`;
  };

  return (
    <div>
      <div className="flex bg-white mb-3 p-2 border">
        <div className="chat-image avatar p-2 ">
          <div className="w-10 rounded-full">
            <img
              alt="Avatar"
              src={`${import.meta.env.VITE_BACKEND_URL}/public/Images/${selectedReceiver.profilePic}`}
            />
          </div>
        </div>
        <div className="md:min-w-[550px] text-black p-3 ">
          {selectedReceiver.username}
        </div>
      </div>
      <div className="h-[35rem] overflow-y-scroll m-2">
        {msgitems.length === 0 ? (
          <h1 className="text-black text-center">Start new Conversation!!</h1>
        ) : (
          msgitems.map((item, index) => (
            <div
              key={index}
              className={`chat ${
                selectedReceiver?._id === item.receiverId
                  ? "chat-end"
                  : "chat-start"
              }`}
            >
              <div className="chat-image avatar"></div>
              <div className="chat-bubble">
                {item.message_body}
                <span className="text-xs text-gray-400 ml-2 ">
                  {item.formattedTime}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
