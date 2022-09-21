import React, { useEffect, useState } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { ChatState } from '../Context/ChatProvider';
import { Box } from '@chakra-ui/react';
import MyChats from '../components/MISC/MyChats';
import ChatBox from '../components/MISC/ChatBox';
import SideDrawer from '../components/MISC/SideDrawer';

// how do we take something from context api.


const ChatPage = () => {
      const {user} = ChatState();
  return (
    <Container>
      {/* sidedrawer */}
      {user &&<SideDrawer/>}

      <Box className="mainContainer">
        <Box className="innerContainer">{user && <MyChats></MyChats>}</Box>
        <Box className="innerContainer">{user && <ChatBox></ChatBox>}</Box>
      </Box>
    </Container>
  );
}
const Container = styled.div`
  color: whitesmoke;
  width: 100%;
  .mainContainer {
    width: 100%;
    height: 90%;
    padding: 1rem;
    display: grid;
    grid-template-columns: 30% 70%;
    column-gap: 0.5rem;

    .innerContainer {
      border: 0.009rem solid white;
    }
  }
`;
export default ChatPage
