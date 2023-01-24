import * as React from 'react';
// import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Feed from './components/Feed';
import Sneaker from './components/Sneaker';
import Profile from './components/Profile';
import Upload from './components/Upload';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ff0000',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: '"Bebas Neue", "Helvetica", "Arial", sans-serif',
    fontSize: 25,
  },
});

window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/sneakerModels' element={<Feed />} />
          <Route path='/sneakerModels/:id' element={<Sneaker />} />
          <Route path='/sneakerModels/upload' element={<Upload />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
