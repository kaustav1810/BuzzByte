import React, {
	useEffect,
	useState,
} from 'react';
import {
	Modal,
	Box,
	Typography,
	Button,
	Divider,
	IconButton,
	TextField,
	Link,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Avatar,
} from '@mui/material';
import {
	Google as GoogleIcon,
	Apple as AppleIcon,
	X as TwitterIcon,
	InputOutlined,
	Close,
	PhotoCamera,
	AccountCircle,
} from '@mui/icons-material';
import { styled } from '@mui/system';
import DobSelector from '../../components/DobSelector/DobSelector';
import './SignInModal.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
	setDoc,
	doc,
	collection,
	getDocs,
	query,
	where,
} from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../firebaseConfig';
import { validateFormFields } from '../../utils/FormUtils';
import {
	CloseButton,
	LoginButton,
	Input,
} from '../../styles/styledComponents/landingPage/FormComponents';

const StyledTextField = styled(TextField)(() => ({
	'& .MuiInputBase-root': {
		color: '#bdbdbd', // Text color
		marginBottom: '0 !important',
		'& fieldset': {
			borderColor: '#555', // Border color
		},
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
	'&.MuiTextField-root': {
		width: '50%',
		marginBottom: '0 !important',
		'& fieldset': {
			borderColor: '#555', // Border color
		},
	},
}));

const SignUpModal = ({
	setIsLoginModalOpen,
  setIsSignUpModalOpen,
	isSignUpModalOpen,
}) => {
	const [formData, setFormData] = useState<any>(
		{}
	);

	const [errors, setErrors] = useState<any>({});

	const router = useRouter();

	useEffect(() => {
		console.log('formData', formData);
	}, [formData]);

	const checkUsernameExists = async (
		username
	) => {
		try {
			const usersRef = collection(db, 'users'); // replace 'users' with your collection name
			const q = query(
				usersRef,
				where('username', '==', username)
			);
			const querySnapshot = await getDocs(q);

			if (!querySnapshot.empty) {
				return true; // Username exists
			} else {
				return false; // Username does not exist
			}
		} catch (error) {
			console.error(
				'Error checking username:',
				error
			);
			throw new Error('Unable to check username');
		}
	};

	const handleChange = (e) => {
		// validateField(e);

		let { name, value } = e.target;

		// if(!value) setErrors({...errors,[name]:`${name} is required`});

		// else {
		//   let prevErrors = {...errors};
		//   delete prevErrors[name];
		//   setErrors({...prevErrors});
		// }

		let errorObj = validateFormFields(
			name,
			value,
			formData
		);

		console.log('errorObj', errorObj);

		if (errorObj === undefined) {
			let prevErrors = { ...errors };
			delete prevErrors[name];
			setErrors({ ...prevErrors });
		} else setErrors({ ...errors, ...errorObj });

		if (name == 'username') {
			// Example usage
			checkUsernameExists(value)
				.then((exists) => {
					if (exists) {
						console.log(
							'Username already exists'
						);
						setErrors({
							...errors,
							[name]: `Username already exists`,
						});
					} else {
						console.log('Username is available');
					}
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		}

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setFormData({
				...formData,
				profilePicture: file,
				profilePicturePreview:
					URL.createObjectURL(file),
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const fields = [
			'firstName',
			'lastName',
			'username',
			'email',
			'phone',
			'password',
			'confirmPassword',
		];
		let errorsObj = {};

		fields.forEach((field) => {
			if (!formData[field]) {
				errorsObj[field] = `${
					field.charAt(0).toUpperCase() +
					field
						.slice(1)
						.replace(/([A-Z])/g, ' $1')
				} is required`;
			}
		});

		setErrors({ ...errors, ...errorsObj });

		if (Object.keys(errorsObj).length !== 0) {
			console.log('errors', errors);
			return;
		}

		const {
			firstName,
			profilePicturePreview,
			lastName,
			username,
			email,
			phone,
			password,
			dob,
		} = formData;

		const name = `${firstName} ${lastName}`;

		const dobString = `${dob?.day}/${dob?.month}/${dob?.year}`;

		try {
			const userCredential =
				await createUserWithEmailAndPassword(
					auth,
					email,
					password
				);
			const user = userCredential.user;

			// Save additional user details in Firestore
			await setDoc(
				doc(collection(db, 'users'), user.uid),
				{
					name,
					phone,
					username,
					dob: dobString,
					email,
					avatar: profilePicturePreview
						? profilePicturePreview
						: null,
					createdAt: new Date(),
				}
			);

			// Redirect to the homepage
			router.push('/');
		} catch (error) {
			console.error('Error signing up:', error);
		}
	};

	const handleClose = () => {
		setIsSignUpModalOpen(false);
	};

	const updateDob = (newDob) => {
		console.log('dooob');
		setFormData({
			...formData,
			dob: { ...formData.dob, ...newDob },
		});
	};

	return (
		<div>
			<Modal open={isSignUpModalOpen} onClose={handleClose}>
				<Box className={'modal'}>
					<CloseButton onClick={handleClose} />
					<Box
						className='modalContent'
						display={'flex'}
						flexDirection={'column'}
						margin={'0 auto'}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
							}}>
							<TwitterIcon fontSize='large' />
						</div>

						<Box
							display={'flex'}
							flexDirection={'column'}>
							<Typography
								display={'flex'}
								justifyContent={'center'}
								variant='h3'
								fontWeight={600}
								gutterBottom>
								Create your account
							</Typography>

							<Box
								display='flex'
								justifyContent={'space-between'}
								alignItems='center'
								mt={2}>
								<Box
									sx={{ width: '50%' }}
									marginBottom={'0 !important'}
									display={'flex'}
									alignItems={'center'}
									justifyContent={'center'}>
									<Input
										id='icon-button-file'
										type='file'
										onChange={handleImageChange}
									/>

									<AccountCircle
										sx={{
											width: 86,
											height: 86,
											m: '0 !important',
											mr: 2,
											cursor: 'pointer',
										}}
									/>
									<PhotoCamera
										sx={{
											width: 30,
											height: 30,
											m: '0 !important',
											cursor: 'pointer',
										}}
									/>
								</Box>

								<StyledTextField
									onChange={handleChange}
									InputProps={{
										style: {
											color: 'white',
											marginBottom:
												'0 !important',
										},
									}}
									type='phone'
									error={!!errors.phone}
									helperText={errors.phone}
									placeholder='Phone no.'
									name='phone'
									required
								/>
							</Box>

							<Box display={'flex'}>
								<StyledTextField
									onChange={handleChange}
									InputProps={{
										style: {
											color: 'white',
											marginRight: '1rem',
										},
									}}
									variant='outlined'
									error={!!errors.firstName}
									helperText={errors.firstName}
									margin='normal'
									placeholder='firstName'
									name='firstName'
								/>

								<StyledTextField
									onChange={handleChange}
									InputProps={{
										style: {
											color: 'white',
										},
									}}
									variant='outlined'
									margin='normal'
									error={!!errors.lastName}
									helperText={errors.lastName}
									placeholder='lastName'
									name='lastName'
								/>
							</Box>

							<Box
								display={'flex'}
								justifyContent={'center'}>
								<StyledTextField
									onChange={handleChange}
									InputProps={{
										style: {
											color: 'white',
											// width: 'auto',
											marginRight: '1rem',
										},
									}}
									error={!!errors.username}
									helperText={errors.username}
									placeholder='username'
									name='username'
									required
								/>

								<StyledTextField
									InputProps={{
										style: {
											color: 'white',
										},
									}}
									type='email'
									onChange={handleChange}
									error={!!errors.email}
									helperText={errors.email}
									placeholder='Email'
									name='email'
									required
								/>
							</Box>

							<Box display={'flex'}>
								<StyledTextField
									onChange={handleChange}
									InputProps={{
										style: {
											color: 'white',
											// width: 'auto',
											marginRight: '1rem',
										},
									}}
									type='password'
									error={!!errors.password}
									helperText={errors.password}
									placeholder='password'
									name='password'
									required
								/>
								<StyledTextField
									onChange={handleChange}
									InputProps={{
										style: {
											color: 'white',
										},
									}}
									type='password'
									error={!!errors.confirmPassword}
									helperText={
										errors.confirmPassword
									}
									placeholder='confirm password'
									name='confirmPassword'
									required
								/>
							</Box>
						</Box>

						<Box
							display={'flex'}
							flexDirection={'column'}>
							<Typography
								fontWeight={600}
								fontSize={'1.5rem'}>
								Date of Birth
							</Typography>
							<Typography fontSize={'medium'}>
								This will not be shown publicly.
								Confirm your own age, even if this
								account is for a business, a pet,
								or something else.
							</Typography>
							<Box
								display={'flex'}
								justifyContent={'center'}>
								<DobSelector
									formData={formData}
									updateDob={(dob) =>
										updateDob(dob)
									}
								/>
							</Box>
							<LoginButton
								onClick={handleSubmit}
								variant='contained'>
								Create Account
							</LoginButton>
              <Typography
							variant='body2'
							fontSize={'1rem'}
							sx={{ marginBottom: '1rem' }}>
							Already have an account?{' '}
							<Link sx={{cursor:'pointer'}} onClick={()=>{setIsLoginModalOpen(true); setIsSignUpModalOpen(false)}}>Sign in</Link>
						</Typography>
						</Box>
					</Box>
				</Box>
			</Modal>
		</div>
	);
};

export default SignUpModal;
