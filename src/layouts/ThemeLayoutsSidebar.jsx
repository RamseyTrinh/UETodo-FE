import React, { useState } from 'react'
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
    CssBaseline,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AssignmentIcon from '@mui/icons-material/Assignment'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'

const drawerWidth = 240

const ThemeLayoutsSideBar = ({}) => {
    const theme = useTheme()
    const navigate = useNavigate()
    const location = useLocation()
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Task', icon: <AssignmentIcon />, path: '/task' },
        { text: 'Calendar', icon: <CalendarTodayIcon />, path: '/calendar' },
    ]

    const drawer = (
        <div
            style={{
                backgroundColor: theme.palette.background.paper,
                height: '100%',
                color: theme.palette.text.primary,
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ fontWeight: 'bold' }}
                >
                    UETodo App
                </Typography>
            </Toolbar>
            <List>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.text}
                        onClick={() => {
                            navigate(item.path)
                            setMobileOpen(false)
                        }}
                        selected={location.pathname === item.path}
                        sx={{
                            '&.Mui-selected': {
                                backgroundColor: theme.palette.action.selected,
                                color: theme.palette.primary.main,
                                '& .MuiListItemIcon-root': {
                                    color: theme.palette.primary.main,
                                },
                                '&:hover': {
                                    backgroundColor: theme.palette.action.hover,
                                },
                            },
                            '&:hover': {
                                backgroundColor: theme.palette.action.hover,
                            },
                        }}
                    >
                        <ListItemIcon
                            sx={{ color: theme.palette.text.secondary }}
                        >
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
            </List>
        </div>
    )

    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: theme.palette.background.default,
            }}
        >
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary,
                    boxShadow: theme.shadows[1],
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant="h6" noWrap component="div">
                                abc123
                            </Typography>
                        </Box>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {menuItems.find((item) =>
                            location.pathname.startsWith(item.path)
                        )?.text || 'UETodoApp'}{' '}
                        {/* Sửa lại logic để khớp path */}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: 8,
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                }}
            >
                <Outlet />
            </Box>
        </Box>
    )
}

export default ThemeLayoutsSideBar
