import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { SettingsIcon, TriangleDownIcon, ViewIcon } from "@chakra-ui/icons";
import { ChatState } from "../Context/ChatProvider";
import UserListGroupAdd from "./UserListGroupAdd";
import axios from "axios";
import UserListItem from "./UserListItem";
const UpdateGroupChatModel = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const { selectedChat, setSelectedChat, user } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groupRenameLoading, setGrouRenameLoading] = useState(false);
  const toast = useToast();
  const handleRename = async () => {
    // alert();
    if (!groupChatName) {
      return;
    } else {
      try {
        setGrouRenameLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.put(
          "/api/chat/rename",
          {
            chatId: selectedChat._id,
            chatName: groupChatName,
          },
          config
        );

        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setGrouRenameLoading(false);
        // onClose();
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.message,
          status: "error",
          duration: 4500,
          isClosable: true,
          position: "bottom-left",
        });
        setGrouRenameLoading(false);
      }
    }
    setGroupChatName("");
  };
  const handleRemove = async (U) => {
    if (selectedChat.groupAdmin._id !== user._id && U._id !== user._id) {
      toast({
        title: "Only Admins Can Remove!",
        status: "error",
        duration: 4500,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/chat/groupremove",
        {
          chatId: selectedChat._id,
          userId: U._id,
        },
        config
      );

      // once the user has removed or left the group by himself, then i have to set the selected chat as null or empty

      U._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.message,
        status: "error",
        duration: 4500,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };
  const handleSearch = async (passedVal) => {
    setSearch(passedVal);
    if (!passedVal) {
      return;
    } else {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`/api/user?search=${search}`, config);
        console.log(data);
        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.message.data.message,
          status: "error",
          duration: 4500,
          isClosable: true,
          position: "bottom-left",
        });
        setLoading(false);
      }
    }
  };

  // adding user from group settings
  const handleAddUser = async (userT) => {
    if (selectedChat.users.find((u) => u._id === userT._id)) {
      toast({
        title: "User Already Present!",
        status: "warning",
        duration: 4500,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only Admins Can Add Someone!",
        status: "warning",
        duration: 4500,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "/api/chat/groupadd",
        {
          chatId: selectedChat._id,
          userId: userT._id,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured",
        status: "error",
        duration: 4500,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
    setGrouRenameLoading(false);
  };

  return (
    <>
      <Tooltip label="Edit Group Chat" placement="bottom" fontSize={"10px"}>
        <IconButton
          backgroundColor={"inherit"}
          _hover={{
            backgroundColor: "black",
            color: "white",
          }}
          display={{
            base: "flex",
          }}
          icon={<SettingsIcon />}
          onClick={onOpen}
        />
      </Tooltip>

      <Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            backgroundColor={"inherit"}
            border="1px solid white"
            color={"white"}
          >
            <ModalHeader textAlign={"center"} backgroundColor="black">
              Group Settings
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Tooltip label="Current Group Name" placement="bottom">
                <Text
                  display={"flex"}
                  justifyContent="center"
                  fontWeight={"800"}
                >
                  {" "}
                  {selectedChat.chatName}
                </Text>
              </Tooltip>

              {/* rendering all of the user in the group. */}

              <Box color={"black"}>
                {selectedChat
                  ? selectedChat.users.map((U) => (
                      <UserListGroupAdd
                        key={user._id}
                        user={U}
                        handleFunction={() => handleRemove(U)}
                      />
                    ))
                  : "No user/s Here"}
              </Box>
              {/* {selectedChat.groupAdmin._id ===} */}
              <FormControl
                display={"flex"}
                marginTop="30px"
                marginLeft={"20px"}
                width="100%"
              >
                <Input
                  marginBottom={5}
                  placeholder="New Name"
                  value={groupChatName}
                  onChange={(e) => setGroupChatName(e.target.value)}
                  width="70%"
                  marginRight={"20px"}
                />
                <Button
                  padding={"10px"}
                  variant={"solid"}
                  colorScheme="blue"
                  fontSize={"14px"}
                  isLoading={groupRenameLoading}
                  onClick={handleRename}
                >
                  {/* {console.log(groupRenameLoading)} */}
                  Update Name
                </Button>
              </FormControl>

              {/* todo: add new memebers to group functionality */}

              {/* showing input field only if user is admin */}
              {user._id === selectedChat.groupAdmin._id ? (
                <FormControl
                  display={"flex"}
                  marginTop="30px"
                  marginLeft={"20px"}
                  width="100%"
                >
                  <Input
                    marginBottom={5}
                    placeholder="Add new User to group"
                    onChange={(e) => handleSearch(e.target.value)}
                    width="70%"
                    marginRight={"20px"}
                  />
                </FormControl>
              ) : (
                <Text
                  textAlign={"center"}
                  marginTop="10px"
                  color={"whitesmoke"}
                  fontWeight="700"
                >
                  Ask Admin To Add New User
                </Text>
              )}
              {loading ? (
                <Spinner size={"lg"} />
              ) : searchResult ? (
                searchResult
                  .slice(0, 4)
                  .map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleAddUser(user)}
                    />
                  ))
              ) : (
                ""
              )}
            </ModalBody>

            <ModalFooter>
              <Button
                fontSize={"10px"}
                colorScheme="red"
                onClick={() => handleRemove(user)}
              >
                Leave Group
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};
  

  //   handlesearch
 


export default UpdateGroupChatModel;
