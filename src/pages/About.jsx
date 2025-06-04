import React from 'react'
import {
    Box,
    Typography,
    Avatar,
    Card,
    CardContent,
    Divider,
    Button,
    Grid,
    Stack,
    Chip,
} from '@mui/material'
import { Email, Phone, Home } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const AboutUs = () => {
    const theme = useTheme()
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                minHeight: '100vh',
                p: 4,
                background: `linear-gradient(to bottom right, ${theme.palette.grey[100]}, ${theme.palette.background.default})`,
            }}
        >
            {/* Top Bar */}
            <Box alignContent={'center'}>
                <Button
                    startIcon={<Home />}
                    onClick={() => navigate('/')}
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: theme.palette.primary.main,
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: 'transparent',
                            textDecoration: 'underline',
                        },
                    }}
                >
                    UETodo
                </Button>
                {/* <Button
          variant="contained"
          onClick={() => navigate('/login')}
          sx={{ textTransform: 'none', borderRadius: 3, px: 3 }}
        >
          Get Started
        </Button> */}
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Main Content */}
            <Grid container spacing={4} alignItems="center">
                {/* Avatar + Info */}
                <Grid item xs={12} md={5}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card
                            sx={{
                                p: 4,
                                borderRadius: 6,
                                boxShadow: 10,
                                textAlign: 'center',
                            }}
                        >
                            <Avatar
                                alt="Ramsey Trinh"
                                src="/src/assets/avatar_image.jpg"
                                sx={{
                                    width: 120,
                                    height: 120,
                                    mb: 2,
                                    mx: 'auto',
                                    border: `4px solid ${theme.palette.primary.main}`,
                                }}
                            />
                            <Typography variant="h5" fontWeight="bold" color="primary">
                                Ramsey Trinh
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Developer & Creator
                            </Typography>

                            <Divider sx={{ my: 3 }} />
                            <Stack spacing={1.5} alignItems="center">
                                <Box display="flex" alignItems="center">
                                    <Phone fontSize="small" sx={{ color: theme.palette.primary.main, mr: 1 }} />
                                    <Typography variant="body1">+84 394 836 338</Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <Email fontSize="small" sx={{ color: theme.palette.primary.main, mr: 1 }} />
                                    <Typography variant="body1">hoangkmhd190@gmail.com</Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" width={20} style={{ marginRight: 8, color: 'blue' }} />
                                    <Typography variant="body1">
                                        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'secondary' }}>
                                            https://github.com/RamseyTrinh
                                        </a>
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="Facebook" width={20} style={{ marginRight: 8 }} />
                                    <Typography variant="body1">
                                        <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'secondary' }}>
                                            https://www.facebook.com/ramseytrinh1405
                                        </a>
                                    </Typography>
                                </Box>

                            </Stack>
                        </Card>
                    </motion.div>
                </Grid>

                {/* Description */}
                <Grid item xs={12} md={7}>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card
                            sx={{
                                p: 4,
                                borderRadius: 6,
                                boxShadow: 10,
                                backgroundColor: theme.palette.grey[50],
                            }}
                        >
                            <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: theme.palette.primary.main }}>
                                About the App
                            </Typography>
                            <Typography variant="body1" mb={3}>
                                UETodoApp is designed to help students and professionals manage their time
                                and tasks more efficiently. Built with passion and modern technologies,
                                this app aims to simplify your daily routine with clean design and seamless user experience.
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="h6" fontWeight="medium" mb={1} sx={{ color: theme.palette.primary.main }}>
                                🚀 Technologies Used
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" spacing={1} mb={3} justifyContent="center">
                                {['React', 'MUI', 'Framer Motion', 'React Router', 'Node.js', 'MongoDB'].map((tech) => (
                                    <Chip key={tech} label={tech} color="primary" variant="outlined" />
                                ))}
                            </Stack>
                            <Typography variant="h6" fontWeight="medium" mb={1} sx={{ color: theme.palette.primary.main }}>
                                🎯 Mission
                            </Typography>
                            <Typography variant="body1" mb={3}>
                                To empower users with a tool that enhances focus, organization, and long-term productivity through intuitive task management.
                            </Typography>
                            <Typography variant="h6" fontWeight="medium" mb={1} sx={{ color: theme.palette.primary.main }}>
                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" width={20} style={{ marginRight: 8, color: 'blue' }} />
                                Reposistory
                            </Typography>
                            <Typography variant="body1">
                                You can find the source code for this project on GitHub:&nbsp;
                                <a
                                    href="https://github.com/RamseyTrinh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: theme.palette.primary.main, textDecoration: 'none', fontWeight: 'bold' }}
                                >
                                    https://github.com/RamseyTrinh
                                </a>
                            </Typography>
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AboutUs
