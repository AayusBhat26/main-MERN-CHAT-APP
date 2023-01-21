import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getSender } from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import ChatLoading from "./ChatLoading";
import GroupChatModel from "./GroupChatModel";

const MyChats = ({ fetchAgain }) => {
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
      console.log(data);
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

  useEffect(() => {
    setLoggeduser(JSON.parse(localStorage.getItem("userInfoMernChat")));
    // console.log('hi',selectedChat);
    fetchChats();
  }, [fetchAgain]);
  return (
    <Box
      display={{
        base: selectedChat ? "none" : "flex",
        md: "flex",
        // sm:'none'
      }}
      flexDirection="column"
      alignItems={"center"}
      padding={1}
      width={{
        base: "100%",
        md: "25%",
        // fontsize:'10px'
      }}
    >
      {/* mychats and new group chat icon */}
      <Box
        padding="5px"
        fontSize={{
          base: "22px",
          md: "20px",
        }}
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        Chats
        <GroupChatModel>
          <Button
            backgroundColor={"transparent"}
            display={"flex"}
            fontSize={{
              base: "10px",
              md: "10px",
              lg: "10px",
            }}
            _hover={{
              backgroundColor: "ThreeDLightShadow",
            }}
            rightIcon={<AddIcon />}
          >
            New Group
          </Button>
        </GroupChatModel>
      </Box>

      {/* displaying all chats that the logged in user have. */}

      <Box
        width={"100%"}
        display={"flex"}
        flexDirection="column"
        // padding={1}
        marginLeft={"-20px"}
        padding="2px"
        textAlign={"center"}
        borderRadius="10px"
        backgroundColor="whiteAlpha.100"
      >
        {chats ? (
          // todo: add scrollable to y axis and apply styles to it.
          <Stack
            // overflowY="scroll"
            height={"80vh"}
            scrollBehavior={"smooth"}
            // overflowY="auto"
            // scrollBehavior={"smooth"}
            css={{
              "&::-webkit-scrollbar": {
                width: "1px",
              },
              "&::-webkit-scrollbar-track": {
                width: "1px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "red",
                borderRadius: "1px",
              },
            }}
          >
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                backgroundColor={
                  selectedChat === chat ? "white" : "blackAlpha.900"
                }
                color={selectedChat === chat ? "black" : "white"}
                px={1}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={'40px'}
                >
                  <Box>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Box>
                  <Box
                  fontSize={'10px'}
                  >{chat.isGroupChat ? "G" : "NG"}</Box>
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    {/* <b>{chat.lastestMessage}</b> */}
                    {/* {chat.latestMessage > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content} */}
                  </Text>
                )}
                {/* <Box
                  display={"flex"}
                  justifyContent={"normal"}
                  alignItems={"center"}
                >
                  
                </Box> */}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
