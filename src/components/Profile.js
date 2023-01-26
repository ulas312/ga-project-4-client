import * as React from 'react';
import { useEffect, useState } from 'react';
import { API } from '../lib/api';
import SneakerCard from './common/SneakerCard';
// import ProfilePicture from './common/ProfilePicture';

import {
  Container,
  Box,
  Card,
  CardMedia,
  Button,
  ButtonBase,
  Typography,
  Grid,
  Divider,
  Stack,
  Avatar,
  CssBaseline,
  ImageListItem,
  CardActionArea,
  ImageList,
  Paper,
} from '@mui/material';

export default function Profile() {
  const [sneakers, setSneakers] = useState([]);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allModels)
      .then(({ data }) => {
        setSneakers(data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <Container>
      <CssBaseline />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <Stack>
          <Paper
            sx={{
              p: 2,
              margin: 'auto',
              maxWidth: 1000,
              flexGrow: 1,
              color: 'white',
              backgroundColor: '#121212',
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  {/* <Img alt="complex" src="/static/images/grid/complex.jpg" /> */}
                  <Avatar sx={{ width: 100, height: 100, mt: '50%' }} />
                  {/* <Avatar
                    alt='Profile picture'
                    // src={ProfilePic}
                    sx={{
                      height: '12rem',
                      width: '12rem',
                      // position: 'absolute',
                      top: '2%',
                      justify: 'center',
                      left: '2%',
                    }}
                  /> */}
                </ButtonBase>
              </Grid>
              <Grid
                item
                xs={12}
                sm
                container
                style={{ color: 'white', backgroundColor: '#121212' }}
              >
                <Grid item xs container direction='column' spacing={2}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant='subtitle1'
                      component='div'
                    >
                      Profile name
                    </Typography>
                    <Button sx={{ mr: 2 }} color='info' variant='contained'>
                      Follow
                    </Button>
                    <Button color='warning' variant='contained'>
                      Message
                    </Button>
                  </Grid>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant='subtitle1'
                      component='div'
                    >
                      353 posts &nbsp; 6,821 followers &nbsp; 06 following
                    </Typography>
                    <Typography variant='body2' gutterBottom>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mauris mollis tempor ex, nec varius sem porta sed. Ut sit
                      amet ex elementum, facilisis neque vel, iaculis ipsum.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <Divider sx={{ maxWidth: 1200, mt: 4 }} />

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <Grid container spacing={2}>
              {sneakers?.map((sneaker) => (
                <Grid item xs={4} key={sneaker.id}>
                  <SneakerCard
                    brand={sneaker.brand}
                    name={sneaker.name}
                    image={sneaker.cover_image}
                    type={sneaker.model}
                    id={sneaker.id}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
