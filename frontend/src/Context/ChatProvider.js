import {createContext, useContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
const ChatContext =createContext();
const ChatProvider = ({children})=>{
      const [user, setUser] = useState();
      const history = useHistory();
      // fetching from localstorage once the page is rendered for the first time.
      useEffect(()=>{
            const userInfo = JSON.parse(localStorage.getItem("userInfoMernChat"));

            setUser(userInfo);

            if(!userInfo){
                history.push('/');  
            }
      }, [history])
      return (
            <ChatContext.Provider value={{
                  user, setUser
            }}>
                  {children} 
            </ChatContext.Provider>
      )
}
export const ChatState = () =>{
      return useContext(ChatContext); 
}
export default ChatProvider;