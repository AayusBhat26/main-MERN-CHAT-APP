import { Avatar, border, Box, Text, Tooltip } from '@chakra-ui/react';
import React from 'react'
import { useEffect } from 'react';
// import ScrollBars from 'react-scroll'
import { useRef } from "react";

import { isLastMessage, isSameSender, messageMargin, sameUser } from '../config/ChatLogics';
import { ChatState } from '../Context/ChatProvider';
const ScrollableChat = ({message}) => {
      const {user} = ChatState(); 
  const messagteEndRef = useRef();

  useEffect(() => {
    messagteEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [message]);
  return (
    // <ScrollBars>{
    //   // console.log(message)
    // }</ScrollBars>'

    <div>
      {message &&
        message.map((singleMessage, index) => (
          <div
            style={{
              display: "flex",
            }}
            key={message._id}
          >
            {/* {console.log(isSameSender(message, singleMessage, index, user._id))} */}
            {(isSameSender(message, singleMessage, index, user._id) ||
              isLastMessage(message, index, user._id)) && (
              <Tooltip label={singleMessage.sender.name} placement="bottom">
                <Avatar
                  marginTop={"10px"}
                  cursor="pointer"
                  name={singleMessage.sender.name}
                  src={singleMessage.sender.pic}
                  marginRight={1}
                  size="sm"
                ></Avatar>
              </Tooltip>
            )}
            <span
              style={{
                color: "white",
                borderRadius: "24px",
                padding: "0.2rem 1rem",
                maxWidth: "75%",
                backgroundColor: `${
                  singleMessage.sender._id === user._id ? "#290C4F" : "#8795CF"
                }`,
                marginLeft: messageMargin(
                  message,
                  singleMessage,
                  index,
                  user._id
                ),
                marginTop: sameUser(message, singleMessage, index, user._id)
                  ? 2
                  : 11,
              }}
            >
              {singleMessage.content}
            </span>
          </div>
        ))}

        <div
            ref={messagteEndRef}
        ></div>
    </div>
  );
}

export default ScrollableChat