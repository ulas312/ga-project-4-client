import { useEffect, useState } from 'react';
import { API } from '../lib/api';

import SneakerCard from './common/SneakerCard';
import PopupCard from './common/PopupCard';

import { Container, Grid } from '@mui/material';

export default function Feed({ searchedSneakers }) {
  const [sneakers, setSneakers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await API.GET(API.ENDPOINTS.allModels);
        console.log(data);
        setSneakers(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  // useEffect(() => {
  //   setSneakers(searchedSneakers);
  // }, [searchedSneakers]);

  return (
    <Container maxWidth='lg'>
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
