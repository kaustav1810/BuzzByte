import { Button } from '@mui/material';
import { Close } from '@mui/icons-material';
import { styled } from '@mui/system';

export const LoginButton = styled(Button)(({ theme }) => ({
    width: '100%',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1.5),
    fontSize: '1.3rem',
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


export const ResetPasswordButton = styled(LoginButton)(() => ({
color:'white !important',
backgroundColor:'black',
border: '1px solid white !important',
'&:hover':{
    backgroundColor: '#101a25 !important',
    filter:'brightness(1.5)'
}
}));

export const CloseButton = styled(Close)(()=>({
    position: 'relative',
    top: '0',
    cursor: 'pointer'
}))

export const Input = styled('input')({
    display: 'none',
  });