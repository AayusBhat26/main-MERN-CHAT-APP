import {
  Button,
  InputGroup,
  InputRightElement,
  StackDivider,
  Toast,
  useToast,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LogIn = () => {

      const [show, setShow] = useState(false);
      // const [name, setName] = useState();
      const [email, setEmail] = useState();
      const [password, setPassword] = useState();
      const [loading, setLoading] = useState(false);
      // const [pic, setPic] = useState();
      const toast = useToast();
      const navigate = useNavigate();

      // to check whether user is logged in already

      // const checkUser = ()=>{
      //   if(localStorage.getItem('userInfoMernChat')){
      //     navigate('/chats')
      //   }
      // }
      // useEffect(()=>{
      //   checkUser();
      // },[])

      const handleClick = () => {
        setShow(!show);
      };


      
       const submitHandler = async () => {
         setLoading(true);

         if (!email || !password) {
           toast({
             title: "All Fields Are Required",
             status: "warning",
             duration: 4500,
             isClosable: true,
             position: "top-right",
           });
           setLoading(false);
           return;

           //  newFrontendUser@gmail.com
         }
         try {
           // ab hume headers set krne padenge
           const config = {
             headers: {
               "Content-Type": "application/json",
             },
           };
           const { data } = await axios.post(
             "/api/user/login",
             { email, password },
             config
           );
           toast({
             title: "Login Successful",
             status: "success",
             duration: 4500,
             isClosable: true,
             position: "top-right",
           });
           localStorage.setItem("userInfoMernChat", JSON.stringify(data));
           setLoading(false);
           navigate('/chats')
           //  todo: if error or bug is being faced, use navigate from react router dom.

           
         } catch (err) {
           toast({
             title: "ERROR FACED, TRY AGAIN",
             description: err.response.data.message,
             status: "error",
             duration: 4500,
             isClosable: true,
             position: "top-right",
           });
           setLoading(false);
         }
       };
  return (

        <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      <FormContainer>
        <form
          onSubmit={(event) => {
            // handleSubmit(event);
          }}
        >
          <div className="title">
            <img src="" alt="" />
            <h1>Login</h1>
          </div>
          {/* for email */}


          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => {
              //   handleChange(e);
              setEmail(e.target.value);
            }}
          />
          {/* for password */}
          <InputGroup>
            <input
              type={show ? "text" : "password"}
            // type={'password'}
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => {
                  // handleChange(e);
                setPassword(e.target.value);
              }}

            />
            <InputRightElement className="showPassword" 
            onClick={handleClick}
            >
              {show ? "Hide" : "Show"}
            </InputRightElement>
          </InputGroup>
          <Button
           isLoading={loading} onClick={submitHandler}
           >
            Login
          </Button>
          <Button
            isLoading={loading}
            onClick={() => {
              setEmail("guestUser@Aayush.com");
              setPassword("GuestPassword");
            }}
          >
            Login As Guest
          </Button>
        </form>
      </FormContainer>
    </VStack>
  );
};

// STYLED COMPONENTS
const FormContainer = styled.div`
  .title {
    h1 {
      text-align: center;
    }
  }
  form {
    .showPassword {
      cursor: pointer;
      display: absolute;
      color: #7870e6;
      top: 20%;
      right: 2.5%;
    }
    /* border-radius: 20px;
    border: 1px solid #141488; */
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 2rem;
    padding: 3rem 5.1rem;
    background-color: #00000080;
    /* padding: 0.5rem; */
    input {
      color: whitesmoke;
      background-color: transparent;
      padding: 1rem;
      /* width: 100vw; */

      border-radius: 0.6rem;
      border: 0.1rem solid #7870e6;
      width: 100%;
      font-size: 1rem;
      &:focus {
        /* whenever we are focusing on the input, this css would be applied. */
        border: 0.2rem solid #7870e6;
        outline: none;
      }
    }
    button {
      color: whitesmoke;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      transition: 0.42s ease-in-out;
      cursor: pointer;
      border-radius: 0.5rem;
      background-color: #7870e6;
      text-transform: uppercase;

      &:hover {
        background-color: #0a1482;
      }
    }
    span {
      text-transform: uppercase;
      color: whitesmoke;
      a {
        color: #0a1482;
        text-transform: none;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;
export default LogIn;
