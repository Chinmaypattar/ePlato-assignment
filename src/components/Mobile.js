import React, { useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FiUser, FiLogOut } from "react-icons/fi";
import { SlOptions } from "react-icons/sl";
import { MdClose } from "react-icons/md";
import { ContextApp } from "../utils/Context";
import { logout } from "../utils/keycloak";
import { useNavigate } from "react-router-dom";
function Mobile() {
  const { Mobile, setMobile } = useContext(ContextApp);
  const navigate = useNavigate();
  return (
    <div className="absolute left-0 top-0 w-full z-50  bg-black/40 flex justify-between items-start">
      <div
        className={
          Mobile
            ? "h-screen bg-gray-900 w-[300px]  flex items-center justify-between p-2 text-white flex-col translate-x-0"
            : "hidden"
        }
      >
        <div className="flex items-start justify-between w-full">
          <span
            className="border border-gray-600  rounded w-full py-2 text-xs flex gap-1 items-center justify-center cursor-pointer "
            onClick={() => window.location.reload()}
          >
            <AiOutlinePlus fontSize={18} />
            New Chat
          </span>
        </div>
      
        {/* bottom section  */}
        <div className="w-full border-t border-gray-600 flex flex-col gap-2 items-center justify-center p-2">
          <span className="rounded w-full py-2 px-2 text-xs flex gap-1 items-center justify-between cursor-pointer hover:bg-gray-800 transition-all duration-300">
            <span className="flex gap-1 items-center justify-center text-sm">
              <FiUser />
              Upgrade to Plus
            </span>
            <span className="rounded-md bg-yellow-200 px-1.5 py-0.5 text-xs font-medium uppercase text-gray-800">
              NEW
            </span>
          </span>
          <span className="rounded w-full py-2 px-2 text-xs flex gap-1 items-center justify-between cursor-pointer hover:bg-gray-800 transition-all duration-300" >
            <span className="flex gap-2 items-center justify-center text-sm font-bold">
              <img
                src="/user.enc"
                alt="user"
                className="w-8 h-8 object-cover rounded-sm"
              />
              Chinmay
            </span>
            <span className="rounded-md  px-1.5 py-0.5 text-xs font-medium uppercase text-gray-500">
              <SlOptions />
            </span>
          </span>
          <button
            onClick={() => logout(navigate)}
            className="flex items-center gap-2 bg-red-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
          >
            <FiLogOut size={20} /> {/* Logout Icon */}
            Logout
          </button>
        </div>
      </div>
      {Mobile && (
        <span
          className="border border-gray-600 text-white m-2 rounded px-3 py-[9px] flex items-center justify-center cursor-pointer"
          title="Close sidebar"
          onClick={() => setMobile(!Mobile)}
        >
          <MdClose />
        </span>
      )}
    </div>
  );
}

export default Mobile;
