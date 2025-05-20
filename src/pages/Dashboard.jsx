import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Avatar,
  AvatarGroup,
  useTheme,
} from '@mui/material';

const drawerWidth = 240;

const stats = [
  { label: 'Due today', value: 3, color: 'primary' },
  { label: 'Overdue task', value: 4, color: 'error' },
  { label: 'Task to be completed', value: 32, color: 'success' },
];

const tasks = [
  'Follow up the B&B agency path',
  'Consult the interior design of homestay class',
  'Evaluate the input cost to complete the smart homestay solution',
];

const Dashboard = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', bgcolor: theme.palette.background.default, height: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: '#121212',
            color: 'white',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Dashboard', 'Calendar', 'Message', 'File'].map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Welcome back, Doo
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Here are your current task statistics
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ bgcolor: `${stat.color}.main`, color: '#fff' }}>
                <CardContent>
                  <Typography variant="h6">{stat.label}</Typography>
                  <Typography variant="h4">{stat.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Task List */}
        <Typography variant="h6" gutterBottom>
          Task to be completed
        </Typography>
        <List>
          {tasks.map((task, index) => (
            <ListItem key={index} sx={{ pl: 0 }}>
              <ListItemText primary={task} />
            </ListItem>
          ))}
        </List>

        {/* Progress card */}
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h6">Jumpserver development</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Second opening of Jumpserver to add functionality
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <LinearProgress variant="determinate" value={75} />
              </Box>
              <Typography variant="body2" color="text.secondary">
                50 / 106
              </Typography>
            </Box>

            {/* Avatar group */}
            <Box sx={{ mt: 2 }}>
              <AvatarGroup max={4}>
                <Avatar alt="Alice" src="/static/images/avatar/1.jpg" />
                <Avatar alt="Bob" src="/static/images/avatar/2.jpg" />
                <Avatar alt="Carol" src="/static/images/avatar/3.jpg" />
                <Avatar alt="Dan" src="/static/images/avatar/4.jpg" />
              </AvatarGroup>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;
