import React, { useState, useEffect } from 'react'
import {
    Box,
    Typography,
    List,
    ListItem,
    Toolbar,
    useTheme,
    IconButton,
    Button,
    Card,
    CardContent,
    Collapse,
    Alert,
    Snackbar,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import AddTask from '@/components/AddTask'
import TaskRow from '@/components/TaskRow'
import { createTask, getTasksByUserId, updateTask } from '@/services/task'
import { useDispatch } from 'react-redux'
import { getCurrentUserAction } from '@/stores/authAction.js'


const Task = () => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const [user, setUser] = useState({})
    const [expandedTasks, setExpandedTasks] = useState(true)
    const [expandedCompleted, setExpandedCompleted] = useState(true)
    const [showDialog, setShowDialog] = useState(false)
    const [tasks, setTasks] = useState([])
    const [alert, setAlert] = useState({})

    const handleCreateTask = async (task) => {
        try {
            const response = await createTask(task)
            if (response?.success) {
                setAlert({ mssg: `Task created successfully!`, type: 'success' })
                setShowDialog(false)
                handleListTask()
            }
        } catch (error) {
            setAlert({ mssg: 'Failed to process task.', type: 'error' })
            console.error('Error saving task:', error)
        }
    }

    const handleListTask = async () => {
        try {
            const userId = user.id
            const response = await getTasksByUserId(userId, 1, 1000)
            console.log('Fetched tasks:', response)
            setTasks(response?.data || [])
        } catch (error) {
            console.error('Error fetching tasks:', error)
        }
    }

    const handleGetCurrentUser = async () => {
        try {
            const userInfo = await dispatch(getCurrentUserAction())
            setUser(userInfo?.payload?.user || {})
        } catch (error) {
            console.error('Error fetching current user:', error)
        }
    }

    const toggleTaskCompletion = async (id) => {
        const updatedTask = tasks.find((task) => task.id === id)
        const newStatus = !updatedTask.status
        try {
            await updateTask(id, { status: newStatus })
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === id ? { ...task, status: newStatus } : task
                )
            )
        } catch (error) {
            console.error('Failed to update task status:', error)
        }
    }

    React.useEffect(() => {
        handleGetCurrentUser()
    }, [])

    React.useEffect(() => {
        if (user?.id) {
            handleListTask()
        }
    }, [user?.id])

    const unfinishedTasks = tasks.filter((task) => task.status === false)
    const completedTasks = tasks.filter((task) => task.status === true)

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, px: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        {user?.name}'s tasks
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Button variant="outlined">All ({tasks.length})</Button>
                        <IconButton><SearchIcon /></IconButton>
                        <IconButton><MoreVertIcon /></IconButton>
                        <IconButton onClick={() => setShowDialog(true)}><AddIcon /></IconButton>
                        <IconButton><FormatListBulletedIcon /></IconButton>
                    </Box>
                </Toolbar>

                <Card sx={{ borderRadius: 2, boxShadow: theme.shadows[1] }}>
                    <CardContent sx={{ p: 0 }}>
                        <Box sx={{ display: 'flex', px: 2, py: 1.5, borderBottom: `1px solid ${theme.palette.divider}`, bgcolor: theme.palette.action.hover, fontWeight: 'bold' }}>
                            <Box sx={{ flexBasis: '20%' }}>Task name</Box>
                            <Box sx={{ flexBasis: '30%' }}>Description</Box>
                            <Box sx={{ flexBasis: '15%' }}>Priority</Box>
                            <Box sx={{ flexBasis: '15%' }}>Start date</Box>
                            <Box sx={{ flexBasis: '10%' }}>Due date</Box>
                            <Box sx={{ flexBasis: '10%' }}>Actions</Box>
                        </Box>

                        <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, cursor: 'pointer' }} onClick={() => setExpandedTasks(!expandedTasks)}>
                                {expandedTasks ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', ml: 1 }}>
                                    Unfinished tasks ({unfinishedTasks.length})
                                </Typography>
                            </Box>
                            <Collapse in={expandedTasks}>
                                <List disablePadding>
                                    {unfinishedTasks.map((task) => (
                                        <TaskRow
                                            key={task.id}
                                            task={task}
                                            onToggleStatus={toggleTaskCompletion}
                                            onRefresh={handleListTask}
                                        />
                                    ))}
                                    <ListItem sx={{ py: 1, pl: 0 }}>
                                        <Button startIcon={<AddIcon />} onClick={() => setShowDialog(true)}>Add task</Button>
                                    </ListItem>
                                </List>
                            </Collapse>
                        </Box>

                        <Box sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setExpandedCompleted(!expandedCompleted)}>
                                {expandedCompleted ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', ml: 1 }}>
                                    Completed tasks ({completedTasks.length})
                                </Typography>
                            </Box>
                            <Collapse in={expandedCompleted}>
                                <List disablePadding>
                                    {completedTasks.map((task) => (
                                        <TaskRow
                                            key={task.id}
                                            task={task}
                                            onToggleStatus={toggleTaskCompletion}
                                            completed
                                        />
                                    ))}
                                    {completedTasks.length === 0 && (
                                        <Typography sx={{ ml: 4, mt: 1 }}>No completed tasks.</Typography>
                                    )}
                                </List>
                            </Collapse>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            <Snackbar open={Boolean(alert?.mssg)} autoHideDuration={3000} onClose={() => setAlert({})} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={() => setAlert({})} severity={alert.type || 'info'} sx={{ width: '100%' }} variant="filled">
                    {alert.mssg}
                </Alert>
            </Snackbar>

            <AddTask open={showDialog} onClose={() => { setShowDialog(false) }} onCreate={handleCreateTask} selectedDate={null}/>
        </Box>
    )
}

export default Task
