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
      // overflowY={'hidden'}
      scroll
      display={{
        base: selectedChat ? "none" : "flex",
        md: "flex",
        // sm:'none'
      }}
      flexDirection="column"
      alignItems={"center"}
      padding={4}
      width={{
        base: "100%",
        md: "35%",
      }}
      borderRadius="lg"
      borderWidth={"0.5px"}
    >
      {/* mychats and new group chat icon */}
      <Box
        padding="10px"
        fontSize={{
          base: "28px",
          md: "30px",
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
              base: "15px",
              md: "15px",
              lg: "20px",
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
        // height={"%"}
        display={"flex"}
        flexDirection="column"
        padding={1}
        borderRadius="20px"
        backgroundColor="whiteAlpha.100"
        overflowY={'hidden'}
      >
        {/* {console.log(chats)} */}
        {/* {chats ? (
          <Stack>
            {chats.map((singleChat) => {
              <Box
                onClick={() => setSelectedChat(singleChat)}
                cursor="pointer"
                backgroundColor={
                  selectedChat === singleChat
                    ? "whiteAlpha.300"
                    : "ThreeDLightShadow"
                }
                color={
                  selectedChat === singleChat
                    ? "ThreeDLightShadow"
                    : "whiteAlpha"
                }
                key={singleChat._id}
              >
                <Text>
                  {!singleChat.isGroupChat
                    ? getSender(loggedUser, singleChat.users)
                    : singleChat.chatName}
                </Text>
              </Box>;
            })}
          </Stack>
        ) : (
          <ChatLoading />
        )} */}
        {chats ? (
          // todo: add scrollable to y axis and apply styles to it.
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                backgroundColor={
                  selectedChat === chat ? "white" : "blackAlpha.500"
                }
                color={selectedChat === chat ? "black" : "white"}
                px={1}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    {/* <b>{chat.lastestMessage}</b> */}
                    {/* {chat.latestMessage > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content} */}
                  </Text>
                )}
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
