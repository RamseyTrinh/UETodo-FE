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
import AskTask from '@/components/AskTask'
import TaskRow from '@/components/TaskRow'
import { createTask, getTasksByUserId, updateTask, deleteTask } from '@/services/task'

const Task = () => {
    const theme = useTheme()
    const [expandedTasks, setExpandedTasks] = useState(true)
    const [expandedUnfinished, setExpandedUnfinished] = useState(true)
    const [expandedCompleted, setExpandedCompleted] = useState(true)
    const [showDialog, setShowDialog] = useState(false)
    const [editTask, setEditTask] = useState(null)
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

    const handleUpdateTask = async (task) => {
        try {
            const isEdit = Boolean(task.id)
            const response = await updateTask(task.id, task)
            if (response?.success) {
                setAlert({ mssg: `Task updated successfully!`, type: 'success' })
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
            const userInfo = JSON.parse(localStorage.getItem('INFO'))
            const userId = userInfo?.user?.id
            const response = await getTasksByUserId(userId, 1, 10)
            setTasks(response?.data || [])
        } catch (error) {
            console.error('Error fetching tasks:', error)
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

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id)
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
            setAlert({ mssg: 'Task deleted successfully!', type: 'success' })
        } catch (error) {
            console.error('Error deleting task:', error)
        }
    }

    useEffect(() => {
        handleListTask()
    }, [])

    const unfinishedTasks = tasks.filter((task) => task.status === false)
    const completedTasks = tasks.filter((task) => task.status === true)

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, px: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Personal Project</Typography>
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
                            <Box sx={{ flexBasis: '20%' }}># Task name</Box>
                            <Box sx={{ flexBasis: '30%' }}>Description</Box>
                            <Box sx={{ flexBasis: '15%' }}>Priority</Box>
                            <Box sx={{ flexBasis: '15%' }}>Create at</Box>
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
                                            onEdit={handleUpdateTask}
                                            onDelete={() => handleDeleteTask(task.id)}
                                        />
                                    ))}
                                    <ListItem sx={{ py: 1, pl: 0 }}>
                                        <Button startIcon={<AddIcon />} onClick={() => setShowDialog(true)}>Add task</Button>
                                    </ListItem>
                                </List>
                            </Collapse>
                        </Box>

                        {/* <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => setExpandedUnfinished(!expandedUnfinished)}>
                                {expandedUnfinished ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', ml: 1 }}>
                                    Unfinished tasks ({unfinishedTasks.length})
                                </Typography>
                            </Box>
                            <Collapse in={expandedUnfinished}>
                                {unfinishedTasks.length === 0 && (
                                    <Typography sx={{ ml: 4, mt: 1 }}>No unfinished tasks.</Typography>
                                )}
                            </Collapse>
                        </Box> */}

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

            <AskTask open={showDialog} onClose={() => { setShowDialog(false) }} onCreate={handleCreateTask} />
        </Box>
    )
}

export default Task
