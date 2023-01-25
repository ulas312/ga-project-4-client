import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import UploadWidget from './common/UploadWidget';

import Avatar from '@mui/material/Avatar';
import {
  // Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Container,
} from '@mui/material';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='http://localhost:3000/'>
        Snekr closet
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Register = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  });
  const [file, setFile] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) =>
    setFormFields({ ...formFields, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append(
      'upload_preset',
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );
    try {
      const cloudinaryResponse = await API.POST(
        API.ENDPOINTS.cloudinary,
        imageData
      );

      const apiReqBody = {
        ...formFields,
        cloudinaryImageId: cloudinaryResponse.data.public_id,
      };

      await API.POST(API.ENDPOINTS.register, apiReqBody);

      const loginData = await API.POST(API.ENDPOINTS.login, {
        email: formFields.email,
        password: formFields.password,
      });

      AUTH.setToken(loginData.data.token);

      navigate('/sneakerModels');
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            'url(https://i.postimg.cc/8cpFvG3w/login-register-hero.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component='h1' variant='h5'>
              Sign up
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleCreateUser}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Avatar
                    sx={{
                      m: 1,
                      width: 100,
                      height: 100,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className='textfield'
                    size='small'
                    name='profile-picture'
                    id='profile-picture'
                    type='file'
                    onChange={handleFileChange}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete='given-name'
                    name='firstName'
                    required
                    fullWidth
                    id='firstName'
                    label='First Name'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id='lastName'
                    label='Last Name'
                    name='lastName'
                    autoComplete='family-name'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='username'
                    label='username'
                    name='username'
                    autoComplete='username'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='password'
                    label='password Confirmation'
                    type='password'
                    id='password'
                    autoComplete='new-password'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='new-password'
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent='center'>
                <Grid item>
                  <Link href='http://localhost:3000/login' variant='body2'>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Grid>
    </Grid>
  );
};

export default Register;
