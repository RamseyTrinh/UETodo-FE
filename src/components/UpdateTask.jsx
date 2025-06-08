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
    useTheme,
} from '@mui/material'

const UpdateTask = ({ editTask, open, onClose, onUpdate }) => {
    const theme = useTheme()
    const priorityColors = {
        High: 'error.main',
        Medium: 'warning.main',
        Low: 'info.main',
    }

    const [error, setError] = useState(null)
    const [task, setTask] = useState({
        id: editTask?.id || null,
        name: editTask?.name || '',
        description: editTask?.description || '',
        priority: editTask?.priority || 'Low',
        start_date: editTask?.start_date || new Date().toISOString().split('T')[0],
        due_date: editTask?.due_date || null,
        user_id: editTask?.user_id || null,
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
    }, [])

    const handleChange = (field) => (e) => {
        setTask((prev) => ({
            ...prev,
            [field]: e.target.value,
        }))
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

    const handleSubmit = () => {
        if (!task.name.trim() || !task.description.trim()) {
            setError('Name and description are required')
            return
        }
        if (!task.start_date) {
            setError('Start date is required')
            return
        }
        if (!task.due_date) {
            setError('Due date is required')
            return
        }
        if (!task.user_id) {
            setError('User ID is missing')
            return
        }

        onUpdate(task)
        onClose()
    }

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: theme.palette.primary.main }}>
                    Update Task
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={task.name}
                        onChange={handleChange('name')}
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
                        value={task.start_date}
                        onChange={handleChange('start_date')}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        margin="dense"
                        label="Due Date"
                        type="date"
                        fullWidth
                        value={task.due_date}
                        onChange={handleDueDateChange}
                        InputLabelProps={{ shrink: true }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="error" variant="outlined">Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Update Task</Button>
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

export default UpdateTask
