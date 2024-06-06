import React, { useState } from 'react';
import {
	Modal,
	Box,
	Typography,
	Button,
	Divider,
	IconButton,
	TextField,
	Link,
	Alert,
} from '@mui/material';
import {
	Google as GoogleIcon,
	Apple as AppleIcon,
	X as TwitterIcon,
	InputOutlined,
	Close,
} from '@mui/icons-material';
import { styled } from '@mui/system';
import './SignInModal.css';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { validateFormFields } from '@/utils/FormUtils';
import router from 'next/router';
import {
	CloseButton,
	LoginButton,
	ResetPasswordButton,
} from '../../styles/styledComponents/landingPage/FormComponents';

const StyledTextField = styled(TextField)(() => ({
	'& .MuiInputBase-root': {
		color: '#bdbdbd', // Text color
	},
	'& .MuiFormHelperText-root': {
		fontSize: '0.9rem',
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
		marginBottom: '0 !important',
	},
}));

const SignInModal = ({
	setIsLoginModalOpen,
  setIsSignUpModalOpen,
	isLoginModalOpen,
}) => {
	const [userDetails, setUserDetails] =
		useState<any>('');
	const [errors, setErrors] = useState<any>({});
	const [isLoginError, setIsLoginError] =
		useState(false);

	const router = useRouter();

	const handleClose = () => {
		setIsLoginModalOpen(false);
	};

	const handleChange = (e) => {
		let { name, value } = e.target;

		let errorObj = validateFormFields(
			name,
			value,
			userDetails
		);

		console.log('errorObj', errorObj);

		if (errorObj === undefined) {
			let prevErrors = { ...errors };
			delete prevErrors[name];
			setErrors({ ...prevErrors });
		} else setErrors({ ...errors, ...errorObj });

		setUserDetails({
			...userDetails,
			[name]: value,
		});
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		console.log('Login');

		try {
			await signInWithEmailAndPassword(
				auth,
				userDetails.email,
				userDetails.password
			);
			router.push('/');
		} catch (error) {
			setIsLoginError(true);
			console.error('Error logging in:', error);
		}
	};

	return (
		<div>
			<Modal
				open={isLoginModalOpen}
				onClose={handleClose}>
				<Box className={'modal'}>
					<CloseButton onClick={handleClose} />
					<Box
						className='modalContent'
						display={'flex'}
						width={350}
						flexDirection={'column'}
						margin={'0 auto'}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}>
							<TwitterIcon fontSize='large' />
						</div>
						<Typography
							variant='h4'
							fontWeight={600}
							gutterBottom>
							Sign in to X
						</Typography>

						{isLoginError && (
							<Alert severity='error'>
								Invalid username/password
							</Alert>
						)}

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
							variant='outlined'
							placeholder='Email'
							fullWidth
							name='email'
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
							variant='outlined'
							placeholder='Password'
							type='password'
							name='password'
							error={!!errors.password}
							helperText={errors.password}
							fullWidth
							onChange={handleChange}
							InputProps={{
								style: {
									color: 'white',
								},
							}}
						/>

						<LoginButton
							sx={{ fontSize: '1rem !important' }}
							variant='contained'
							onClick={handleLogin}>
							Login
						</LoginButton>
						<ResetPasswordButton
							sx={{ fontSize: '1rem !important' }}
							variant='outlined'>
							Forgot password?
						</ResetPasswordButton>
						<Typography
							variant='body2'
							fontSize={'1rem'}
							sx={{ marginBottom: '1rem' }}>
							Don't have an account?{' '}
							<Link sx={{cursor:'pointer'}} onClick={()=>{setIsLoginModalOpen(false); setIsSignUpModalOpen(true)}}>Sign up</Link>
						</Typography>
					</Box>
				</Box>
			</Modal>
		</div>
	);
};

export default SignInModal;
