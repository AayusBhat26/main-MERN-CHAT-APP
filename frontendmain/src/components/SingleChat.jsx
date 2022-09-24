import { ArrowBackIcon, QuestionIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useState } from "react";
import {
  getSender,
  getSenderImage,
  getSenderObject,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import ProfileModel from "./ProfileModel";
import UpdateGroupChatModel from "./UpdateGroupChatModel";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const toast = useToast();
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const { user, selectedChat, setSelectedChat } = ChatState();

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        // setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        console.log(data);
        setNewMessage("")
        setMessage([...message, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.message,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    // TYPING ANIMATION
  };

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
              width={"100%"}
              display={"grid"}
              gridTemplateColumns="1fr 0.2fr"
              alignItems={"center"}
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
        // <Box
        //   display="flex"
        //   alignItems={"center"}
        //   justifyContent="center"
        //   height={"100%"}
        // >
        // </Box>
        ""
      )}
      {/* 
      <Box>
        
      </Box> */}

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
        {loading ? <Spinner size={"xl"} /> : <div>{/* MESSAGES */}</div>}
        <FormControl onKeyDown={sendMessage} isRequired mt={2}>
          <Input
            variant={"outline"}
            background="inherit"
            color={"white"}
            // fontWeight="bold"
            placeholder="Enter A Message"
            onChange={typingHandler}
            value={newMessage}
          />
        </FormControl>
        {/* chat box */}
      </Box>
    </>
  );
};

export default SingleChat;
