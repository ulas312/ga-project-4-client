import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Slide from '@mui/material/Slide';
import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material';

// import ReviewCard from '../common/ReviewCard';
// import UploadedPicture from './UploadedPicture';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function SneakerCard({
  name,
  image,
  model,
  id,
  brand,
  comments,
}) {
  const navigate = useNavigate();
  const navigateToSneaker = () => navigate(`/sneakerModels/${id}`);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log({ name, image, model, id, brand, comments });

  return (
    <Card sx={{ maxWidth: 450, height: 450 }}>
      <CardActionArea onClick={navigateToSneaker}>
        {/* <ImageList
          className='feed-images'
          sx={{ width: '100vw', height: '100vh' }}
          cols={3}
          rowHeight={164}
        >
          <ImageListItem>
            <CardMedia
              className='feed-images'
              component='img'
              image={image}
              alt={name}
              // sx={{ maxHeight: 345, objectFit: 'contain' }}
            />
          </ImageListItem>
        </ImageList> */}

        <ImageList
          sx={{ width: '100vw', height: '100vh', objectFit: 'contain' }}
          cols={3}
          // rowHeight={450}
        >
          <ImageListItem>
            <CardMedia
              className='feed-images'
              component='img'
              image={image}
              alt={name}
              sx={{}}
            />
          </ImageListItem>
        </ImageList>

        {/* <CardMedia
          component='img'
          image={image}
          alt={name}
          sx={{ maxHeight: 345, objectFit: 'contain' }}
        > */}
        {/* <UploadedPicture
            cloudinaryImageId={image.cloudinaryImageId}
          ></UploadedPicture> */}
        {/* </CardMedia> */}
        {/* <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {name}
          </Typography>
          <Typography gutterBottom variant='h5' component='div'>
            {brand[0].brand_name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {model}
          </Typography>
        </CardContent> */}
        {/* <CardContent>
          <Box>
            <ReviewCard
              key={comments._id}
              text={comments.text}
              reviewer={comments.reviewer}
              beerId={id}
              reviewId={comments._id}
              rating={comments.rating}
              // setIsUpdated={setIsUpdated}
            />
          </Box>
        </CardContent> */}
      </CardActionArea>
    </Card>
  );
}
