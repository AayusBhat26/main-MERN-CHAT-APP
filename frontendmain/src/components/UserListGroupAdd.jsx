import { Box, CloseButton, color, Text } from '@chakra-ui/react'
import React from 'react'
import {CloseIcon} from '@chakra-ui/icons'

const UserListGroupAdd = ({user, handleFunction}) => {
  return (
    <Box
      //     width={'50px'}
      //     height='50px'
      
      margin={2}
      paddingX={1}
      paddingY={1}
      
      backgroundColor={"whiteAlpha.900"}
      // color="blackAlpha.600"
      width='100%'
      
      _hover={{
        backgroundColor: "inherit",
        color: "white",
      }}
      cursor={"pointer"}
      borderRadius="10px"
    >
      <Text display={"flex"}
      
      padding='2px'
       alignItems="center">
        {user.name}
        <CloseIcon
          fontSize={"10px"}
          marginLeft="10px"
          
          onClick={handleFunction}
      //     padding="11px"
          // backgroundColor={}
        ></CloseIcon>
      </Text>
    </Box>
  );
}

export default UserListGroupAdd
