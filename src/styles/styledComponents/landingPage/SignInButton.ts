import { styled } from '@mui/system';
import { SignUpButton } from './SignUpButton';

export const SignInButton = styled(SignUpButton)({
    backgroundColor: 'inherit',
    color:'#2b94fd !important',
    '&:hover':{
      backgroundColor: '#101a25 !important',
      filter:'brightness(0.9)'
    }
});