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
    Tabs,
    Tab,
    useTheme,
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { BarChart, LineChart } from '@mui/x-charts'
import { useNavigate } from 'react-router-dom'
import {
    getDashboardTasks,
    getBarChartData,
    getLineChartData,
    getOverviewTasks,
} from '@/services/task'
import { useDispatch } from 'react-redux'
import { getCurrentUserAction } from '@/stores/authAction.js'

const Dashboard = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [currentUser, setCurrentUser] = React.useState({})
    const [dashboardTasks, setDashboardTasks] = React.useState([])
    const [barChartData, setBarChartData] = React.useState({
        categories: [],
        overdue: [],
        completed: [],
    })
    const [lineChartData, setLineChartData] = React.useState({
        days: [],
        counts: [],
    })
    const [tabIndex, setTabIndex] = React.useState(0)
    const [upcomingTasks, setUpcomingTasks] = React.useState([])
    const [completedTasks, setCompletedTasks] = React.useState([])

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue)
    }

    const dayLabels = lineChartData.days

    const getTasks = async () => {
        try {
            const userId = currentUser?.id
            const response = await getDashboardTasks(userId)

            setDashboardTasks(response?.data || {})
        } catch (error) {
            console.error('Error fetching tasks:', error)
        }
    }

    const handleGetBarChartData = async () => {
        try {
            const userId = currentUser?.id
            const response = await getBarChartData(userId)
            const data = response?.data || {}
            setBarChartData({
                categories: data.categories,
                overdue: data.overdue,
                completed: data.completed,
            })
        } catch (error) {
            console.error('Error fetching bar chart data:', error)
        }
    }

    const handleGetLineChartData = async () => {
        try {
            const userId = currentUser?.id
            const response = await getLineChartData(userId)
            const data = response?.data || {}
            setLineChartData({
                days: data.days,
                counts: data.counts,
            })
        } catch (error) {
            console.error('Error fetching line chart data:', error)
        }
    }

    const handleGetOverviewTasks = async () => {
        try {
            const userId = currentUser?.id
            const response = await getOverviewTasks(userId)
            const data = response?.data || {}
            setUpcomingTasks(data.upcoming || [])
            setCompletedTasks(data.completed || [])
        } catch (error) {
            console.error('Error fetching overview tasks:', error)
        }
    }

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

    React.useEffect(() => {
        if (currentUser?.id) {
            getTasks()
            handleGetBarChartData()
            handleGetLineChartData()
            handleGetOverviewTasks()
        }
    }, [currentUser?.id])

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Welcome Back, {currentUser?.name || 'Guest'}!
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
                        Total Tasks
                    </Typography>
                    <Typography
                        variant="h3"
                        component="p"
                        sx={{ fontWeight: 'bold', mt: 1 }}
                    >
                        {dashboardTasks?.total_task || 0}
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
                            {dashboardTasks.total_task || 15}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Completed Tasks
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            {dashboardTasks.total_completed_tasks || 0}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Tasks Remaining
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            {dashboardTasks.total_remaining_tasks || 0}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Tasks Overdue
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            {dashboardTasks.total_overdue_tasks || 0}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* Bar Chart */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2, height: 350 }}>
                        <Typography variant="h6" gutterBottom>
                            Priority Task Overview
                        </Typography>
                        <BarChart
                            series={[
                                {
                                    data: barChartData.overdue,
                                    label: 'Overdue Task',
                                },
                                {
                                    data: barChartData.completed,
                                    label: 'Completed Task',
                                },
                            ]}
                            height={280}
                            xAxis={[
                                {
                                    data: barChartData.categories,
                                    scaleType: 'band',
                                },
                            ]}
                            yAxis={[
                                {
                                    label: 'Number of Tasks',
                                    min: 0,
                                    max: 10,
                                    tickCount: 5,
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
                            Tasks Created Over 6 Previous Days
                        </Typography>
                        <LineChart
                            series={[
                                {
                                    data: lineChartData.counts,
                                    label: 'Tasks Created',
                                },
                            ]}
                            height={280}
                            xAxis={[
                                {
                                    data: dayLabels.map((_, i) => i), // [0,1,2,3,4,5,6]
                                    label: 'Day',
                                    labelFormatter: (value) =>
                                        dayLabels[value] || value,
                                    scaleType: 'band',
                                },
                            ]}
                            yAxis={[
                                {
                                    label: 'Number of Tasks',
                                    min: 0,
                                    max: 10,
                                    tickCount: 5,
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
            </Grid>

            {/* 5. Table Section */}
            <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                    Task Overview
                </Typography>

                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    sx={{ mb: 2 }}
                >
                    <Tab label="Upcoming Tasks" />
                    <Tab label="Completed Tasks" />
                </Tabs>

                {tabIndex === 0 && (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Task Name</TableCell>
                                    <TableCell align="left">
                                        Description
                                    </TableCell>
                                    <TableCell align="left">Priority</TableCell>
                                    <TableCell align="left">
                                        Start Date
                                    </TableCell>
                                    <TableCell align="left">Due Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {upcomingTasks.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell>{task.name}</TableCell>
                                        <TableCell align="left">
                                            {task.description}
                                        </TableCell>
                                        <TableCell align="left" sx={{ whiteSpace: 'nowrap' }}>
                                            <Button
                                                size="small"
                                                sx={{
                                                    bgcolor:
                                                        task.priority === 'High'
                                                            ? theme.palette.error.light
                                                            : task.priority === 'Medium'
                                                                ? theme.palette.warning.light
                                                                : theme.palette.info.light,
                                                    color:
                                                        task.priority === 'High'
                                                            ? theme.palette.error.contrastText
                                                            : task.priority === 'Medium'
                                                                ? theme.palette.warning.contrastText
                                                                : theme.palette.info.contrastText,
                                                    textTransform: 'none',
                                                    borderRadius: 1,
                                                    px: 1,
                                                    py: 0.5,
                                                    fontSize: '0.75rem',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {task.priority}
                                            </Button>
                                        </TableCell>
                                        <TableCell align="left">
                                            {task.start_date}
                                        </TableCell>
                                        <TableCell align="left">
                                            {task.due_date}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                {tabIndex === 1 && (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Task Name</TableCell>
                                    <TableCell align="left">
                                        Description
                                    </TableCell>
                                    <TableCell align="left">Priority</TableCell>
                                    <TableCell align="left">
                                        Created Date
                                    </TableCell>
                                    <TableCell align="left">
                                        Completed Date
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {completedTasks.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell>{task.name}</TableCell>
                                        <TableCell align="left">
                                            {task.description}
                                        </TableCell>
                                        <TableCell align="left" sx={{ whiteSpace: 'nowrap' }}>
                                            <Button
                                                size="small"
                                                sx={{
                                                    bgcolor:
                                                        task.priority === 'High'
                                                            ? theme.palette.error.light
                                                            : task.priority === 'Medium'
                                                                ? theme.palette.warning.light
                                                                : theme.palette.info.light,
                                                    color:
                                                        task.priority === 'High'
                                                            ? theme.palette.error.contrastText
                                                            : task.priority === 'Medium'
                                                                ? theme.palette.warning.contrastText
                                                                : theme.palette.info.contrastText,
                                                    textTransform: 'none',
                                                    borderRadius: 1,
                                                    px: 1,
                                                    py: 0.5,
                                                    fontSize: '0.75rem',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {task.priority}
                                            </Button>
                                        </TableCell>
                                        <TableCell align="left">
                                            {task.start_date}
                                        </TableCell>
                                        <TableCell align="left">
                                            {task.completed_date}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>
        </Box>
    )
}

export default Dashboard
