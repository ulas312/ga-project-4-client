import { useEffect, useState } from 'react';
import { API } from '../lib/api';

import SneakerCard from './common/SneakerCard';
import PopupCard from './common/PopupCard';
import '../styles/Feed.scss';

import { Container, Grid, CssBaseline } from '@mui/material';

export default function Feed({ searchedSneakers }) {
  const [sneakers, setSneakers] = useState([]);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allModels)
      .then(({ data }) => {
        setSneakers(data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <Container maxWidth='lg'>
      <CssBaseline />

      <PopupCard />
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
    </Container>
  );
}
