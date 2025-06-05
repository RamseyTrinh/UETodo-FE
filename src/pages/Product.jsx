import React from 'react'
import {
  Box,
  Button,
  Typography,
  Divider,
  Grid,
  Card,
  CardMedia,
  CardContent,
  useTheme,
} from '@mui/material'
import { Home } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Product = () => {
  const theme = useTheme()
  const navigate = useNavigate()

  return (
    <Box sx={{ minHeight: '100vh', px: 3 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          variant="text"
          startIcon={<Home />}
          onClick={() => navigate('/')}
          sx={{
            color: theme.palette.primary.dark,
            fontSize: '1.2rem',
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'transparent',
              textDecoration: 'underline',
            },
          }}
        >
          UETodo
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate('/login')}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          Get Started
        </Button>
      </Box>

      <Divider sx={{ mb: 4, borderColor: theme.palette.primary.light }} />

      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" fontWeight="bold" textAlign="center" mb={2}>
          Explore UETodoApp
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center" mb={6} maxWidth={800} mx="auto">
          UETodoApp is your intelligent task manager. Designed with a modern UI and real productivity needs in mind, it helps you organize, plan, and get more done every day.
        </Typography>
      </motion.div>

      {/* Section: Dashboard */}
      <Grid container spacing={6} alignItems="center" mb={6}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
              <CardMedia
                component="img"
                image="/src/assets/dashboard.jpg"
                alt="Dashboard Screenshot"
                sx={{ height: 310, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="subtitle1" textAlign="center" color="text.secondary">
                  Dashboard overview with all task statistics and charts
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Smart Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Visualize all your tasks with status-based breakdowns. The dashboard summarizes completed tasks, tasks in progress, and upcoming ones using dynamic charts—giving you insight into your productivity at a glance.
            </Typography>
          </motion.div>
        </Grid>
      </Grid>

      {/* Section: Task View */}
      <Grid container spacing={6} alignItems="center" mb={6}>
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Intuitive Task View
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Easily create, edit, and view tasks in a beautifully designed interface. With a clean layout, clear labels, and interactive elements, you’ll never miss a deadline or forget a task.
            </Typography>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
              <CardMedia
                component="img"
                image="/src/assets/taskview.jpg"
                alt="Task View Screenshot"
                sx={{ height: 310, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="subtitle1" textAlign="center" color="text.secondary">
                  Detailed task view with edit, delete, and priority features
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Section: Calendar */}
      <Grid container spacing={6} alignItems="center" mb={8}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card sx={{ borderRadius: 4, boxShadow: 6 }}>
              <CardMedia
                component="img"
                image="/src/assets/calendar.jpg"
                alt="Calendar View Screenshot"
                sx={{ height: 300, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="subtitle1" textAlign="center" color="text.secondary">
                  Calendar integration with drag-and-drop task scheduling
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Calendar Integration
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Plan your schedule with a powerful calendar view. Drag and drop tasks into different days, view deadlines clearly, and stay in control of your time.
            </Typography>
          </motion.div>
        </Grid>
      </Grid>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Box textAlign="center">
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Ready to boost your productivity?
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Get started with UETodoApp and achieve more every day.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
            sx={{ textTransform: 'none', px: 5, py: 1.5, mb:3 }}
          >
            Get Started Now
          </Button>
        </Box>
      </motion.div>
    </Box>
  )
}

export default Product
