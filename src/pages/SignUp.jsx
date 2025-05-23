import React, { useState } from 'react';
import { Alert, Box, Button, Card, IconButton, InputAdornment, TextField, Typography, useTheme } from '@mui/material';
import { LockOutlined, PersonOutline, Visibility, VisibilityOff, EmailOutlined } from '@mui/icons-material';
import { PATHS } from '@/routers/path';
import { register } from '@/services/auth'; // Assuming this service is correctly implemented - No need to import, not used

const RegisterPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const theme = useTheme(); // Use the useTheme hook

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');
        setSubmitLoading(true);

        if (values.password !== values.confirmPassword) {
            setError("Passwords do not match.");
            setSubmitLoading(false);
            return;
        }

        try {
            const response = await register(values);
            if (response.status === 200) {
                console.log("Registration successful with:", values);

                setSuccess('Registration successful! Redirecting to login...');
                setTimeout(() => {
                    window.location.href = PATHS.login; // Using window.location.href for full page reload as per original
                }, 2000);
            }
            
        } catch (e) {
            console.error(e);
            setError(e.message || "Registration failed. Please try again.");
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: theme.palette.background.default, // Use theme background color
            }}
        >
            <Card
                sx={{
                    width: '400px',
                    padding: 4,
                    textAlign: 'center',
                    backgroundColor: theme.palette.background.paper, // Use theme paper color
                    borderRadius: 2,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
                }}
            >
                <Typography variant="h5" sx={{ mb: 1, color: theme.palette.text.primary, fontWeight: 'bold' }}>
                    Create an account
                </Typography>
                <Typography variant="body2" sx={{ mb: 3, color: theme.palette.text.secondary }}>
                    Fill in your details to create a new account.
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Username"
                        placeholder='Enter your username'
                        variant="outlined"
                        value={values.username}
                        onChange={handleChange('username')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutline sx={{ color: theme.palette.text.secondary }} />
                                </InputAdornment>
                            ),
                        }}
                        InputLabelProps={{}}
                        sx={{
                            mb: 2,
                        }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        placeholder="Enter your email"
                        variant="outlined"
                        value={values.email}
                        onChange={handleChange('email')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailOutlined sx={{ color: theme.palette.text.secondary }} />{/* Changed to EmailOutlined */}
                                </InputAdornment>
                            ),
                        }}
                        InputLabelProps={{}}
                        sx={{
                            mb: 2,
                        }}
                        required
                        type="email"
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        placeholder="Enter your password"
                        variant="outlined"
                        type={passwordVisible ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlined sx={{ color: theme.palette.text.secondary }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        edge="end"
                                        sx={{ color: theme.palette.text.secondary }}
                                    >
                                        {passwordVisible ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        InputLabelProps={{}}
                        sx={{
                            mb: 2,
                        }}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        placeholder="Re-enter your password"
                        variant="outlined"
                        type={passwordVisible ? 'text' : 'password'}
                        value={values.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlined sx={{ color: theme.palette.text.secondary }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        edge="end"
                                        sx={{ color: theme.palette.text.secondary }}
                                    >
                                        {passwordVisible ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        InputLabelProps={{}}
                        sx={{
                            mb: 3,
                        }}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={submitLoading}
                        sx={{
                            mb: 2,
                            backgroundColor: theme.palette.primary.main, // Green background from theme
                            '&:hover': {
                                backgroundColor: theme.palette.primary.dark, // Darker green on hover
                            },
                            color: theme.palette.primary.contrastText, // White text
                            fontWeight: 'bold',
                            textTransform: 'none',
                            py: 1.5,
                        }}
                    >
                        {submitLoading ? 'Registering...' : 'Register'}
                    </Button>
                </form>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mt: 2,
                    }}
                >
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        Already have an account?{' '}
                        <Button
                            href={PATHS.login}
                            size="small"
                            variant="text"
                            sx={{
                                textTransform: 'none',
                                p: 0,
                                color: theme.palette.primary.main, // Green color for the link from theme
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    textDecoration: 'underline',
                                    color: theme.palette.primary.dark,
                                },
                            }}
                        >
                            Login
                        </Button>
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
};

export default RegisterPage;
