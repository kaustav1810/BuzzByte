import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Button, Divider, IconButton, TextField, Link, FormControl, InputLabel, MenuItem, Select, Avatar } from '@mui/material';
import { Google as GoogleIcon, Apple as AppleIcon, X as TwitterIcon, InputOutlined, Close, PhotoCamera } from '@mui/icons-material';
import { styled } from '@mui/system';
import DobSelector from "../../components/DobSelector/DobSelector";
import './SignInModal.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../firebaseConfig';

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

const CloseBtn = styled(Close)(()=>({
  position: 'relative',
  top: '0',
  cursor: 'pointer'
}))

const Input = styled('input')({
  display: 'none',
});

const SignUpModal = ({setIsModalOpen,isModalOpen}) => {

  const [formData, setFormData] = useState<any>({
  });

  const [errors, setErrors] = useState<any>({});

  const router = useRouter();


  useEffect(()=>{
    console.log("formData",formData)
  },[formData])


  const validateField = (e) => { 
    let {name,value} = e.target;

    if(!value) setErrors({...errors,[name]:`${name} is required`});

    else {
      let prevErrors = {...errors};
      delete prevErrors[name];
      setErrors({...prevErrors});
    }

    if(name=='password' && value.length<6){
        setErrors({...errors,[name]:`${name} must be at least 6 characters`});
    }

    if(name=='confirmPassword' && value!==formData.password){
        setErrors({...errors,[name]:`Passwords do not match`});
    }

    if(name=='phone' && /^[6-9]\d{9}$/.test(value) === false){
      setErrors({...errors,[name]:`Please enter a valid phone number`});
    }

    if(name=='email' && /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) === false){
      setErrors({...errors,[name]:`Please enter a valid email`});
    }

    if(name=='email'){
       // Example usage
      checkUsernameExists(value)
      .then(exists => {
        if (exists) {
          console.log('Username already exists');
          setErrors({...errors,[name]:`Username already exists`});
        } else {
          console.log('Username is available');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }
  
  const checkUsernameExists = async (username) => {
    try {
      const usersRef = collection(db, 'users'); // replace 'users' with your collection name
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        return true; // Username exists
      } else {
        return false; // Username does not exist
      }
    } catch (error) {
      console.error('Error checking username:', error);
      throw new Error('Unable to check username');
    }
  };
  
 
    
  const handleChange = (e) => {

    validateField(e);

    const { name, value } = e.target;


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
        profilePicturePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const fields = ['firstName', 'lastName', 'username', 'email', 'phone', 'password', 'confirmPassword'];
    let errorsObj = {};

    fields.forEach(field => {
      if (!formData[field]) {
        errorsObj[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
      }
    });

    setErrors({...errors,...errorsObj})

    if(Object.keys(errorsObj).length!==0){
      console.log("errors",errors);
      return;
    };

    const {firstName,profilePicturePreview,lastName,username,email,phone,password,dob} = formData;

    
    const name = `${firstName} ${lastName}`;

    const dobString = `${dob?.day}/${dob?.month}/${dob?.year}`;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Save additional user details in Firestore
      await setDoc(doc(collection(db, 'users'), user.uid), {
        name,
        phone,
        username,
        dob:dobString,
        email,
        avatar:profilePicturePreview?profilePicturePreview:null,
        createdAt: new Date()
      });
  
      // Redirect to the homepage
      router.push('/');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  }

  const updateDob = (newDob) => { 
    console.log("dooob")
    setFormData({...formData,
      dob:{...formData.dob,...newDob}
    });
   }

  return (
    <div>
      <Modal open={true} onClose={handleClose}>
        <Box className={"modal"}>
          <CloseBtn onClick={handleClose}/>
          <Box className='modalContent' display={"flex"} width={350} flexDirection={"column"} margin={'0 auto'}>

          <div style={{display:'flex',justifyContent:'center'}}><TwitterIcon fontSize='large'/></div>
          
          <Box display={"flex"} flexDirection={"column"}>

          <Typography variant="h4" fontWeight={600} gutterBottom>
            Create your account
          </Typography>

          <Box display="flex" alignItems="center" mt={2}>
          <Avatar
            src={formData.profilePicturePreview}
            alt="Profile Picture Preview"
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <label htmlFor="icon-button-file">
            <Input id="icon-button-file" type="file" onChange={handleImageChange} />
            <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
        </Box>
        
        <Box display={"flex"} >

          <StyledTextField onChange={handleChange} InputProps={{
            style: {
              color: 'white',
            }
          }} variant='outlined' error={!!errors.firstName} helperText={errors.firstName} margin='normal' placeholder='firstName' name='firstName' fullWidth/>
          
          <StyledTextField onChange={handleChange} InputProps={{
            style: {
              color: 'white',
            }
          }} variant='outlined' margin='normal' error={!!errors.lastName} helperText={errors.lastName} placeholder='lastName'  name='lastName' fullWidth/>
          </Box>
          
          <StyledTextField onChange={handleChange} InputProps={{
            style: {
              color: 'white',
            }
          }} variant='outlined' margin='normal' error={!!errors.username} helperText={errors.username} placeholder='username' name='username' fullWidth required/>
          
          <StyledTextField InputProps={{
            style: {
              color: 'white',
            }
          }} type='email' onChange={handleChange} error={!!errors.email} helperText={errors.email} placeholder='Email' name='email' fullWidth required/>
          
          <StyledTextField onChange={handleChange} InputProps={{
              style: {
                color: 'white',
              }
            }} type='phone' error={!!errors.phone} helperText={errors.phone} placeholder='Phone no.' name='phone' required/>
          <StyledTextField onChange={handleChange} InputProps={{
              style: {
                color: 'white',
              }
            }} type='password' error={!!errors.password} helperText={errors.password} placeholder='password' name='password' required/>
          <StyledTextField onChange={handleChange} InputProps={{
              style: {
                color: 'white',
              }
            }} type='password' error={!!errors.confirmPassword} helperText={errors.confirmPassword} placeholder='confirm password' name='confirmPassword' required/>
          </Box>

          <Box display={"flex"} flexDirection={"column"}>
          <Typography fontWeight={600} fontSize={'large'}>Date of Birth</Typography>
          <Typography variant='caption'>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</Typography>
          <Box display={"flex"} justifyContent={"center"}>
            
          <DobSelector formData={formData} updateDob={(dob)=>updateDob(dob)}/>
          </Box>
          <LoginButton onClick={handleSubmit} variant="contained" >
            Create Account
          </LoginButton>
          </Box>
          
          </Box>
          </Box>

      </Modal>
    </div>
  );
};

export default SignUpModal;
