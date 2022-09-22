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
  // const user = localStorage.getItem("userInfoMernChat");
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      {user && <SideDrawer />}
      <Box display={'flex'} justifyContent='space-between' width={'100%'} height='93vh' padding={'12px'}>
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
}

export default ChatPage
