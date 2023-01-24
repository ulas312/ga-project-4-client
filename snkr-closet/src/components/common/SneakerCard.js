import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function SneakerCard({ name, image, model, id, brand }) {
  const navigate = useNavigate();
  const navigateToSneaker = () => navigate(`/sneakerModels/${id}`);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ maxWidth: 345, height: 450 }}>
      <CardActionArea onClick={navigateToSneaker}>
        <CardMedia
          component='img'
          image={image}
          alt={name}
          sx={{ maxHeight: 345, objectFit: 'contain' }}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {name}
          </Typography>
          <Typography gutterBottom variant='h5' component='div'>
            {brand[0].brand_name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {model}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
