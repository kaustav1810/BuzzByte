import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, styled, Link } from '@mui/material';
import './NavBar.css';
import { X } from '@mui/icons-material';
import { useAuth } from '../../app/contexts/AuthContext';

const Navbar = () => {
  const { currentUser } = useAuth();

  const LoginButton = styled(Link)({
    padding: '1rem',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: 'inherit',
    textDecoration: 'none',
    letterSpacing: '0.2rem',
    textTransform: 'uppercase',
    backgroundColor: 'white',
    border: '0.2rem solid black',
    borderRadius: '0.8rem',
    marginRight: '1rem',
  })

  const SignupButton = styled(LoginButton)({
    border: '0.2rem solid var(--twitter-color)',
    color: 'var(--twitter-color)',
  })
  

  console.log("currentUser", currentUser);

  return (
    <div className='navbar'>
      {/* <AppBar position="static"> */}
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <X/>
          </Typography>
          {!currentUser &&
            <>
                <LoginButton href='/signIn'>Login</LoginButton>
                <SignupButton href='/signIn'>Signup</SignupButton>
            </>
          }
        </Toolbar>
      {/* </AppBar> */}

    </div>
  );
};

export default Navbar;