import React, { useContext, useEffect, useState } from "react";
import { ContextApp } from "../utils/Context";
import { LuPanelLeftOpen } from "react-icons/lu";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { RiSendPlane2Fill } from "react-icons/ri";
import Chat from "./Chat";
import { getKeycloak, getRefreshToken, logout } from "../utils/keycloak";
import { useNavigate } from "react-router-dom";
import SessionExpiredModal from "./SessionExpiredModal";
function ChatContainer() {
  const {
    setShowSlide,
    showSlide,
    setMobile,
    Mobile,
    chatValue,
    setChatValue,
    handleSend,
    setIsAuthenticated
  } = useContext(ContextApp);

  const [showModal, setShowModal] = useState(false);
  const [scenarioType, setScenarioType] = useState(" ")

  const navigate = useNavigate();
  const handleClose = async() => {

    setShowModal(false);
    setIsAuthenticated(false)
    await logout(navigate)
    // Redirect to login page or handle the session expiration logic here
  }


  useEffect(() => {
    setScenarioType(localStorage.getItem("scenario"))
  }, [])
  const kc = getKeycloak()
  // const onSend = async(type) => {
  //   if (kc) {
  //     if (kc && kc.isTokenExpired(5)) {
  //       console.log("scenarioType",scenarioType)
  //       if (scenarioType === "scenario1") {
  //         setShowModal(true);
  //       } else {
  //        const isDone= await getRefreshToken()
  //        if(isDone){
  //         if(type ==="key"){
  //           handleKeyPress()
  //         }else{
  //           handleSend()
  //         }
        
  //        }else{
  //         setShowModal(true);
  //        }
  //       }
  //     } else {
  //       if(type ==="key"){
  //         handleKeyPress()
  //       }else{
  //         handleSend()
  //       }
  //     }
  //   }

  // }

  const onSend = async (type) => {
    if (!kc) return; // Exit early if Keycloak is not initialized
  
    if (kc.isTokenExpired(5)) {
      console.log("scenarioType", scenarioType);
  
      if (scenarioType === "scenario1") {
        return setShowModal(true);
      }
  
      const isDone = await getRefreshToken();
      if (!isDone) {
        return setShowModal(true);
      }
    }
  
     handleSend();
  };

  return (
    <div
      className={
        showSlide
          ? "h-screen w-screen bg-gray-700 flex items-start justify-between flex-col p-2"
          : "h-screen w-full lg:w-[calc(100%-300px)] bg-gray-700 flex items-start justify-between flex-col p-2"
      }
    >
      <span
        className="rounded px-3 py-[9px] hidden lg:flex items-center justify-center cursor-pointer text-white m-1 hover:bg-gray-600 duration-200"
        title="Open sidebar"
        onClick={() => setShowSlide(!showSlide)}
      >
        {showSlide && <LuPanelLeftOpen />}
      </span>
      <span
        className="rounded px-3 py-[9px] lg:hidden flex items-center justify-center cursor-pointer text-white mt-0 mb-3 border border-gray-600"
        title="Open sidebar"
        onClick={() => setMobile(!Mobile)}
      >
        <HiOutlineMenuAlt2 fontSize={20} />
      </span>
      {/* chat section */}
      <Chat />
      <SessionExpiredModal showModal={showModal} handleClose={handleClose} />
      {/* chat input section */}
      <div className=" w-full  m-auto flex items-center justify-center flex-col gap-2 my-2">
        <span className="flex gap-2 items-center justify-center bg-gray-600 rounded-lg shadow-md w-[90%] lg:w-2/5 xl:w-1/2">
          <input
            type="text"
            placeholder="Send a message"
            className="h-full  text-white bg-transparent px-3 py-4 w-full border-none outline-none text-base"
            value={chatValue}
            onChange={(e) => setChatValue(e.target.value)}
          
          />
          <RiSendPlane2Fill
            title="send message"
            className={
              chatValue.length <= 0
                ? "text-gray-400 cursor-auto mx-3 text-xl"
                : "text-white cursor-pointer mx-3 text-3xl bg-green-500 p-1 rounded shadow-md "
            }
            onClick={()=>onSend("button")}
          />
        </span>
        <p className="lg:text-xs text-gray-400 text-center text-[10px]">
          Free Research Preview. ChatGPT may produce inaccurate information
          about people, places, or facts. ChatGPT
        </p>
      </div>
    </div>
  );
}

export default ChatContainer;
