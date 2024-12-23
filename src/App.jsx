import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import Login from './pages/Login';
import Home from './pages/Home';

const App = () => {
  const [mode, setMode] = useState('light'); // Default to light mode

  const theme = createTheme({
    palette: {
      mode,
    },
  });

  const handleThemeChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'background.default',
          color: 'text.primary',
          minHeight: '100vh',
          p: 3,
        }}
      >
        {/* Theme Switcher */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 500,
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 2,
            mb: 4,
            boxShadow: 1,
          }}
        >
          <FormControl>
            <FormLabel id="theme-toggle-label">Theme</FormLabel>
            <RadioGroup
              aria-labelledby="theme-toggle-label"
              name="theme-toggle"
              row
              value={mode}
              onChange={handleThemeChange}
            >
              <FormControlLabel value="light" control={<Radio />} label="Light" />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* App Routes */}
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
};

export default App;
