import { Box, Typography, Avatar, Card, CardContent, Divider, Button } from '@mui/material'
import { Email, Phone, Home } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

const AboutUs = () => {
    const theme = useTheme()
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: theme.palette.background.default,
                px: 2,
                pt: 4,
            }}
        >
            {/* Nút quay về Home với tên app */}
            <Button
                variant="text"
                startIcon={<Home />}
                onClick={() => navigate('/')}
                sx={{
                    color: theme.palette.primary.main,
                    mb: 2,
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: 'transparent',
                        textDecoration: 'underline',
                    },
                }}
            >
                UETodoApp
            </Button>

            <Card
                sx={{
                    maxWidth: 500,
                    width: '100%',
                    p: 4,
                    textAlign: 'center',
                    boxShadow: 6,
                    borderRadius: 4,
                    backgroundColor: theme.palette.background.paper,
                }}
            >
                <Avatar
                    alt="Ramsey Trinh"
                    sx={{
                        width: 100,
                        height: 100,
                        mx: 'auto',
                        mb: 2,
                        bgcolor: theme.palette.primary.main,
                        fontSize: 36,
                    }}
                >
                    R
                </Avatar>
                <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                    RamseyTrinh
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    Developer & Creator of this Application
                </Typography>

                <Divider sx={{ my: 3 }} />

                <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
                        <Phone sx={{ color: theme.palette.primary.main, mr: 1 }} />
                        <Typography variant="body1">+84 394 836 338</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <Email sx={{ color: theme.palette.primary.main, mr: 1 }} />
                        <Typography variant="body1">ramsey@example.com</Typography>
                    </Box>
                </CardContent>

                <Typography variant="body2" color="text.secondary" mt={4}>
                    This app is built with passion and care to help users manage tasks and productivity effectively.
                </Typography>
            </Card>
        </Box>
    )
}

export default AboutUs
