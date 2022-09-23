import React from 'react'
import { ChatState } from "../Context/ChatProvider";
import {Box} from '@chakra-ui/react';
import SingleChat from './SingleChat';

const ChatBox = ({fetchAgain, setFetchAgain}) => {
  const {selectedChat} = ChatState();
  return (
    <Box
    
    display={{
      base: selectedChat ? 'flex': "none", md:'flex'
    }}
    alignItems='center'
    flexDirection={'column'}
    color='white'
    width={
      {
        base: '100%', md:'62%'
      }
    }
    borderRadius='lg'
    borderWidth={'3px '}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}
     />
    </Box>
  )
}

export default ChatBox