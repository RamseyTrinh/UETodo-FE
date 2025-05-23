import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import ThemeToggleButton from '@/components/ThemeToggleButton';

const HeroSection = styled('div')(({ theme }) => ({
  background: 'linear-gradient(135deg, #121e13, #0c0f0c)',
  color: 'white',
  padding: theme.spacing(10, 0),
  textAlign: 'center',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  backgroundColor: '#4CAF50',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#45a049',
  },
}));

const Home = () => {
  return (
    <Box>
      <AppBar position="fixed" color="default" elevation={1}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }} component={Link} to="/">
            UEToDo Task
          </Typography>
          <Box mr={4}>
          <Button color="inherit">Product</Button>
          <Button color="inherit">Solutions</Button>
          <Button color="inherit">Support</Button>
          <Button color="inherit">Pricing</Button>
          <Button color="inherit">About Us</Button>
          <StyledButton variant="contained" component={Link} to="/login">Try Now</StyledButton>
          <ThemeToggleButton />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <HeroSection>
        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
          Doo<span style={{ color: '#66bb6a' }}>Task</span>, Lightweight task management tool
        </Typography>
        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
          Lightweight open source online project task management tool to help teams efficiently advance their projects and make work easier.
        </Typography>
        <Box sx={{ marginTop: 4 }}>
          <StyledButton variant="contained">Get Started</StyledButton>
          <StyledButton variant="outlined">Self Hosting</StyledButton>
        </Box>
      </HeroSection>

      {/* Images and more content */}
      <Container sx={{ textAlign: 'center', padding: 4 }}>
        <img
          src="/your-uploaded-image-path.png"
          alt="Dashboard preview"
          style={{ width: '100%', maxWidth: 1000, borderRadius: 10 }}
        />
      </Container>
    </Box>
  );
};

export default Home;
