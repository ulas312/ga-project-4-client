import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeImage from '../assets/home-hero-2.gif';
import '../styles/Home.scss';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import { TypeAnimation } from 'react-type-animation';

const Home = () => (
  <Grid className='Home' container component='main' sx={{ height: '100vh' }}>
    <CssBaseline />
    <Typography
      align='center'
      component='div'
      variant='body1'
      style={{
        height: 100,
        width: '100%',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '30vh',
          justify: 'center',
          left: '8%',
          zIndex: 'tooltip',
          color: 'secondary',
        }}
      >
        <div style={{ width: '80vw' }}>
          <TypeAnimation
            className='hero-animation'
            // Same String at the start will only be typed once, initially
            sequence={[
              'Make planning and showing off your kicks',
              1000,
              'easy with your virtual Snkr Closet.',
              1000,
            ]}
            speed={50} // Custom Speed from 1-99 - Default Speed: 40
            style={{ fontSize: '5em' }}
            wrapper='h1' // Animation will be rendered as a <span>
            repeat={Infinity} // Repeat this Animation Sequence infinitely
          />
        </div>
        {/* <Typography>
          <h1>
            Make planning and showing off your kicks <br /> easy with your
            virtual Snkr Closet.
          </h1>
        </Typography> */}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '70vh',
          justify: 'center',
          left: '46%',
          zIndex: 'tooltip',
        }}
      >
        <Link
          style={{ color: 'inherit', textDecoration: 'inherit' }}
          to='/login'
        >
          <Button
            className='homeButton'
            sx={{
              border: 3,
              fontSize: 32,
              width: 200,
              height: 60,
              pt: 2,
            }}
            color='primary'
            variant='contained'
            size='large'
          >
            Sign up
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          // position: 'absolute',
          top: 0,
          // left: '50%',
          zIndex: 'modal',
        }}
      >
        <img className='home-hero' src={HomeImage} alt='sneaker collection' />
      </Box>
    </Typography>
  </Grid>
);

export default Home;
