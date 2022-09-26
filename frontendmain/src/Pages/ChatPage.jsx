import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import {Box} from '@chakra-ui/react'
import SideDrawer from '../components/SideDrawer';
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
const ChatPage = () => {
  // const {user} = ChatState();
  const {user} = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false)
  // const user = localStorage.getItem("userInfoMernChat");
  {
    // window.location.reload()
  }
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      
      {user ? <SideDrawer /> : ("Reload Page if nothing is visible")}
      <Box
        display={"flex"}
        justifyContent="space-between"
        width={"100%"}
        height="93vh"
        padding={"12px"}
      >
        {/* {
          if(user){
          window.location.reload()
          }
          todo: check why does i have to reload my page once redirected to chats page.
        } */}
        {user && (
          <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
}

export default ChatPage
