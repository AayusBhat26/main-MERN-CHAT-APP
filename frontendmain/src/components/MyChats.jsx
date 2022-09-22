import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { ChatState } from '../Context/ChatProvider'

const MyChats = () => {
  const [loggedUser, setLoggeduser] = useState();
  const toast = useToast();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  // fetching the chat.

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 4500,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(()=>{
    setLoggeduser(JSON.parse(localStorage.getItem('userInfoMernChat')));
    fetchChats();
  },[])
  return <div>mychats</div>;
}

export default MyChats
