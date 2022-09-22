import {
  Box,
  Button,
  Text,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Avatar,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  Spinner,
} from "@chakra-ui/react";
// icon imports

import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import ProfileModel from "./ProfileModel";

import { useNavigate } from "react-router-dom";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
// import ChatLoading from "../../../../frontend-errors/frontend/src/components/MISC/ChatLoading";
const SideDrawer = () => {
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const navigate = useNavigate();

  // chat provider.

  const { user, setSelectedChat, chats, setChats } = ChatState();
  const logOutHandler = () => {
    localStorage.removeItem("userInfoMernChat");
    navigate("/");
  };
  // for drawer
  const { isOpen, onOpen, onClose } = useDisclosure();

  // handling the search

  const handleSearch = async () => {
    // if (!search) {
    //   toast({
    //     title: "Please Enter something in search",
    //     status: "warning",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "top-left",
    //   });
    //   return;
    // }
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);
      // if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      // console.log(data);
      setLoading(false);

      // setting the search result.
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };


  const accessChat =async (userId)=>{
    try {
    setLoadingChat(true);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.post("/api/chat", { userId }, config);
    if(!chats.find((c)=>c._id===data._id)){
      setChats([data,...chats]);
    }
    setSelectedChat(data);
    setLoadingChat(false);
    onClose();
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }    
  }
  return (
    <>
      <Box
        backgroundColor="#00000076"
        padding={"2"}
        borderRadius="lg"
        display={"flex"}
        alignItems="center"
        justifyContent={"space-between"}
        flexDirection="row-reverse"
      >
        <Tooltip label="Search User" hasArrow placement="bottom">
          <Button
            variant={"ghost"}
            onClick={onOpen}
            _hover={{
              backgroundColor: "black",
              color: "white",
            }}
          >
            <SearchIcon></SearchIcon>
            <Text
              display={{
                base: "none",
                md: "flex",
              }}
              marginTop="10px"
              padding={"40px"}
            >
              Search
            </Text>
          </Button>
        </Tooltip>
        <Text>Chat-App</Text>
        <div>
          <Menu>{/* <MenuList></MenuList> */}</Menu>
          <Menu>
            <MenuButton
              as={Button}
              backgroundColor="ThreeDLightShadow"
              rightIcon={<ChevronDownIcon />}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModel user={user}>
                <MenuItem color={"black"}>My Profile</MenuItem>
              </ProfileModel>
              <MenuDivider />
              <MenuItem color={"black"} onClick={logOutHandler}>
                Logout
              </MenuItem>
            </MenuList>
            <MenuButton p={1}>
              <BellIcon fontSize={"25px"}></BellIcon>
            </MenuButton>
          </Menu>
        </div>
      </Box>

      <Drawer
        placement="right"
        onClose={onClose}
        isOpen={isOpen}
        colorScheme="blue"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader textAlign={"center"}>Search User</DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} paddingBottom="2">
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => {
                  handleSearch();
                  setSearch(e.target.value);
                }}
              />
              {/* onClick={handleSearch} */}
              {/* <Button>Search</Button> */}
            </Box>
            {loading ? (
              <ChatLoading users={user} />
            ) : searchResult ? (
              searchResult.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            ) : (
              ""
            )}
            {loadingChat && <Spinner ml={"auto"} display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
