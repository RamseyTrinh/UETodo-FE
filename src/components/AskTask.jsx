import React from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
} from '@mui/material'

const AskTask = ({ open, onClose, selectedDate, onCreate }) => {
    const [task, setTask] = React.useState({
        name: '',
        description: '',
        priority: 'High',
        dueDate: selectedDate,
    })

    const handleSubmit = () => {
        console.log('task', task);
        onCreate(task)
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Title"
                    type="text"
                    value={task.name}
                    fullWidth
                    onChange={(e) =>
                        setTask({ ...task, name: e.target.value })
                    }
                />
                <TextField
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                    value={task.description}
                    multiline
                    rows={3}
                    onChange={(e) =>
                        setTask({ ...task, description: e.target.value })
                    }
                />
                <TextField
                    margin="dense"
                    label="Priority"
                    select
                    fullWidth
                    value={task.priority}
                    onChange={(e) =>
                        setTask({ ...task, priority: e.target.value })
                    }
                >
                    {['High', 'Medium', 'Low'].map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    margin="dense"
                    label="Due Date"
                    type="date"
                    fullWidth
                    value={task.dueDate}
                    onChange={(e) => {
                        const selectedDate = new Date(e.target.value)
                        const today = new Date()
                        const isValidDate = selectedDate >= today
                        
                        if (!isValidDate) {
                            alert('Please select a valid date')
                            return       
                        }
                        console.log('ac', e)
                        
                        setTask({ ...task, dueDate: e.target.value || null })
                    }}
                        
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => onClose()}>Cancel</Button>
                <Button onClick={handleSubmit}>Add Task</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AskTask
