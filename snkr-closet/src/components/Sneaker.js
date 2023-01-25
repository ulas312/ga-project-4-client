import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API } from '../lib/api';
// import BeerRatings from './common/BeerRatings';
// import { useAuthenticated } from '../hooks/useAuthenticated';

import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Container,
  Card,
  Grid,
  CardHeader,
  CardMedia,
  Collapse,
  Paper,
  Avatar,
  IconButton,
  Box,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

import '../styles/Sneaker.scss';
// import ReviewCard from './common/ReviewCard';
import { AUTH } from '../lib/auth';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Sneakers() {
  // const [isLoggedIn] = useAuthenticated();
  const { id } = useParams();
  const navigate = useNavigate();
  const [singleSneaker, setSingleSneaker] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    API.GET(API.ENDPOINTS.singleModel(id))
      .then(({ data }) => {
        setSingleSneaker(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
    setIsUpdated(false);
  }, [id, isUpdated]);

  console.log(singleSneaker);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid container xs={10} md={7} lg={8} spacing={0}>
            <Grid xs={10} lg={3}>
              <Item>
                <Box>
                  <img
                    className='sneakerImg'
                    src={singleSneaker?.cover_image}
                    alt={singleSneaker?.name}
                  />
                </Box>
              </Item>
            </Grid>
            <Grid xs={6} lg={3}>
              <Item>
                <CardHeader
                  avatar={<Avatar sx={{}} aria-label=''></Avatar>}
                  action={
                    <IconButton aria-label='settings'>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={singleSneaker?.owner.username}
                  subheader='January 25, 2023'
                />
                <CardContent>
                  <Typography variant='body2' color='text.secondary'>
                    {singleSneaker?.brand[0].brand_name}
                  </Typography>
                  <Typography variant='h5' component='p'>
                    {singleSneaker?.model}
                  </Typography>
                  <Typography color='text.secondary'>
                    {singleSneaker?.name}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label='add to favorites'>
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label='share'>
                    <ShareIcon />
                  </IconButton>
                </CardActions>
                <CardContent>
                  <Typography color='text.primary' paragraph gutterBottom>
                    Color:&ensp;{singleSneaker?.colorway}
                  </Typography>
                  <Typography color='text.secondary'>
                    Size UK:&ensp;{singleSneaker?.size}
                  </Typography>
                  <Typography color='text.secondary'>
                    Released:&ensp;{singleSneaker?.release_year}
                  </Typography>
                  <Typography color='text.secondary'>
                    RRP £:&ensp;{singleSneaker?.retail_price}
                  </Typography>
                  <Typography paragraph>Comments</Typography>
                </CardContent>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* <Card sx={{ maxWidth: 800 }}>
        <CardHeader
          avatar={<Avatar sx={{}} aria-label=''></Avatar>}
          action={
            <IconButton aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
          }
          title={singleSneaker?.owner.username}
          subheader='January 25, 2023'
        />
        <Box>
          <img src={singleSneaker?.cover_image} alt={singleSneaker?.name} />
        </Box>
        <CardContent>
          <Typography variant='body2' color='text.secondary'>
            {singleSneaker?.brand[0].brand_name}
          </Typography>
          <Typography variant='h5' component='p'>
            {singleSneaker?.model}
          </Typography>
          <Typography color='text.secondary'>{singleSneaker?.name}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label='share'>
            <ShareIcon />
          </IconButton>
        </CardActions>
        <CardContent>
          <Typography color='text.primary' paragraph gutterBottom>
            Color:&ensp;{singleSneaker?.colorway}
          </Typography>
          <Typography color='text.secondary'>
            Size UK:&ensp;{singleSneaker?.size}
          </Typography>
          <Typography color='text.secondary'>
            Released:&ensp;{singleSneaker?.release_year}
          </Typography>
          <Typography color='text.secondary'>
            RRP £:&ensp;{singleSneaker?.retail_price}
          </Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
        </CardContent>
      </Card> */}
      {/* <Container maxWidth='lg' sx={{ display: 'flex' }}>
        <Box>
          <img src={singleSneaker?.cover_image} alt={singleSneaker?.name} />
        </Box>
        <Box>
          <CardContent>
            <Typography color='text.secondary' sx={{ fontSize: 18 }}>
              {singleSneaker?.brand[0].brand_name}
            </Typography>
            <Typography variant='h5' component='p'>
              {singleSneaker?.model}
            </Typography>
            <Typography color='text.secondary'>
              {singleSneaker?.name}
            </Typography>
            <Typography color='text.primary' sx={{ fontSize: 18 }} gutterBottom>
              {singleSneaker?.colorway}
            </Typography>
            <Typography color='text.secondary'>
              {singleSneaker?.size}
            </Typography>
            <Typography color='text.secondary'>
              {singleSneaker?.release_year}
            </Typography>
            <Typography color='text.secondary'>
              {singleSneaker?.retail_price}
            </Typography>
            <Typography color='text.secondary'>
              {singleSneaker?.owner.username}
            </Typography>
          </CardContent>
        </Box>
      </Container> */}
    </>
  );
}
