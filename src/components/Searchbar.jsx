import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../redux/ReceiverSlice";
import { toast, ToastContainer } from "react-toastify";

export default function Searchbar() {
  const [search, setSearch] = useState("");
  const { otherUsers, persistUsers } = useSelector((store) => store.receiver);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();

    const searcheduserObj = otherUsers?.filter((user) =>
      user.username.toLowerCase().includes(search.toLowerCase())
    );
    console.log(searcheduserObj);
    if (searcheduserObj.length > 0) {
      dispatch(setOtherUsers(searcheduserObj));
    } else {
      toast.error("User not found!");
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    setSearch("");
    dispatch(setOtherUsers(persistUsers));
  };

  return (
    <div className="relative flex items-center m-2">
      <form className="flex items-center w-full" onSubmit={handleSearch}>
        <div className="relative w-full">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search…"
            className="input input-bordered w-full pl-4 pr-10"
            style={{ paddingRight: search ? '2.5rem' : '1rem' }} 
          />
          {search && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              onClick={handleClose}
            >
              <FaTimes className="w-6 h-6 outline-none p-[1px]" />
            </button>
          )}
        </div>
        <button type="submit" className="btn btn-square bg-sky-500 text-white ml-2">
          <FaSearch className="w-6 h-6 outline-none p-[1px]" />
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
