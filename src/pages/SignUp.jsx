import React, {useState} from 'react';
import {Alert, Box, Button, Card, IconButton, InputAdornment, TextField, Typography,} from '@mui/material';
import {LockOutlined, PersonOutline, Visibility, VisibilityOff} from '@mui/icons-material';
import {PATHS} from '@/routers/path';
import {register} from '@/services/auth';

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

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');
        setSubmitLoading(true);
        try {
            await register(values);
            setSuccess('Đăng ký thành công! Đang chuyển hướng...');
            setTimeout(() => {
                window.location.href = PATHS.login;
            }, 2000);
        } catch (e) {
            console.error(e);
            setError(e.message);
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '50px',
            }}
        >
            <Card
                sx={{
                    width: '30vw',
                    padding: 4,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h5" sx={{mb: 2}}>Đăng ký</Typography>
                {error && <Alert severity="error" sx={{mb: 2}}>{error}</Alert>}
                {success && <Alert severity="success" sx={{mb: 2}}>{success}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Tên người dùng"
                        variant="outlined"
                        value={values.username}
                        onChange={handleChange('username')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutline/>
                                </InputAdornment>
                            ),
                        }}
                        sx={{mb: 2}}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        value={values.email}
                        onChange={handleChange('email')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonOutline/>
                                </InputAdornment>
                            ),
                        }}
                        sx={{mb: 2}}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Mật khẩu"
                        variant="outlined"
                        type={passwordVisible ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlined/>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        edge="end"
                                    >
                                        {passwordVisible ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{mb: 2}}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Xác nhận mật khẩu"
                        variant="outlined"
                        type={passwordVisible ? 'text' : 'password'}
                        value={values.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlined/>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        edge="end"
                                    >
                                        {passwordVisible ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{mb: 2}}
                        required
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2,
                        }}
                    >
                        <Typography variant="body2">
                            Bạn đã có tài khoản?{' '}
                            <Button
                                href={PATHS.login}
                                size="small"
                                variant="text"
                                sx={{textTransform: 'none', p: 0}}
                            >
                                Đăng nhập
                            </Button>
                        </Typography>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={submitLoading}
                        >
                            {submitLoading ? 'Đang đăng ký...' : 'Đăng ký'}
                        </Button>
                    </Box>
                </form>
            </Card>
        </Box>
    );
};

export default RegisterPage;
