import { StackDivider, VStack } from '@chakra-ui/react';
import React from 'react'
import styled from 'styled-components';
const Login = () => {
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

          {/* for username */}
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={(e) => {
              //   handleChange(e);
            }}
          />


          {/* for password */}

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => {
              //   handleChange(e);
            }}
          />
          <button type="submit">Login</button>
        </form>
      </FormContainer>
    </VStack>
  );
}
const FormContainer = styled.div`
  .title {
    h1 {
      text-align: center;
    }
  }
  form {
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
export default Login