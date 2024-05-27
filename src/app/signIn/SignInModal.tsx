import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Divider, IconButton, TextField, Link, Alert } from '@mui/material';
import { Google as GoogleIcon, Apple as AppleIcon, X as TwitterIcon, InputOutlined, Close } from '@mui/icons-material';
import { styled } from '@mui/system';
import './SignInModal.css';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const LoginButton = styled(Button)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5),
  fontSize: '1rem',
  borderRadius: '50px',
  textTransform: 'none',
  color:'black !important',
  fontWeight:'800',
  backgroundColor:'white',
  border: 'none !important',
  transition:'filter 0.3s',
  '&:hover':{
    backgroundColor: 'white !important',
    boxShadow:'none !important',
    filter:'brightness(0.8)'
  }
}));

const ResetPasswordButton = styled(LoginButton)(() => ({
  color:'white !important',
  backgroundColor:'black',
  border: '1px solid white !important',
  '&:hover':{
    backgroundColor: '#101a25 !important',
    filter:'brightness(1.5)'
  }
}));

const CloseBtn = styled(Close)(()=>({
  position: 'relative',
  top: '0',
  cursor: 'pointer'
}))

const StyledTextField = styled(TextField)(() => ({
  '& .MuiInputBase-root': {
    color: '#bdbdbd', // Text color
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#555', // Border color
    },
    '&:hover fieldset': {
      borderColor: '#888', // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#888', // Border color when focused
    },
    marginBottom:'0 !important'
  },
}));

const SignInModal = ({setIsModalOpen,isModalOpen}) => {

  const [userDetails, setUserDetails] = useState<any>('');
  const [errors, setErrors] = useState<any>({});
  const [isLoginError, setIsLoginError] = useState(false);

  const router = useRouter();

  const handleClose = () => {
    setIsModalOpen(false);
  }

  const handleChange = (e) => { 
    let {name,value} = e.target;

    if(!value) setErrors({...errors,[name]:`${name} is required`});
    
    else setErrors({...errors,[name]:''});

    setUserDetails({...userDetails,[name]:value});
  }

  const handleLogin = async(e) => { 
    e.preventDefault();
    console.log('Login');

    try {
      await signInWithEmailAndPassword(auth, userDetails.email, userDetails.password);
      router.push('/');
    } catch (error) {
      setIsLoginError(true);
        console.error('Error logging in:', error);
    }
  }

  return (
    <div>
      <Modal open={isModalOpen} onClose={handleClose}>
        <Box className={"modal"}>
          <CloseBtn onClick={handleClose}/>
          <Box className='modalContent' display={"flex"} width={350} flexDirection={"column"} margin={'0 auto'}>

          <div style={{display:'flex',justifyContent:'center'}}><TwitterIcon fontSize='large'/></div>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Sign in to X
          </Typography>

          {isLoginError && <Alert severity="error">Invalid username/password</Alert>}
          
          {/* <SignInButton
            variant="contained"
            startIcon={<GoogleIcon />}
            style={{ backgroundColor: '#fff', color: '#000' }}
          >
            Sign up with Google
          </SignInButton>
          <SignInButton
            variant="contained"
            startIcon={<AppleIcon />}
            style={{ backgroundColor: '#fff', color: '#000' }}
          >
            Sign up with Apple
          </SignInButton>
          <Divider sx={{ width: '100%', margin: '1rem 0', backgroundColor: '#000' }} />
           */}
          <StyledTextField
            variant="outlined"
            placeholder="Email"
            fullWidth
            name="email"
            error={!!errors.email}
            helperText={errors.email}
            onChange={handleChange}
            InputProps={{
              style: {
                color: 'white',
              },
            }}
          />
          <StyledTextField
            variant="outlined"
            placeholder="Password"
            type='password'
            name="password"
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
            onChange={handleChange}
            InputProps={{
              style: {
                color: 'white',
              }
            }}
          />

          <LoginButton variant="contained" onClick={handleLogin}>
            Login
          </LoginButton>
          <ResetPasswordButton variant="outlined">
            Forgot password?
          </ResetPasswordButton>
          <Typography variant="body2" fontSize={'1rem'} sx={{ marginBottom: '1rem' }}>
            Don't have an account? <Link>Sign up</Link>
          </Typography>
          </Box>

        </Box>
      </Modal>
    </div>
  );
};

export default SignInModal;
