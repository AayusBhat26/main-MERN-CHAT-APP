import { useEffect, useState } from "react";

// import {useNavigate} from 'react-router-dom'
const { createContext, useContext } = require("react");
const ChatContext = createContext();

const ChatProvider = ({children}) =>{
      // const navigate = useNavigate();
      const [user, setUser] = useState();
      const [selectedChat,setSelectedChat] = useState();
      const [chats, setChats] = useState();
      // fetching the detailsof user from localstorage.
      useEffect(()=>{
            const userInfo = JSON.parse(
              localStorage.getItem("userInfoMernChat")
            );
            setUser(userInfo);
      },[])
      // console.log(user);
      
      return (
        <ChatContext.Provider
          value={{
            user,
            setUser,
            selectedChat,
            setSelectedChat,
            chats,
            setChats,
          }}
        >
          {children}
        </ChatContext.Provider>
      );
}
// this helps in provoding the context to entire app.
export const ChatState = ()=>{
      return useContext(ChatContext);
}
export default ChatProvider;