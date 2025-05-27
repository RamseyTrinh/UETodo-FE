import React from 'react'
import {
    Typography,
    Box,
    Grid,
    Paper,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { BarChart, LineChart } from '@mui/x-charts'
import { useNavigate } from 'react-router-dom'
import { getCurrentUserAction } from '@/stores/authAction.js'
import { useDispatch } from 'react-redux'


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein }
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
]

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(true)
    const [tasks, setTasks] = React.useState([])
    const [todayTasks, setTodayTasks] = React.useState([])
    const [overdueTasks, setOverdueTasks] = React.useState([])
    const [completedTasks, setCompletedTasks] = React.useState([])
    const [remainingTasks, setRemainingTasks] = React.useState([])

    const getTasks = async () => {
        try {
            const allTask = await fetch('/api/tasks')
            const todayTask = await fetch('/api/tasks/today')
            const overdueTask = await fetch('/api/tasks/overdue')
            const completedTask = await fetch('/api/tasks/completed')
            const remainingTasks = await fetch('/api/tasks/remaining')

            setTasks(allTask)
            setTodayTasks(todayTask)
            setOverdueTasks(overdueTask)
            setCompletedTasks(completedTask)
            setRemainingTasks(remainingTasks)
        } catch (error) {
            console.error('Error fetching tasks:', error)
        }
    }

    const fetchCurrentUser = async () => {
        try {
            const response = await dispatch(getCurrentUserAction())
            console.log('Current User:', response)
            setCurrentUser(response?.payload?.user)
        } catch (error) {
            console.error('Error fetching current user:', error)
        } finally {
            setIsLoading(false)
        }
    }
    React.useEffect(() => {
        fetchCurrentUser()
        getTasks()
    }, [])
    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 3 }}>
                Welcome Back, {currentUser.name || 'Guest'}!
            </Typography>

            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    mb: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <Typography variant="h5" color="text.secondary">
                        Total today Tasks
                    </Typography>
                    <Typography
                        variant="h3"
                        component="p"
                        sx={{ fontWeight: 'bold', mt: 1 }}
                    >
                        {todayTasks.length || 0}
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{ height: 'fit-content' }}
                    onClick={() => {
                        navigate('/task')
                    }}
                >
                    Add Task
                </Button>
            </Paper>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Total Tasks
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            {tasks.length || 15}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Completed Tasks
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            {completedTasks.length || 10}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Tasks Remaining
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            {remainingTasks.length || 5}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Tasks Overdue
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            {overdueTasks.length || 3}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* Bar Chart */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2, height: 350 }}>
                        <Typography variant="h6" gutterBottom>
                            Monthly Task Overview
                        </Typography>
                        <BarChart
                            series={[
                                { data: [3, 4, 1, 6, 5], label: 'Overdue Task' },
                                { data: [4, 3, 2, 8, 9], label: 'Completed Task' },
                            ]}
                            height={280}
                            xAxis={[
                                {
                                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                                    scaleType: 'band',
                                },
                            ]}
                            margin={{
                                top: 10,
                                bottom: 30,
                                left: 40,
                                right: 10,
                            }}
                        />
                    </Paper>
                </Grid>
                {/* Line Chart */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2, height: 350 }}>
                        <Typography variant="h6" gutterBottom>
                            User Activity
                        </Typography>
                        <LineChart
                            series={[
                                { data: [2, 5, 6, 8, 10], label: 'Users' },
                            ]}
                            height={280}
                            xAxis={[{ data: [1, 2, 3, 4, 5], label: 'Day' }]}
                            yAxis={[{ label: 'Count' }]}
                            margin={{
                                top: 10,
                                bottom: 30,
                                left: 40,
                                right: 10,
                            }}
                        />
                    </Paper>
                </Grid>
            </Grid>

            {/* 5. Table Section */}
            <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    Recent Completed Tasks
                </Typography>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Task name</TableCell>
                                <TableCell align="right">Priority</TableCell>
                                <TableCell align="right">
                                    Create date
                                </TableCell>
                                <TableCell align="right">
                                    Completed date
                                </TableCell>
                                <TableCell align="right">
                                    Project
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.calories}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.fat}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.carbs}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.protein}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )
}

export default Dashboard
