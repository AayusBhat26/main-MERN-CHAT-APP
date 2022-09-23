import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
  Divider,
  Box,
  FormControl,
  Input,
  Text,
} from "@chakra-ui/react";

import UserListItem from './UserListItem';
import { useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import axios from 'axios';
import UserListGroupAdd from './UserListGroupAdd';
const GroupChatModel = ({children}) => {
      const { isOpen, onOpen, onClose } = useDisclosure();

      // states for group chat.
      const [groupChatName,setGroupChatName] = useState('');
      const [selectedUsers, setSelectedUsers] = useState([]);
      const [search, setSearch] = useState("");
      const [searchResult, setSearchResult] = useState([])
      const [loading,setLoading] = useState(false); 
      const toast = useToast();

      const {user, chats, setChats} = ChatState();

      // for hanlding the search results for group chats.

      const handleSearch = async(query) =>{
            if (!query) { 
                  return;
            }
            try {
                 setLoading(true);
                 const config  = {
                  headers:{
                        Authorization: `Bearer ${user.token}`
                  }
                 } 
                 const {data} = await axios.get(`/api/user?search=${search}`, config);
                 setLoading(false);
                 setSearchResult(data);
                 console.log(data);
            // todo: check for a particular user 
            } catch (error) {
                   toast({
                     title: "Error Occured!",
                     description: "Failed to Load the chats",
                     status: "error",
                     duration: 4500,
                     isClosable: true,
                     position: "bottom-left",
                   });
            }
            setSearch(query);
            
      }

      const handleSubmit = async()=>{
        console.log(groupChatName);
        if(!groupChatName ){
          toast({
            title: "Provide A Group Name",
            status: "warning",
            duration: 3200,
            isClosable: true,
            position: "top-right",
          });
          return;
        }

         if (!selectedUsers) {
           toast({
             title: "Provide Users",
             status: "warning",
             duration: 3200,
             isClosable: true,
             position: "top-right",
           });
           return;
         }
         try {
          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }; 
          const { data } = await axios.post("api/chat/group", {
            name: groupChatName,
            users: JSON.stringify(selectedUsers.map(U=> U._id))
          }, config);

          // todo: add the chat at the top of the chats.
          setChats([data, ...chats])
          onClose();
           toast({
             title: `Group ${groupChatName} Has Been Created`,
             status: "success",
             duration: 3500,
             isClosable: true,
             position: "top-right",
           });
         } catch (error) {
           toast({
             title: "Error Occured",
             description: error.message,
             status: "warning",
             duration: 3200,
             isClosable: true,
             position: "top-right",
           });
         }
      }

      const handleGroup = (userToAdd)=>{
        if(selectedUsers.includes(userToAdd)){
          toast({
            title:'User Already Present In the Group',
            status:'warning',
            duration:3200,
            isClosable:true, 
            position:"top-right"
          })
          return;
        }
        else{
          setSelectedUsers([...selectedUsers, userToAdd]);
        }
      }

      const handleDelete = (userDelete)=>{
        setSelectedUsers(
          selectedUsers.filter((sel) => sel._id !== userDelete._id)
        );

      }
  return (
    <Box>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          width={"100%"}
          // height="40%"
          border={"1px solid white"}
          color="whiteAlpha.900"
          backgroundColor={"inherit"}
          display="flex"
          justifyContent={"center"}
          alignItems="center"
        >
          <ModalHeader textAlign={"center"}>New Group </ModalHeader>
          <Divider></Divider>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
          >
            <FormControl>
              {/* for creating the name of the group */}
              <Input
                placeholder="Group Name"
                marginBottom="20px"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              {/* for searching the user */}
              <Input
                placeholder="Add Users"
                marginBottom="10px"
                onChange={(e) => handleSearch(e.target.value)}
              />
              {/* selected users */}
              {/* redendring the user search results when creating a new group */}
              {/* 6 users hi display krunga */}
              {/* agar ek user pe click krunga toh woh add hona chaiye ek list mai */}
              <Box>
                {loading ? (
                  <Box textAlign={"center"}>Loading</Box>
                ) : searchResult ? (
                  searchResult
                    .slice(0, 4)
                    .map((user) => (
                      <UserListItem
                        key={user._id}
                        user={user}
                        
                        handleFunction={() => handleGroup(user)}
                      />
                    ))
                ) : (
                  ""
                )}
              </Box>
              <Text textAlign={'center'}> Selected Users</Text>
              {
                //  selectedUsers ? (
                //   selectedUsers.map((u)=>(
                //     <UserListGroupAdd
                //     />
                //   ))
                // })
                //  )  : ('Select Users')

                selectedUsers
                  ? selectedUsers.map((u) => (
                      <UserListGroupAdd
                        key={u._id}
                        user={u}
                        handleFunction={() => handleDelete(u)}
                      />
                    ))
                  : ""
              }
              {/* {
                loading ? <div>Loading</div> : (
                  searchResult ? searchResult.slice(0, 6).map(user=>(

                    <UserListItem key={user._id} user={user} handleFunction={()=>handleGroup(user)}/>
                  )) :""
                )
              } */}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blackAlpha"
              _hover={{
                backgroundColor: "white",
                color: "black",
              }}
              onClick={handleSubmit}
            >
              Create Group Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default GroupChatModel