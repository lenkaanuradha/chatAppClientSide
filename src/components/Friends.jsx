import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers, setpersistUsers, setReceiver } from "../redux/ReceiverSlice";
import axios from "axios";

export default function Friends(props) {
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [allRecords, setAllRecords] = useState([]);
  const loggedinUser = localStorage.getItem("userId");
  const {otherUsers} =useSelector((store)=>store.receiver)
  const { onlineUsers } = useSelector((store) => store.receiver);
  const dispatch = useDispatch();

  const handleConversation = (clickeditem) => {
    dispatch(setReceiver(clickeditem));
    props.handleWelcome();
  };

  useEffect(() => {
    fetchFriends();
  }, []); 

  const fetchFriends = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/backend/users/getallfriends/${loggedinUser}?page=${page}&limit=${10}`
      );

      if (response.data.success) {
        console.log(response.data);
        setPage((prevPage) => prevPage + 1);
        const newRecords = response.data.allfriends;
        setAllRecords((prevRecords) => [...prevRecords, ...newRecords]);
        dispatch(setOtherUsers([...allRecords, ...newRecords]));
        dispatch(setpersistUsers([...allRecords,...newRecords]))
        setTotal(response.data.totalusers);
        console.log(response.data.totalusers);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div id="scrollableDiv" className="mt-3 h-full overflow-y-scroll overflow-x-hidden">
        <InfiniteScroll
          dataLength={otherUsers.length}
          next={fetchFriends}
          hasMore={otherUsers.length < total}
          loader={<h4 className="text-black">Loading...</h4>}
          endMessage={
            <p className="text-center text-black">You have reached the end!</p>
          }
          scrollableTarget="scrollableDiv"
        >
          {otherUsers?.map((item) => (
            <div className="flex flex-col mt-1 gap-2 hover:bg-blue-500 text-white border border-none rounded m-1" key={item._id}>
              <div className='avatar p-3' onClick={() => handleConversation(item)}>
                <div className="w-10 rounded-full text-xl flex">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/public/Images/${item.profilePic}`}
                    alt="avatar"
                  />
                </div>
                <span className="text-black m-2 px-2 cursor-pointer">
                  {item.username}
                </span>
                {onlineUsers?.includes(item._id) ? (
                  <span className="flex items-center text-green-600 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                    online
                  </span>
                ) : (
                  ''
                )}
              </div>
            </div>
          ))}
        </InfiniteScroll>
      </div>
      <ToastContainer />
    </>
  );
}
