import * as React from 'react';

import {
  Container,
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  Stack,
  Avatar,
  ImageListItem,
  ImageList,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const Profile = () => (
  <>
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Stack>
          <Avatar
            alt='Profile picture'
            // src={ProfilePic}
            sx={{
              height: '12rem',
              width: '12rem',
              // position: 'absolute',
              top: '2%',
              justify: 'center',
              left: '2%',
            }}
          />
          <Box>
            <Typography
              variant='h4'
              gutterBottom
              align='center'
              sx={{
                color: 'black',
                width: '200px',
                mt: 3,
                fontSize: 50,
              }}
            >
              Ulas Temel
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Container>
  </>
);

export default Profile;
