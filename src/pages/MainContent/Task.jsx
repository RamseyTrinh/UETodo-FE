import React, { useState } from 'react'
import {
    Box,
    Typography,
    List,
    ListItem,
    Toolbar,
    useTheme,
    IconButton,
    Avatar,
    Button,
    Card,
    CardContent,
    Collapse,
    Alert,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import AskTask from '@/components/AskTask'
import { createTask, getTasks } from '@/services/task'

const initialTasks = [
    {
        id: 1,
        name: 'Hai dòn',
        list: 'Default',
        priority: 'Ảo ma',
        owner: 'guest',
        dueTime: '-1d,03h',
        status: false,
    },
    {
        id: 2,
        name: 'abe',
        list: 'Default',
        priority: 'Medium',
        owner: 'guest',
        dueTime: 'Today',
        status: false,
    },
    {
        id: 3,
        name: 'abc',
        list: 'Default',
        priority: 'Low',
        owner: 'guest',
        dueTime: 'Yesterday',
        status: false,
    },
]

const Task = () => {
    const theme = useTheme()
    const [expandedTasks, setExpandedTasks] = useState(true)
    const [expandedUnfinished, setExpandedUnfinished] = useState(true)
    const [expandedCompleted, setExpandedCompleted] = useState(true)
    const [showDialog, setShowDialog] = useState(false)
    const [tasks, setTasks] = useState([])
    const [alert, setAlert] = useState({})
    const [tasksData, setTasksData] = useState(initialTasks)

    const handleCreateTask = async (newTask) => {
        try {
            const response = await createTask(newTask)
            if (response.status === 201) {
                setAlert({
                    mssg: 'Task created successfully!',
                    type: 'success',
                })
                setShowDialog(false)
                handleListTask()
            }
        } catch (error) {
            console.error('Error creating task:', error)
        }
    }

    const handleListTask = async () => {
        try {
            const response = await getTasks()
            setTasks(response)
        } catch (error) {
            console.error('Error fetching tasks:', error)
        }
    }

    const handleOpenDialog = () => {
        setShowDialog(true)
    }
    const handleCloseDialog = () => {
        setShowDialog(false)
    }

    const toggleTaskCompletion = (id) => {
        setTasksData((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, status: !task.status } : task
            )
        )
    }

    const unfinishedTasks = tasksData.filter((task) => !task.status)
    const completedTasks = tasksData.filter((task) => task.status)

    return (
        <Box
            sx={{
                bgcolor: theme.palette.background.default,
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: theme.palette.background.default,
                    width: '100%',
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                        px: 3,
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            color: theme.palette.text.primary,
                            fontWeight: 'bold',
                        }}
                    >
                        Personal Project
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Button
                            variant="outlined"
                            sx={{
                                textTransform: 'none',
                                color: theme.palette.text.primary,
                                borderColor: theme.palette.divider,
                                '&:hover': {
                                    borderColor: theme.palette.primary.main,
                                },
                            }}
                        >
                            All ({tasksData.length})
                        </Button>
                        <IconButton
                            sx={{ color: theme.palette.text.secondary }}
                        >
                            <SearchIcon />
                        </IconButton>
                        <IconButton
                            sx={{ color: theme.palette.text.secondary }}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <IconButton
                            sx={{ color: theme.palette.text.secondary }}
                            onClick={handleOpenDialog}
                        >
                            <AddIcon />
                        </IconButton>
                        <IconButton
                            sx={{ color: theme.palette.text.secondary }}
                        >
                            <FormatListBulletedIcon />
                        </IconButton>
                    </Box>
                </Toolbar>

                <Card
                    sx={{
                        bgcolor: theme.palette.background.paper,
                        borderRadius: 2,
                        boxShadow: theme.shadows[1],
                    }}
                >
                    <CardContent sx={{ p: 0 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                px: 2,
                                py: 1.5,
                                borderBottom: `1px solid ${theme.palette.divider}`,
                                bgcolor: theme.palette.action.hover, // Slightly different background for header
                                color: theme.palette.text.secondary,
                                fontWeight: 'bold',
                                fontSize: '0.875rem',
                            }}
                        >
                            <Box sx={{ width: '40%' }}># Task name</Box>
                            <Box sx={{ width: '20%' }}>List</Box>
                            <Box sx={{ width: '15%' }}>Priority</Box>
                            <Box sx={{ width: '15%' }}>Owner</Box>
                            <Box sx={{ width: '10%' }}>Due time</Box>
                        </Box>

                        {/* My tasks section */}
                        <Box
                            sx={{
                                p: 2,
                                borderBottom: `1px solid ${theme.palette.divider}`,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1,
                                    cursor: 'pointer',
                                }}
                                onClick={() => setExpandedTasks(!expandedTasks)}
                            >
                                {expandedTasks ? (
                                    <ExpandMoreIcon
                                        sx={{
                                            color: theme.palette.text.secondary,
                                        }}
                                    />
                                ) : (
                                    <ChevronRightIcon
                                        sx={{
                                            color: theme.palette.text.secondary,
                                        }}
                                    />
                                )}
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        color: theme.palette.text.primary,
                                        fontWeight: 'bold',
                                        ml: 1,
                                    }}
                                >
                                    My tasks ({unfinishedTasks.length})
                                </Typography>
                            </Box>
                            <Collapse in={expandedTasks}>
                                <List disablePadding>
                                    {unfinishedTasks.map((task) => (
                                        <ListItem
                                            key={task.id}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                py: 1,
                                                borderBottom: `1px solid ${theme.palette.divider}`,
                                                '&:last-child': {
                                                    borderBottom: 'none',
                                                },
                                                color: theme.palette.text
                                                    .primary,
                                            }}
                                        >
                                            <IconButton
                                                onClick={() =>
                                                    toggleTaskCompletion(
                                                        task.id
                                                    )
                                                }
                                                sx={{
                                                    mr: 1,
                                                    color: theme.palette.text
                                                        .secondary,
                                                }}
                                            >
                                                {task.status ? (
                                                    <CheckBoxIcon />
                                                ) : (
                                                    <CheckBoxOutlineBlankIcon />
                                                )}
                                            </IconButton>
                                            <Box sx={{ width: '40%' }}>
                                                {task.name}
                                            </Box>
                                            <Box sx={{ width: '20%' }}>
                                                {task.list}
                                            </Box>
                                            <Box sx={{ width: '15%' }}>
                                                <Button
                                                    size="small"
                                                    sx={{
                                                        bgcolor:
                                                            task.priority ===
                                                            'Urgent'
                                                                ? theme.palette
                                                                      .error
                                                                      .light
                                                                : task.priority ===
                                                                    'Medium'
                                                                  ? theme
                                                                        .palette
                                                                        .warning
                                                                        .light
                                                                  : theme
                                                                        .palette
                                                                        .info
                                                                        .light,
                                                        color:
                                                            task.priority ===
                                                            'Urgent'
                                                                ? theme.palette
                                                                      .error
                                                                      .contrastText
                                                                : task.priority ===
                                                                    'Medium'
                                                                  ? theme
                                                                        .palette
                                                                        .warning
                                                                        .contrastText
                                                                  : theme
                                                                        .palette
                                                                        .info
                                                                        .contrastText,
                                                        textTransform: 'none',
                                                        borderRadius: 1,
                                                        px: 1,
                                                        py: 0.5,
                                                        fontSize: '0.75rem',
                                                    }}
                                                >
                                                    {task.priority === 'Urgent'
                                                        ? 'Default'
                                                        : task.priority}{' '}
                                                </Button>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: '15%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Avatar
                                                    sx={{
                                                        bgcolor:
                                                            theme.palette
                                                                .secondary.main,
                                                        width: 24,
                                                        height: 24,
                                                        fontSize: '0.75rem',
                                                        mr: 0.5,
                                                    }}
                                                >
                                                    HO
                                                </Avatar>
                                                <Typography variant="body2">
                                                    {task.owner}
                                                </Typography>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: '10%',
                                                    color: task.dueTime.includes(
                                                        '-'
                                                    )
                                                        ? theme.palette.error
                                                              .main
                                                        : theme.palette.text
                                                              .primary,
                                                }}
                                            >
                                                {task.dueTime}
                                            </Box>
                                        </ListItem>
                                    ))}
                                    <ListItem sx={{ py: 1, pl: 0 }}>
                                        <Button
                                            startIcon={<AddIcon />}
                                            sx={{
                                                color: theme.palette.primary
                                                    .main,
                                                textTransform: 'none',
                                            }}
                                            onClick={handleOpenDialog}
                                        >
                                            Add task
                                        </Button>
                                    </ListItem>
                                </List>
                            </Collapse>
                        </Box>

                        {/* Unfinished tasks section */}
                        <Box
                            sx={{
                                p: 2,
                                borderBottom: `1px solid ${theme.palette.divider}`,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={() =>
                                    setExpandedUnfinished(!expandedUnfinished)
                                }
                            >
                                {expandedUnfinished ? (
                                    <ExpandMoreIcon
                                        sx={{
                                            color: theme.palette.text.secondary,
                                        }}
                                    />
                                ) : (
                                    <ChevronRightIcon
                                        sx={{
                                            color: theme.palette.text.secondary,
                                        }}
                                    />
                                )}
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        color: theme.palette.text.primary,
                                        fontWeight: 'bold',
                                        ml: 1,
                                    }}
                                >
                                    Unfinished tasks ({unfinishedTasks.length})
                                </Typography>
                            </Box>
                            <Collapse in={expandedUnfinished}>
                                {/* You can render unfinished tasks here, similar to "My tasks" */}
                                {unfinishedTasks.length === 0 && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            ml: 4,
                                            mt: 1,
                                        }}
                                    >
                                        No unfinished tasks.
                                    </Typography>
                                )}
                            </Collapse>
                        </Box>

                        <Box sx={{ p: 2 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={() =>
                                    setExpandedCompleted(!expandedCompleted)
                                }
                            >
                                {expandedCompleted ? (
                                    <ExpandMoreIcon
                                        sx={{
                                            color: theme.palette.text.secondary,
                                        }}
                                    />
                                ) : (
                                    <ChevronRightIcon
                                        sx={{
                                            color: theme.palette.text.secondary,
                                        }}
                                    />
                                )}
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        color: theme.palette.text.primary,
                                        fontWeight: 'bold',
                                        ml: 1,
                                    }}
                                >
                                    Completed tasks ({completedTasks.length})
                                </Typography>
                            </Box>
                            <Collapse in={expandedCompleted}>
                                <List disablePadding>
                                    {completedTasks.map((task) => (
                                        <ListItem
                                            key={task.id}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                py: 1,
                                                borderBottom: `1px solid ${theme.palette.divider}`,
                                                '&:last-child': {
                                                    borderBottom: 'none',
                                                },
                                                color: theme.palette.text
                                                    .secondary, // Completed tasks might be greyed out
                                                textDecoration: 'line-through', // Strikethrough for completed tasks
                                            }}
                                        >
                                            <IconButton
                                                onClick={() =>
                                                    toggleTaskCompletion(
                                                        task.id
                                                    )
                                                }
                                                sx={{
                                                    mr: 1,
                                                    color: theme.palette.text
                                                        .secondary,
                                                }}
                                            >
                                                {task.status ? (
                                                    <CheckBoxIcon />
                                                ) : (
                                                    <CheckBoxOutlineBlankIcon />
                                                )}
                                            </IconButton>
                                            <Box sx={{ width: '40%' }}>
                                                {task.name}
                                            </Box>
                                            <Box sx={{ width: '20%' }}>
                                                {task.list}
                                            </Box>
                                            <Box sx={{ width: '15%' }}>
                                                <Button
                                                    size="small"
                                                    sx={{
                                                        bgcolor:
                                                            theme.palette
                                                                .grey[300],
                                                        color: theme.palette
                                                            .grey[700],
                                                        textTransform: 'none',
                                                        borderRadius: 1,
                                                        px: 1,
                                                        py: 0.5,
                                                        fontSize: '0.75rem',
                                                    }}
                                                >
                                                    {task.priority}
                                                </Button>
                                            </Box>
                                            <Box
                                                sx={{
                                                    width: '15%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Avatar
                                                    sx={{
                                                        bgcolor:
                                                            theme.palette
                                                                .grey[400],
                                                        width: 24,
                                                        height: 24,
                                                        fontSize: '0.75rem',
                                                        mr: 0.5,
                                                    }}
                                                >
                                                    HO
                                                </Avatar>
                                                <Typography variant="body2">
                                                    {task.owner}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ width: '10%' }}>
                                                {task.dueTime}
                                            </Box>
                                        </ListItem>
                                    ))}
                                    {completedTasks.length === 0 && (
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: theme.palette.text
                                                    .secondary,
                                                ml: 4,
                                                mt: 1,
                                            }}
                                        >
                                            No completed tasks.
                                        </Typography>
                                    )}
                                </List>
                            </Collapse>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <AskTask
                open={showDialog}
                onClose={handleCloseDialog}
                onCreate={handleCreateTask}
            />
        </Box>
    )
}

export default Task
