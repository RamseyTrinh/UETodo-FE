import React from 'react';
import {
    Box,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Toolbar, // Toolbar được giữ lại để tạo khoảng trống dưới AppBar chính
    Card,
    CardContent,
    Grid,
    LinearProgress,
    Avatar,
    AvatarGroup,
    useTheme, // Import useTheme để truy cập theme đã định nghĩa
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom'; // Import Link và useLocation cho điều hướng sidebar

const drawerWidth = 240;

// Định nghĩa các PATHS cho Sidebar
// Đảm bảo các path này khớp với PATHS trong src/routers/path.js của bạn
// và các route con trong src/routers/Routers.jsx
const DASHBOARD_PATHS = {
    dashboard: '/dashboard',
    calendar: '/calendar', // Giả định bạn có trang Calendar
    message: '/message',   // Giả định bạn có trang Message
    file: '/file',         // Giả định bạn có trang File
    shop: '/shop',         // Thêm nếu bạn muốn Shop trong sidebar
    payment: '/payment',   // Thêm nếu bạn muốn Payment trong sidebar
};

const stats = [
    { label: 'Due today', value: 3, color: 'primary' },
    { label: 'Overdue task', value: 4, color: 'error' },
    { label: 'Task to be completed', value: 32, color: 'success' },
];

const tasks = [
    'Follow up the B&B agency path',
    'Consult the interior design of homestay class',
    'Evaluate the input cost to complete the smart homestay solution',
];

const Dashboard = () => {
    const theme = useTheme(); // Lấy đối tượng theme hiện tại
    const location = useLocation(); // Lấy đối tượng location để xác định đường dẫn hiện tại

    return (
        <Box sx={{ display: 'flex', bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
            {/* Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        // Sử dụng màu nền 'paper' của theme cho Drawer
                        bgcolor: theme.palette.background.paper,
                        // Sử dụng màu chữ 'primary' của theme cho văn bản trong Drawer
                        color: theme.palette.text.primary,
                        boxShadow: theme.shadows[2], // Thêm một chút đổ bóng cho Drawer
                    },
                }}
            >
                <Toolbar /> {/* Tạo khoảng trống tương ứng với chiều cao của AppBar */}
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {[
                            { text: 'Dashboard', path: DASHBOARD_PATHS.dashboard },
                            { text: 'Calendar', path: DASHBOARD_PATHS.calendar },
                            { text: 'Message', path: DASHBOARD_PATHS.message },
                            { text: 'File', path: DASHBOARD_PATHS.file },
                            // Thêm các mục khác nếu cần, ví dụ:
                            // { text: 'Shop', path: DASHBOARD_PATHS.shop },
                            // { text: 'Payment', path: DASHBOARD_PATHS.payment },
                        ].map((item) => (
                            <ListItem
                                button
                                key={item.text}
                                component={Link} // Sử dụng Link từ react-router-dom để điều hướng
                                to={item.path}
                                sx={{
                                    // Thay đổi màu nền và màu chữ khi mục được chọn (active)
                                    bgcolor: location.pathname === item.path
                                        ? theme.palette.action.selected // Màu nền khi được chọn
                                        : 'inherit', // Màu nền mặc định
                                    '&:hover': {
                                        bgcolor: theme.palette.action.hover, // Màu nền khi hover
                                    },
                                    color: location.pathname === item.path
                                        ? theme.palette.primary.main // Màu chữ primary khi được chọn
                                        : theme.palette.text.primary, // Màu chữ mặc định
                                }}
                            >
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            {/* Main content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: theme.palette.background.default }}>
                <Toolbar /> {/* Tạo khoảng trống tương ứng với chiều cao của AppBar */}
                <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.primary }}>
                    Welcome back, Doo
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ color: theme.palette.text.secondary }}>
                    Here are your current task statistics
                </Typography>

                {/* Stats Cards */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    {stats.map((stat, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                            <Card
                                sx={{
                                    // Sử dụng màu từ theme.palette dựa trên thuộc tính 'color' của stat
                                    bgcolor: theme.palette[stat.color].main,
                                    // Màu chữ tương phản với màu nền của card
                                    color: theme.palette[stat.color].contrastText,
                                    borderRadius: theme.shape.borderRadius, // Sử dụng border radius từ theme
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6">{stat.label}</Typography>
                                    <Typography variant="h4">{stat.value}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Task List */}
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
                    Task to be completed
                </Typography>
                <List sx={{ bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius, p: 2 }}>
                    {tasks.map((task, index) => (
                        <ListItem key={index} sx={{ pl: 0, color: theme.palette.text.primary }}>
                            <ListItemText primary={task} />
                        </ListItem>
                    ))}
                </List>

                {/* Progress card */}
                <Card sx={{ mt: 4, bgcolor: theme.palette.background.paper, borderRadius: theme.shape.borderRadius }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>Jumpserver development</Typography>
                        <Typography variant="body2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
                            Second opening of Jumpserver to add functionality
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ flexGrow: 1 }}>
                                {/* LinearProgress sẽ tự động dùng màu primary của theme */}
                                <LinearProgress variant="determinate" value={75} color="primary" />
                            </Box>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                                50 / 106
                            </Typography>
                        </Box>

                        {/* Avatar group */}
                        <Box sx={{ mt: 2 }}>
                            <AvatarGroup max={4}>
                                {/* Sử dụng placeholder images để đảm bảo hiển thị */}
                                <Avatar alt="Alice" src="https://placehold.co/40x40/FF5733/FFFFFF?text=A" />
                                <Avatar alt="Bob" src="https://placehold.co/40x40/33FF57/FFFFFF?text=B" />
                                <Avatar alt="Carol" src="https://placehold.co/40x40/3357FF/FFFFFF?text=C" />
                                <Avatar alt="Dan" src="https://placehold.co/40x40/FF33E9/FFFFFF?text=D" />
                            </AvatarGroup>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default Dashboard;
