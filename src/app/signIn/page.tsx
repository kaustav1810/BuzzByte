'use client'
import React, { useState } from 'react';
import { Box, Button, Divider, TextField, Typography, IconButton, styled } from '@mui/material';
import { Google as GoogleIcon, Apple as AppleIcon, X as TwitterIcon } from '@mui/icons-material';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import { SignUpButton } from '@/styles/styledComponents/landingPage/SignUpButton';
import { SignInButton } from '@/styles/styledComponents/landingPage/SignInButton';

const SignIn = () => {
    const [isLoginModalOpen,setIsLoginModalOpen] = useState<any>(false);
    const [isSignUpModalOpen,setIsSignUpModalOpen] = useState<any>(false);
    
  return (
    <Box m={0} minHeight={'100vh'} color={'#fff'} display={"flex"} alignItems={"center"} justifyContent={"space-around"} width={'100%'} style={{backgroundColor: (isLoginModalOpen || isSignUpModalOpen)?'gray':'#000'}}>
        <TwitterIcon style={{fontSize:"28rem"}}/>
    
        <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"} justifyContent={"center"}>

      <Typography fontWeight={"800"} variant="h1" mb={6}>
        Happening now
      </Typography>
      <Box maxWidth={'450px'} width={'100%'} height={'30vh'} display={"flex"} flexDirection={"column"} justifyContent={"space-evenly"} alignItems={"flex-start"}>
        <Typography fontWeight={"800"} variant="h4" mb={4}>
          Join today.
        </Typography>

        {/* <StyledButton
          variant="contained"
          startIcon={<GoogleIcon />}
          style={{ backgroundColor: '#fff', color: '#000' }}
        >
          Sign up with Google
        </StyledButton>
        <StyledButton
          variant="contained"
          startIcon={<AppleIcon />}
          style={{ backgroundColor: '#fff', color: '#000' }}
        >
          Sign up with Apple
        </StyledButton>
        <Divider style={{ width: '100%', margin: '1rem 0', backgroundColor: '#fff' }} />
         */}
        <SignUpButton onClick={()=>setIsSignUpModalOpen(true)} variant="contained" color="primary">
          Create account
        </SignUpButton>
       <Typography fontSize={"1.2rem"} fontWeight={"600"}  style={{ marginBottom: '1rem' }}>
          Already have an account?
        </Typography>
        <SignInButton onClick={()=>setIsLoginModalOpen(true)} variant="outlined" style={{ color: '#fff', borderColor: '#fff' }}>
          Sign in
        </SignInButton>
      </Box>
      </Box>
         {
         isLoginModalOpen && 
          <SignInModal 
          isLoginModalOpen={isLoginModalOpen} 
          setIsSignUpModalOpen={setIsSignUpModalOpen} 
          setIsLoginModalOpen={setIsLoginModalOpen}
          />
         }
         {
            isSignUpModalOpen && 
            <SignUpModal 
            isSignUpModalOpen={isSignUpModalOpen} 
            setIsLoginModalOpen={setIsLoginModalOpen}
            setIsSignUpModalOpen={setIsSignUpModalOpen}
            />
          }
    </Box>
  );
};

export default SignIn;
