import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
const ChatPage = () => {
      const [chats, setChats]= useState([]);

      const fetchChats = async()=>{
            const {data} = await axios.get('/api/chat');
            setChats(data);
            // console.log(data);
      }
      // whenever this component is rendered it will be called.
      useEffect(()=>{
            fetchChats();
      },[])
  return (
    <div>
      ChatPage
    </div>
  )
}

export default ChatPage
