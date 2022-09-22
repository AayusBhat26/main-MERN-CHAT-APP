import React, { useEffect } from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import LogIn from "../components/LogIn";
import SignUp from "../components/SignUp";

const Homepage = () => {

  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfoMernChat"));
  //   if (userInfo) {
  //     history.push("/chats");
  //   }
  // }, [history]);

  return (
    <Container width="100%" height="100%" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        p="1.1rem"
        w="100%"
        m="2rem 0 0.5rem 0"
        fontSize="1.6rem"
        fontWeight="bold"
        backgroundColor="#00000076"
        textColor="whitesmoke"
        borderRadius="2rem"
        boxShadow="3px 3px 3px 2px rgba(0, 0, 0, 0.2)"
      >
        <Text>CHAT</Text>
      </Box>
      <Box w="100%" textColor="whitesmoke" fontSize="1.6rem">
        <Tabs isFitted variant="enclosed" m="2rem 0 0.5rem 0">
          <TabList mb="1em">
            <Tab fontSize="1.2rem">Login</Tab>
            <Tab fontSize="1.2rem">SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LogIn />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
