import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API } from '../lib/api';
// import BeerRatings from './common/BeerRatings';
// import { useAuthenticated } from '../hooks/useAuthenticated';

import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Grid,
  CardHeader,
  CssBaseline,
  Paper,
  Avatar,
  IconButton,
  Box,
  CardContent,
  Typography,
  CardActions,
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
      <CssBaseline />
      <Box>
        <Grid
          sx={{
            position: 'absolute',
            top: '15vh',
            justify: 'center',
            left: '18%',
          }}
        >
          <Item
            sx={{
              width: 600,
              height: '50vh',
              objectFit: 'contain',
            }}
          >
            <Box>
              <img
                className='sneakerImg'
                src={singleSneaker?.cover_image}
                alt={singleSneaker?.name}
              />
            </Box>
          </Item>
        </Grid>
        <Grid
          sx={{
            position: 'absolute',
            top: '15vh',
            justify: 'center',
            left: '50%',
          }}
          xs={6}
          lg={3}
        >
          <Item
            sx={{
              width: 600,
              height: '50vh',
              objectFit: 'contain',
            }}
          >
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
      </Box>
    </>
  );
}
