import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API } from '../lib/api';
// import BeerRatings from './common/BeerRatings';
// import { useAuthenticated } from '../hooks/useAuthenticated';

import {
  Container,
  Box,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';

// import '../styles/CraftyBeers.scss';
// import ReviewCard from './common/ReviewCard';
import { AUTH } from '../lib/auth';

export default function Sneakers() {
  // const [isLoggedIn] = useAuthenticated();
  const { id } = useParams();
  const navigate = useNavigate();
  const [singleBeer, setSingleBeer] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    API.GET(API.ENDPOINTS.sneakerModels(id))
      .then(({ data }) => {
        setSingleBeer(data);
      })
      .catch(({ message, response }) => {
        console.error(message, response);
      });
    setIsUpdated(false);
  }, [id, isUpdated]);

  // const goToIndex = () => navigate('/crafty-beers');

  // const userHasReviewed = useMemo(() => {
  //   return singleBeer?.reviews
  //     .map((review) => review.reviewer._id)
  //     .some((id) => AUTH.isOwner(id));
  // }, [singleBeer]);

  return (
    <>
      <Container
        maxWidth='lg'
        sx={{ display: 'flex' }}
        className='CraftyBeerShow'
      >
        <Box>
          <img src={singleBeer?.image} alt={singleBeer?.name} />
        </Box>
        <Box>
          <CardContent>
            <Typography variant='h5' component='p'>
              {singleBeer?.name}
            </Typography>
            <Typography color='text.secondary'>{singleBeer?.type}</Typography>
            <Typography color='text.primary' sx={{ fontSize: 18 }} gutterBottom>
              {singleBeer?.description}
            </Typography>
            <Typography color='text.secondary'>
              {singleBeer?.strength}% ABV
            </Typography>
            <Typography color='text.secondary' sx={{ fontSize: 18 }}>
              Brewed by: {singleBeer?.brewery?.name}
            </Typography>
            {/* <BeerRatings rating={singleBeer?.rating || 0} /> */}
          </CardContent>
          <CardActions>
            {/* {isLoggedIn && !userHasReviewed && ( */}
            <Link to={`/crafty-beers/${singleBeer?._id}/review`}>
              <Button size='small'>REVIEW THIS BEER</Button>
            </Link>
            {/* )} */}
            {/* <Button size='small' onClick={goToIndex}>
              BACK TO THE PARTY
            </Button> */}
          </CardActions>
        </Box>
      </Container>
      {!!singleBeer?.reviews.length && (
        <Container maxWidth='lg'>
          <Box>
            {/* {singleBeer?.reviews.map((review) => (
              <ReviewCard
                key={review._id}
                text={review.text}
                reviewer={review.reviewer}
                beerId={id}
                reviewId={review._id}
                rating={review.rating}
                setIsUpdated={setIsUpdated}
              />
            ))} */}
          </Box>
        </Container>
      )}
    </>
  );
}
