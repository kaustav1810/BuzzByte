import { Button } from '@mui/material';
import { styled } from '@mui/system';

export const SignUpButton = styled(Button)({
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