import React, { useEffect, useState } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { ChatState } from '../Context/ChatProvider';

// how do we take something from context api.


const ChatPage = () => {
      const {user} = ChatState();
  return (
    <Container>
    Hi
    </Container>
  )
}
const Container = styled.div`
color: whitesmoke;
width: 100%;

`
export default ChatPage
