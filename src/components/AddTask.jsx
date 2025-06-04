import React, { useEffect, useState } from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    Snackbar,
    Alert,
    Box,
    Typography,
    useTheme
} from '@mui/material'

const priorityColors = {
    High: 'error.main',      
    Medium: 'warning.main',  
    Low: 'info.main',       
}

const AddTask = ({ open, onClose, onCreate, selectedDate }) => {
    const theme = useTheme()
    const [error, setError] = useState(null)
    const [task, setTask] = useState({
        name: '',
        description: '',
        priority: 'High',
        start_date: null,
        due_date: null,
        user_id: null,
    })

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('INFO'))
        const userId = parseInt(userInfo?.user?.id)
        if (userId) {
            setTask((prev) => ({
                ...prev,
                user_id: userId,
            }))
        }
        if (selectedDate) {
            setTask((prev) => ({
                ...prev,
                start_date: selectedDate,
            }))
        }
    }, [selectedDate])

    const handleChange = (field) => (e) => {
        setTask((prev) => ({
            ...prev,
            [field]: e.target.value,
        }))
    }

    const handleStartDateChange = (e) => {
        const value = e.target.value

        if (selectedDate) {
            if (new Date(value) !== new Date(selectedDate)) {
                setError('Cannot change start date when a date is selected')
                return
            }
        } else {
            setTask((prev) => ({
                ...prev,
                start_date: value,
            }))
        }

    }

    const handleDueDateChange = (e) => {
        const value = e.target.value
        const selectedDate = new Date(value)
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (selectedDate < today) {
            setError('Please select a valid due date')
            return
        }

        setTask((prev) => ({
            ...prev,
            due_date: value,
        }))
    }

    const handleOnClose = () => {
        setError(null)
        setTask({
            name: '',
            description: '',
            priority: 'High',
            start_date: null,
            due_date: null,
        })
        onClose()
    }

    const handleSubmit = () => {
        if (!task.name.trim() || !task.description.trim()) {
            setError('Name and description are required')
            return
        }
        if (!task.due_date) {
            setError('Due date is required')
            return
        }

        if (new Date(task.start_date) > new Date(task.due_date)) {
            setError('Start date cannot be after due date')
            return
        }

        if (!task.user_id) {
            setError('User ID is missing')
            return
        }
        onCreate(task)
        handleOnClose()
    }

    return (
        <>
            <Dialog open={open} onClose={handleOnClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: theme.palette.primary.main }}>Add New Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={task.name}
                        onChange={handleChange('name')}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={3}
                        value={task.description}
                        onChange={handleChange('description')}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Priority"
                        select
                        fullWidth
                        value={task.priority}
                        onChange={handleChange('priority')}
                        sx={{ mb: 2 }}
                        SelectProps={{
                            renderValue: (selected) => (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography>{selected}</Typography>
                                    <Box
                                        sx={{
                                            width: 16,
                                            height: 16,
                                            bgcolor: priorityColors[selected],
                                            borderRadius: '4px',
                                            ml: 1,
                                        }}
                                    />
                                </Box>
                            ),
                        }}
                    >
                        {['High', 'Medium', 'Low'].map((option) => (
                            <MenuItem
                                key={option}
                                value={option}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    color: (theme) => theme.palette[priorityColors[option].split('.')[0]][priorityColors[option].split('.')[1]],
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 16,
                                        height: 16,
                                        bgcolor: priorityColors[option],
                                        borderRadius: '4px',
                                    }}
                                />
                                <Typography>{option}</Typography>
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        margin="dense"
                        label="Start Date"
                        type="date"
                        fullWidth
                        value={task.start_date || selectedDate || ''}
                        onChange={handleStartDateChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Due Date"
                        type="date"
                        fullWidth
                        value={task.due_date}
                        onChange={handleDueDateChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 1 }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button onClick={handleOnClose} color="error" variant="outlined">Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Add Task</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={Boolean(error)}
                autoHideDuration={3000}
                onClose={() => setError(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={() => setError(null)} severity="error" variant="filled">
                    {error}
                </Alert>
            </Snackbar>
        </>
    )
}

export default AddTask
