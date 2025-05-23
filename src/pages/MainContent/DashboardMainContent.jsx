// src/components/DashboardMainContent.jsx
import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    LinearProgress,
    Avatar,
    AvatarGroup,
    useTheme,
    List,
    ListItem,
    ListItemText,
    Toolbar
} from '@mui/material';

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

const DashboardMainContent = () => {
    const theme = useTheme(); // Lấy theme hiện tại

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: theme.palette.background.default }}>
            {/* Toolbar placeholder for spacing below AppBar */}
            {/* Lưu ý: Nếu AppBar nằm ở layout cha, bạn có thể cần một Toolbar ở đây để tạo khoảng trống */}
            {/* Nếu AppBar của Dashboard được giữ lại trong Dashboard.jsx, thì Toolbar này sẽ hoạt động */}
            <Toolbar />

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
                                bgcolor: theme.palette[stat.color].main,
                                color: theme.palette[stat.color].contrastText,
                                borderRadius: theme.shape.borderRadius,
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
                            <LinearProgress variant="determinate" value={75} color="primary" />
                        </Box>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            50 / 106
                        </Typography>
                    </Box>

                    {/* Avatar group */}
                    <Box sx={{ mt: 2 }}>
                        <AvatarGroup max={4}>
                            <Avatar alt="Alice" src="https://placehold.co/40x40/FF5733/FFFFFF?text=A" />
                            <Avatar alt="Bob" src="https://placehold.co/40x40/33FF57/FFFFFF?text=B" />
                            <Avatar alt="Carol" src="https://placehold.co/40x40/3357FF/FFFFFF?text=C" />
                            <Avatar alt="Dan" src="https://placehold.co/40x40/FF33E9/FFFFFF?text=D" />
                        </AvatarGroup>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default DashboardMainContent;