'use client'
import React, { useState } from 'react';
import { Box, Button, Divider, TextField, Typography, IconButton, styled } from '@mui/material';
import { Google as GoogleIcon, Apple as AppleIcon, X as TwitterIcon } from '@mui/icons-material';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  margin: "0",
  width: "100%",
  justifyContent: 'space-around',
  minHeight: '100vh',
  backgroundColor: '#000',
  color: '#fff',
});

const FormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'flex-start',
  maxWidth: '450px',
  height: '30vh',
//   minHeight: '100vh',
  width: '100%',
});


const SignUpButton = styled(Button)({
  width: '80%',
  marginBottom: '1rem',
  padding: '0.8rem',
  fontSize: '1.2rem',
  fontWeight: '600',
  backgroundColor: '#25abff',
  cursor:'pointer',
  borderRadius: '50px',
  textTransform: 'none',
  transition:'filter 0.3s',
  '&:hover':{
    backgroundColor: '#25abff !important',
    boxShadow:'none !important',
    filter:'brightness(0.9)'
  }
});

const SignInButton = styled(SignUpButton)({
  backgroundColor: 'inherit',
  color:'#2b94fd !important',
  '&:hover':{
    backgroundColor: '#101a25 !important',
    filter:'brightness(0.9)'
  }
});

const SignInSection = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent:"center"

})

const SignIn = () => {
    const [isModalOpen,setIsModalOpen] = useState<any>(false);
    const [isSignUpModalOpen,setIsSignUpModalOpen] = useState<any>(false);
    
  return (
    <Container style={{backgroundColor: (isModalOpen || isSignUpModalOpen)?'gray':'#000'}}>
        <TwitterIcon style={{fontSize:"28rem"}}/>
    
        <SignInSection>

      <Typography fontWeight={"800"} variant="h1" mb={6}>
        Happening now
      </Typography>
      <FormContainer>
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
        <SignInButton onClick={()=>setIsModalOpen(true)} variant="outlined" style={{ color: '#fff', borderColor: '#fff' }}>
          Sign in
        </SignInButton>
      </FormContainer>
      </SignInSection>
         {isModalOpen && <SignInModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>}
         {isSignUpModalOpen && <SignUpModal isModalOpen={isSignUpModalOpen} setIsModalOpen={setIsSignUpModalOpen}/>}
    </Container>
  );
};

export default SignIn;
