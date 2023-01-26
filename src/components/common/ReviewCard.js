import { useState } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextareaAutosize,
} from '@mui/material';

import ProfilePicture from './ProfilePicture';

import { AUTH } from '../../lib/auth';
import { API } from '../../lib/api';

export default function ReviewCard({
  text,
  reviewer,
  sneaker_Model,
  reviewId,
  setIsUpdated,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [reviewText, setReviewText] = useState(text);

  const toggleEditMode = () => setIsEditMode(!isEditMode);
  const handleReviewTextChange = (e) => setReviewText(e.target.value);

  const saveChanges = () => {
    if (text !== reviewText) {
      API.PUT(
        API.ENDPOINTS.allModels(sneaker_Model, reviewId),
        { text: reviewText },
        API.getHeaders()
      )
        .then(() => {
          toggleEditMode();
          setIsUpdated(true);
        })
        .catch((e) => console.log(e));
    }
  };

  const deleteReview = () => {
    API.DELETE(
      API.ENDPOINTS.allModels(sneaker_Model, reviewId),
      API.getHeaders()
    )
      .then(() => {
        setIsUpdated(true);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Card sx={{ minWidth: 275, mb: 3 }}>
      <CardContent>
        {reviewer.cloudinaryImageId && (
          <ProfilePicture
            cloudinaryImageId={reviewer.cloudinaryImageId}
          ></ProfilePicture>
        )}
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {reviewer.username}
        </Typography>
        {isEditMode ? (
          <TextareaAutosize
            value={reviewText}
            onChange={handleReviewTextChange}
            style={{ width: '100%', height: '22px' }}
          />
        ) : (
          <Typography variant='h5' component='div'>
            {text}
          </Typography>
        )}
      </CardContent>
      {(AUTH.isOwner(reviewer._id) || AUTH.getPayload().isAdmin) && (
        <CardActions>
          {AUTH.isOwner(reviewer._id) && (
            <Button size='small' onClick={toggleEditMode}>
              {isEditMode ? 'CANCEL' : 'EDIT REVIEW'}
            </Button>
          )}
          <Button
            size='small'
            onClick={isEditMode ? saveChanges : deleteReview}
          >
            {isEditMode ? 'SAVE CHANGES' : 'DELETE REVIEW'}
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
