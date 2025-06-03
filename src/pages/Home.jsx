import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const HeroSection = styled('div')(({ theme }) => ({
  background: 'linear-gradient(135deg, #0d47a1, #1976d2)', // gradient xanh đậm -> xanh chuẩn MUI primary
  color: '#e3f2fd',
  padding: theme.spacing(12, 2),
  textAlign: 'center',
  minHeight: '70vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(8, 2),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 30,
  padding: '12px 36px',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  textTransform: 'none',
  backgroundColor: '#1976d2', // xanh chuẩn primary
  color: '#fff',
  boxShadow: '0 4px 12px rgb(25 118 210 / 0.5)',
  '&:hover': {
    backgroundColor: '#1565c0',
    boxShadow: '0 6px 16px rgb(21 101 192 / 0.7)',
  },
}));

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#1976d2',
          boxShadow: '0 2px 8px rgb(25 118 210 / 0.6)',
          paddingLeft: 0, // fix khoảng trắng bên trái
          paddingRight: 0, // fix khoảng trắng bên phải
        }}
      >
        <Toolbar
          sx={{
            minHeight: 64,
            px: 2, // padding trái phải đều nhau (16px)
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: 1200,
            mx: 'auto', // căn giữa trong maxWidth
            width: '100%',
          }}
        >
          <Box
            onClick={() => navigate('/')}
            sx={{
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1.5rem',
              color: '#e3f2fd',
              letterSpacing: 1,
              userSelect: 'none',
            }}
          >
            UETodo App
          </Box>
          <Box>
            <Button
              sx={{
                color: '#e3f2fd',
                textTransform: 'none',
                fontWeight: '600',
                mr: 1.5,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)' },
              }}
              onClick={() => navigate('/product')}
            >
              Product
            </Button>
            <Button
              sx={{
                color: '#e3f2fd',
                textTransform: 'none',
                fontWeight: '600',
                mr: 2,
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.15)' },
              }}
              onClick={() => navigate('/about')}
            >
              About Us
            </Button>
            <StyledButton onClick={() => navigate('/login')}>Try Now</StyledButton>
          </Box>
        </Toolbar>
      </AppBar>

      <HeroSection>
        <Typography
          variant={isMobile ? 'h4' : 'h2'}
          sx={{ fontWeight: '900', letterSpacing: 1, lineHeight: 1.2 }}
        >
          Doo
          <Box component="span" sx={{ color: '#a5d6a7' }}>
            Task
          </Box>
          , Lightweight task management tool
        </Typography>
        <Typography
          variant={isMobile ? 'body1' : 'h6'}
          sx={{ marginTop: 3, maxWidth: 600, marginX: 'auto', fontWeight: 500 }}
        >
          Lightweight open source online project task management tool to help teams
          efficiently advance their projects and make work easier.
        </Typography>
        <Box sx={{ marginTop: 5 }}>
          <StyledButton onClick={() => navigate('/get-started')}>Get Started</StyledButton>
        </Box>
      </HeroSection>

      <Container sx={{ textAlign: 'center', paddingY: 6, maxWidth: 1200 }}>
        <img
          src="/your-uploaded-image-path.png"
          alt="Dashboard preview"
          style={{
            width: '100%',
            borderRadius: 16,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          }}
        />
      </Container>
    </Box>
  );
};

export default Home;
