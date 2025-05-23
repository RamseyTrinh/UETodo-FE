import React from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeMode } from '@/themes/ThemeContext'; // Import hook của bạn

const ThemeToggleButton = () => {
    const { mode, toggleThemeMode } = useThemeMode();

    return (
        <IconButton
            onClick={toggleThemeMode}
            color="inherit" // Kế thừa màu từ parent (nếu trong AppBar)
            sx={{
                position: 'fixed', // Giữ nút ở một vị trí cố định
                top: 16,           // Cách top 16px
                right: 16,         // Cách right 16px
                zIndex: 1000,      // Đảm bảo nút nằm trên các phần tử khác
                backgroundColor: 'rgba(0,0,0,0.2)', // Nền hơi trong suốt
                '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.4)',
                },
                color: mode === 'dark' ? '#FFFFFF' : '#222222', // Màu icon tùy theo theme
            }}
        >
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
    );
};

export default ThemeToggleButton;