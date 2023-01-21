import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";
import { useToast } from "@chakra-ui/react";

const SignUp = () => {
  const navigate = useNavigate();
  // show state for password
  const [show, setShow] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState();
  const toast = useToast();

  // Change type for password.
  const handleClick = () => {
    setShow(!show);
  };

  // onsubmit of image

  const submitHandler = async () => {
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "All Fields Are Required",
        status: "warning",
        duration: 4500,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Password and Confirma Password Are Unequal",
        status: "warning",
        duration: 4500,
        isClosable: true,
        position: "top-right",
      });
      // setLoading(false);
      return;
    }
    try {
      // ab hume headers set krne padenge
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // humara register page "/" route pe hai
      const { data } = await axios.post(
        "/api/user/",
        { name, email, password, pic },
        config
      );
      toast({
        title: "Registeration Successful",
        status: "success",
        duration: 4500,
        isClosable: true,
        position: "top-right",
      });
      localStorage.setItem("userInfoMernChat", JSON.stringify(data));
      setLoading(false);

      //  todo: if error or bug is being faced, use navigate from react router dom.
      navigate("chats");
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

  const postDetails = (pics) => {
    setLoading(true);

    // todo: check whether the pics is defined or not
    if (pics === undefined) {
      toast({
        title: "Select An Image",
        status: "warning",
        duration: 4500,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    // todo: check the type of image or whether it is image or not.
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      // adding image to cloudinary
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "mern-chat-app-main");
      data.append("cloud_name", "dlz59rwq0");
      fetch("https://api.cloudinary.com/v1_1/dlz59rwq0/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Select An Image",
        status: "warning",
        duration: 4500,
        isClosable: true,
        position: "top-right",
      });
      setLoading(false);
      return;
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
            <h1>Register</h1>
          </div>

          {/* for name */}
          <input
            type="text"
            placeholder="Enter Your Name"
            name="username"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          {/* for email */}
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => {
              //   handleChange(e);
              setEmail(e.target.value);
            }}
          />

          {/* for password */}

          <InputGroup>
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={(e) => {
                //   handleChange(e);
                setPassword(e.target.value);
              }}
            />
            <InputRightElement className="showPassword" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </InputRightElement>
          </InputGroup>

          {/* for confirm password */}

          <input
            type="password"
            placeholder="confirm Password"
            name="confirmPassword"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              //   handleChange(e);
            }}
          />
          <FormControl
            id="pic"
            display="flex"
            flexDirection="row"
            fontSize="1rem"
            justifyContent="space-between"
          >
            <FormLabel>{pic ? "Image Added" : "Add Your Image"}</FormLabel>
            {/* todo: style this component. */}
            {/* <Button >Upload image</Button> */}
            <Input
              id="mainUploadImageInp"
              type="file"
              p="1.5"
              accept="image/"
              display="none"
              onChange={(e) => {
                postDetails(e.target.files[0]);
              }}
              className="image"
            />
            <label
              htmlFor="mainUploadImageInp"
              style={{
                // position: 'absolute',
                marginBottom: "10px",
                color: "whitesmoke",
                fontSize: "0.8rem",
                padding: "12px",
                backgroundColor: "#006da3",
                borderRadius: "8px",
                cursor: "pointer",
              }}
              isLoading={loading}
            >
              {pic ? <Text color={"black"}>Uploaded</Text> : "Upload"}
            </label>
          </FormControl>
          {/* <button type="submit" onClick={submitHandler}
          >Register</button> */}
          <Button isLoading={loading} onClick={submitHandler}>
            register
          </Button>
          {/* <span>
            Already have an account? <Link to="/login">Login</Link>
          </span> */}
        </form>
      </FormContainer>
    </VStack>
  );
};
const FormContainer = styled.div`
  .title {
    h1 {
      text-align: center;
    }
  }
  form {
    // upload image

    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 2rem;
    padding: 3rem 5.1rem;
    background-color: #00000080;

    .showPassword {
      /* color: red; */
      cursor: pointer;
      display: absolute;
      color: #7870e6;
      top: 20%;
      right: 2.5%;
    }

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
      background-color: #006da3;
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
export default SignUp;
