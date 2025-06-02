import React, { useState } from 'react';
import {
    AppBar,
    Avatar,
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    useMediaQuery,
    useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const ThemeLayoutsSideBar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [desktopOpen, setDesktopOpen] = useState(true);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [currentUser, setCurrentUser] = useState({});

    const navigate = useNavigate();
    const location = useLocation();

    const handleDrawerToggle = () => {
        if (isMobile) {
            setMobileOpen(!mobileOpen);
        } else {
            setDesktopOpen(!desktopOpen);
        }
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Task', icon: <AssignmentIcon />, path: '/task' },
        { text: 'Calendar', icon: <CalendarTodayIcon />, path: '/calendar' },
    ];

    const handleGetCurrentUser = async () => {
        try {
            const userInfo = await dispatch(getCurrentUserAction())
            setCurrentUser(userInfo?.payload?.user || {})
        } catch (error) {
            console.error('Error fetching current user:', error)
        }
    }

    React.useEffect(() => {
        handleGetCurrentUser()
    }, [])

    const drawerContent = (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 64,
                    px: 2,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    color: theme.palette.text.primary,
                }}
            >
                Menu
            </Box>

            {/* Danh sách các mục */}
            <List>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.text}
                        onClick={() => {
                            navigate(item.path);
                            if (isMobile) {
                                setMobileOpen(false);
                            }
                        }}
                        selected={
                            location.pathname === item.path ||
                            location.pathname.startsWith(`${item.path}/`)
                        }
                    >
                        <ListItemIcon
                            sx={{
                                color:
                                    location.pathname === item.path ||
                                        location.pathname.startsWith(`${item.path}/`)
                                        ? theme.palette.primary.main
                                        : theme.palette.text.secondary,
                            }}
                        >
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    width: {
                        sm: desktopOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
                    },
                    ml: {
                        sm: desktopOpen ? `${drawerWidth}px` : 0,
                    },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="toggle drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* UETodo App clickable logo/title */}
                    <Box
                        onClick={() => navigate('/')}
                        sx={{
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '1.25rem',
                            color: theme.palette.primary.contrastText,
                            mr: 2
                        }}
                    >
                        UETodo App
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* Avatar and Menu */}
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="User Name" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={anchorElUser}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        sx={{ mt: '45px' }}
                    >
                        <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>Settings</MenuItem>
                        <MenuItem onClick={handleCloseUserMenu}>Logout</MenuItem>
                    </Menu>
                </Toolbar>

            </AppBar>

            {/* Sidebar Drawer */}
            <Box
                component="nav"
                sx={{ width: { sm: desktopOpen ? drawerWidth : 0 }, flexShrink: { sm: 0 } }}
                aria-label="sidebar"
            >
                {/* Mobile Drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            backgroundColor: theme.palette.background.paper,
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>

                {/* Desktop Drawer */}
                <Drawer
                    variant="persistent"
                    open={desktopOpen}
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            backgroundColor: theme.palette.background.paper,
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            </Box>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 8,
                    width: '100%',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default ThemeLayoutsSideBar;
