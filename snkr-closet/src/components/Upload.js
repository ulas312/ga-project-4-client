import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH } from '../lib/auth';
import {
  TextField,
  Container,
  Box,
  Grid,
  Paper,
  CssBaseline,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
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

  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [brands, setBrands] = useState([]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);
  console.log(formData);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allBrands).then(({ data }) => {
      setBrands(data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append(
      'upload_preset',
      process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const cloudinaryRes = await API.POST(API.ENDPOINTS.cloudinary, imageData);

      const data = {
        ...formData,
        brand: [brands.find((brand) => brand.brand_name === formData.brand).id],
        cover_image: cloudinaryRes.data.public_id,
      };

      await API.POST(API.ENDPOINTS.allModels, data, API.getHeaders());

      navigate('/sneakerModels');
    } catch (err) {
      console.error(err);
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
          backgroundImage: 'url(https://i.postimg.cc/1XTgLyMr/upload-hero.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Container
          maxWidth='lg'
          sx={{ display: 'flex', justifyContent: 'center', pt: 20 }}
        >
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <Typography>Add your sneaker to your closet</Typography>
              <FormControl fullWidth>
                <InputLabel id='sneakerBrands'>Brand</InputLabel>
                <Select
                  size='small'
                  labelId='brands'
                  value={formData.brand}
                  label='Brand'
                  onChange={handleChange}
                  name='brand'
                >
                  <MenuItem value=''>None</MenuItem>
                  {brands.map((brand) => (
                    <MenuItem value={brand.brand_name} key={brand.id}>
                      {brand.brand_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                size='small'
                type='text'
                value={formData.model}
                onChange={handleChange}
                error={error}
                label='Model'
                name='model'
              />
            </Box>

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
                value={formData.colorway}
                onChange={handleChange}
                error={error}
                label='Colorway'
                name='colorway'
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                size='small'
                type='text'
                value={formData.size}
                onChange={handleChange}
                error={error}
                label='Size'
                name='size'
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                size='small'
                type='text'
                value={formData.release_year}
                onChange={handleChange}
                error={error}
                label='Released year'
                name='release_year'
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                size='small'
                type='text'
                value={formData.retail_price}
                onChange={handleChange}
                error={error}
                label='RRP'
                name='retail_price'
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                className='textfield'
                size='small'
                name='profile_image'
                id='profile_image'
                type='file'
                error={error}
                onChange={handleFileChange}
                // sx={{ mb: 2 }}
              />
            </Box>

            <Button type='submit' variant='contained'>
              Upload Sneaker
            </Button>
          </form>
        </Container>
      </Grid>
    </Grid>
  );
}
