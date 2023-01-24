import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Container,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { API } from '../lib/api';

export default function Upload() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    name: '',
    colorway: '',
    size: '',
    release_year: '',
    retail_price: '',
    cover_image: '',
    owner: '',
  });
  const [error, setError] = useState(false);
  const [availableBrands, setAvailableBrands] = useState([]);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allBrands)
      .then(({ data }) => setAvailableBrands(data))
      .catch((e) => console.log(e));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = formData.brewery
      ? formData
      : {
          name: formData.name,
          description: formData.description,
          type: formData.type,
          strength: formData.strength,
          image: formData.image,
        };

    API.POST(API.ENDPOINTS.allBeers, data, API.getHeaders())
      .then(({ data }) => {
        navigate(`/crafty-beers/${data._id}`);
      })
      .catch((e) => {
        if (e.status === 301) {
          setError(true);
        }
        console.log(e);
      });
  };

  return (
    <Container
      maxWidth='lg'
      sx={{ display: 'flex', justifyContent: 'center', pt: 5 }}
    >
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            size='small'
            type='text'
            value={formData.name}
            onChange={handleChange}
            error={error}
            label='Name'
            name='name'
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            size='small'
            type='text'
            value={formData.description}
            onChange={handleChange}
            error={error}
            label='Description'
            name='description'
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            size='small'
            type='text'
            value={formData.type}
            onChange={handleChange}
            error={error}
            label='Type'
            name='type'
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            size='small'
            type='number'
            value={formData.strength}
            onChange={handleChange}
            error={error}
            label='Strength'
            name='strength'
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            size='small'
            type='text'
            value={formData.image}
            onChange={handleChange}
            error={error}
            label='Image'
            name='image'
          />
        </Box>
        <Box>
          <FormControl fullWidth>
            <InputLabel id='brand'>Brand</InputLabel>
            <Select
              size='small'
              labelId='brand'
              value={formData.brand}
              label='Brand'
              name='brand'
              onChange={handleChange}
            >
              <MenuItem value=''>None</MenuItem>
              {availableBrands.map((brand) => (
                <MenuItem key={brand._id} value={brand._id}>
                  {brand.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button type='submit'>Add My Sneaker</Button>
      </form>
    </Container>
  );
}
