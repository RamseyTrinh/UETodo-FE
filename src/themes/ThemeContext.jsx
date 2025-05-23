import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'; // Helps reset CSS and provides basic theme styles

// Tạo context để lưu trữ trạng thái theme và hàm toggle
const ThemeContext = createContext();

export const useThemeMode = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // Lấy theme từ localStorage hoặc mặc định là 'light'
    const [mode, setMode] = useState(() => localStorage.getItem('app-theme') || 'light');

    // Hàm chuyển đổi theme
    const toggleThemeMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    // Lưu theme vào localStorage mỗi khi mode thay đổi
    useEffect(() => {
        localStorage.setItem('app-theme', mode);
    }, [mode]);

    // Tạo theme dựa trên mode hiện tại
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: mode, // 'light' or 'dark'
                    ...(mode === 'light'
                        ? {
                              // Màu sắc cho chế độ light
                              primary: {
                                  main: '#1976d2', // Blue
                              },
                              secondary: {
                                  main: '#dc004e', // Red
                              },
                              background: {
                                  default: '#f0f2f5', // Light background for pages
                                  paper: '#ffffff', // White background for cards/papers
                              },
                              text: {
                                  primary: '#222222', // Dark text
                                  secondary: '#555555', // Grey text
                              },
                          }
                        : {
                              // Màu sắc cho chế độ dark (phù hợp với theme DooTask)
                              primary: {
                                  main: '#66BB6A', // Green for primary actions
                              },
                              secondary: {
                                  main: '#FFA726', // Orange for secondary actions
                              },
                              background: {
                                  default: '#222222', // Dark background for pages
                                  paper: '#2E2E2E', // Darker background for cards/papers
                              },
                              text: {
                                  primary: '#FFFFFF', // White text
                                  secondary: '#B0B0B0', // Light grey text
                              },
                          }),
                },
                // Bạn có thể thêm typography, shadows, v.v., ở đây
                typography: {
                    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                },
                components: {
                    MuiCard: {
                        styleOverrides: {
                            root: {
                                borderRadius: '8px',
                            },
                        },
                    },
                    MuiButton: {
                        styleOverrides: {
                            root: {
                                textTransform: 'none',
                                fontWeight: 'bold',
                            },
                        },
                    },
                    MuiTextField: {
                        styleOverrides: {
                            root: {
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: mode === 'dark' ? '#444444' : '#E0E0E0',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: mode === 'dark' ? '#66BB6A' : '#1976d2',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: mode === 'dark' ? '#66BB6A' : '#1976d2',
                                    },
                                },
                                '& .MuiInputBase-input': {
                                    color: mode === 'dark' ? '#FFFFFF' : '#222222',
                                },
                                '& .MuiInputLabel-root': {
                                    color: mode === 'dark' ? '#B0B0B0' : '#555555',
                                },
                            },
                        },
                    },
                    MuiInputAdornment: {
                        styleOverrides: {
                            root: {
                                color: mode === 'dark' ? '#B0B0B0' : '#555555',
                            },
                        },
                    },
                },
            }),
        [mode],
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleThemeMode }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline /> {/* Áp dụng CSS cơ bản của Material-UI và reset CSS */}
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};