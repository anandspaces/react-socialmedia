import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Box, RadioGroup, Radio, FormControl, FormControlLabel, FormLabel, Typography, Paper } from '@mui/material';

import Login from './pages/Login';
import Home from './pages/Home';

function App(){
  const [mode, setMode] = useState('light');

  const theme = createTheme({
    palette: { mode },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container maxWidth="md" className="py-8">
          {/* Theme Switcher */}
          <Paper elevation={3} className="p-4 rounded-lg shadow-md">
            <Typography variant="h6" className="font-semibold text-gray-700 dark:text-gray-300">
              Theme Selection
            </Typography>
            <FormControl component="fieldset" className="mt-2">
              <FormLabel component="legend">Choose Theme</FormLabel>
              <RadioGroup
                row
                value={mode}
                onChange={(event) => setMode(event.target.value)}
              >
                <FormControlLabel value="light" control={<Radio />} label="Light" />
                <FormControlLabel value="dark" control={<Radio />} label="Dark" />
              </RadioGroup>
            </FormControl>
          </Paper>

          {/* App Routes */}
          <Box className="mt-6">
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
