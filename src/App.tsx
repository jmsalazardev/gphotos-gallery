import React from 'react';
import { StyledEngineProvider } from '@mui/material/styles';
import Album from './components/Album';
import './App.css';

function App() {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <Album />
      </StyledEngineProvider>,
    </div>
  );
}

export default App;
