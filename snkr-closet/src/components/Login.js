import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';

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

const Login = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({ email: false, password: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    API.POST(API.ENDPOINTS.login, formFields)
      .then(({ data }) => {
        AUTH.setToken(data.token);
        navigate('/sneakerModels');
      })
      .catch((e) => {
        console.log(e);
        if (e.response.data.message === 'That password seems to be incorrect') {
          setError({ ...error, password: true });
        } else {
          setError({ email: true, password: true });
        }
      });
  };

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
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
            'url(https://i.postimg.cc/6QMkKLFr/register-hero.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 20,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              onChange={handleChange}
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              onChange={handleChange}
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='http://localhost:3000/register' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
