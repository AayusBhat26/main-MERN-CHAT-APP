import { ArrowBackIcon, QuestionIcon } from '@chakra-ui/icons';
import { Avatar, Box, IconButton, Text } from '@chakra-ui/react';
import React from 'react'
import { getSender, getSenderImage, getSenderObject } from '../config/ChatLogics';
import { ChatState } from '../Context/ChatProvider'
import ProfileModel from './ProfileModel';
import UpdateGroupChatModel from './UpdateGroupChatModel';

const SingleChat = ({fetchAgain, setFetchAgain}) => {

      const {user, selectedChat, setSelectedChat} = ChatState();
  return (
    // todo: create the singlechat ui
    <>
      {selectedChat ? (
        <Text
          fontSize={{
            base: "18px",
            md: "22px",
          }}
          //     paddingBottom={3}
          border="1px solid white"
          //   paddingX={2}
          padding={"5px"}
          borderRadius="10px"
          //     paddingX="20px"
          width="100%"
          display={"flex"}
          alignItems={"center"}
          justifyContent={
            {
              //   base: "space-",
            }
          }
        >
          {/* how to add an icon depending upon the size of the screen */}
          <IconButton
            backgroundColor="inherit"
            _hover={{
              backgroundColor: "black",
            }}
            display={{
              base: "flex",
              md: "none",
            }}
            icon={<ArrowBackIcon />}
            onClick={() => setSelectedChat("")}
          />

          {!selectedChat.isGroupChat ? (
            <Box cursor={"pointer"}>
              <ProfileModel user={getSenderObject(user, selectedChat.users)}>
                <Avatar
                  // marginRight={"10px"}
                  src={getSenderImage(user, selectedChat.users)}
                ></Avatar>
                <Box>{getSender(user, selectedChat.users)}</Box>
              </ProfileModel>
            </Box>
          ) : (
            <Box 
            width={'100%'}
            display={'grid'}
            gridTemplateColumns='1fr 0.2fr'
            alignItems={'center'}

            >
              {/* <QuestionIcon marginRight={"10px"} /> */}
              
              {selectedChat.chatName.toUpperCase()}
              
                  <UpdateGroupChatModel
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  /> 
            </Box>
          )}
        </Text>
      ) : (
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent="center"
          height={"100%"}
        >
          <Text fontSize={"2xl"}>Select A Chat</Text>
        </Box>
      )}

      <Box
        display={"flex"}
        flexDirection="column"
        justifyContent={"flex-end"}
        backgroundColor="whiteAlpha.100"
        width={"100%"}
        height={"100%"}
        borderRadius="lg"
        overflowY={"hidden"}
        //   padding='10px'
      >
        {/* chat box */}
       
      </Box>
    </>
  );
}

export default SingleChat
