import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material/styles';

import Home from './routes/home';
import Albums from './routes/albums';
import Album from './routes/album';

import './App.css';

function App() {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/albums' element={<Albums />} />
          <Route path='/albums/:id' element={<Album />} />
        </Routes>
      </BrowserRouter>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
