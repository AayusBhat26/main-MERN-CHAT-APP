import { Button, IconButton, Tooltip, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
const ProfileModel = ({user, children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={"flex"}
          icon={<ViewIcon />}
          onClick={onOpen}
          color="white"
        ></IconButton>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Tooltip placement="bottom" label="username">
            <ModalHeader textAlign={"center"}>{user.name}</ModalHeader>
          </Tooltip>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            alignContent="center"
            justifyContent={"center"}
            //     flexDirections='column'
          >
            <Image
              borderRadius={"full"}
              boxSize="175px"
              src={user.pic}
              alt={user.name}
            />
          </ModalBody>
          <Text
          fontSize={{
            base:'24px',
            md:'30px'
          }}
          textAlign={'center'}
          marginTop='20px'
          ><b>Email: </b>{user.email}</Text>
          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModel;
