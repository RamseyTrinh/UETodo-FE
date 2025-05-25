import React, { useState, useMemo, createContext, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function ThemeToggleButton({ children }) {
    const [mode, setMode] = useState('dark');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light'
                        ? {
                            // Light mode palette
                            primary: {
                              main: '#1976d2',
                              contrastText: '#fff',
                            },
                            secondary: {
                              main: '#dc004e',
                            },
                            error: {
                              main: '#d32f2f',
                            },
                            success: {
                              main: '#2e7d32',
                              dark: '#1b5e20',
                              contrastText: '#fff',
                            },
                            background: {
                              default: '#f4f6f8',
                              paper: '#ffffff',
                            },
                            text: {
                              primary: '#212121',
                              secondary: '#757575',
                              disabled: '#bdbdbd',
                            },
                            divider: '#e0e0e0',
                            action: {
                              hover: 'rgba(0, 0, 0, 0.04)',
                              selected: 'rgba(0, 0, 0, 0.08)',
                            },
                          }
                        : {
                
                            primary: {
                              main: '#90CAF9',
                              dark: '#42A5F5',
                              contrastText: '#000000',
                            },
                            secondary: {
                              main: '#CE93D8',
                            },
                            error: {
                              main: '#EF5350',
                            },
                            success: {
                              main: '#66BB6A',
                              dark: '#388E3C',
                              contrastText: '#FFFFFF',
                            },
                            background: {
                              default: '#121212',
                              paper: '#1E1E1E',
                            },
                            text: {
                              primary: '#FFFFFF',
                              secondary: '#B0B0B0',
                              disabled: '#808080',
                            },
                            divider: '#303030',
                            action: {
                              hover: 'rgba(255, 255, 255, 0.08)',
                              selected: 'rgba(255, 255, 255, 0.12)',
                            },
                        }),
                    typography: {
                        fontFamily: 'Roboto, Arial, sans-serif',
                    },
                    shape: {
                        borderRadius: 4,
                    },
                },
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default ThemeToggleButton;