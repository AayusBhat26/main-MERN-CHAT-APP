import { Box, Button, Text, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import styled from "styled-components";
const SideDrawer = () => {
  // search state
  const [search, setSearch] = useState("");
  const [serachResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  return (
    <>
      <Container>
        <Tooltip label="Search User" hasArrow placement="bottom-end">
          <Button colorScheme="teal" size="sm">
            <Text
            display={{
                  base:'none', md:'flex'
            }}
            >Search User</Text>
            {/* <i class="fa-solid fa-magnifying-glass"></i> */}
          </Button>
        </Tooltip>
      </Container>
    </>
  );
};
const Container = styled.div`
  margin: 10px;
  border: 1px solid whitesmoke;
  padding: 5px;
  .btn {
    color: whitesmoke;
  }
`;
export default SideDrawer;
