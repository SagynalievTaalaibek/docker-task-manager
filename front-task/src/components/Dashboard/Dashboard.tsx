import React, { useEffect } from 'react';
import { Link as NavLink, useNavigate } from 'react-router-dom';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, Container, Grid2, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { logout } from '../../features/users/userThunks.ts';
import { selectUser } from '../../features/users/userSlice.ts';
import { mainRoutes } from '../../constants.ts';
import AdjustIcon from '@mui/icons-material/Adjust';
import { openTask } from '../../features/tasks/tasksSlice.ts';
import NewTaskDialog from '../../features/tasks/components/NewTaskDialog.tsx';
import { CategoryMutation, TaskMutation } from '../../types';
import { createTask, fetchTasks } from '../../features/tasks/tasksThunks.ts';
import DateCalendarValue from '../DateCalendarValue.tsx';
import {
  openCategory,
  selectCategory,
} from '../../features/category/categorySlice.ts';
import CategoryDialog from '../../features/category/CategoryDialog.tsx';
import {
  createCategory,
  fetchCategory,
} from '../../features/category/categoryThunks.ts';

const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const Dashboard: React.FC<React.PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const categories = useAppSelector(selectCategory);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  const user = useAppSelector(selectUser);

  const onTaskSubmit = async (task: TaskMutation) => {
    await dispatch(createTask(task));

    dispatch(openTask(false));
    await dispatch(fetchTasks());
  };

  const onCategorySubmit = async (category: CategoryMutation) => {
    await dispatch(createCategory(category));

    dispatch(openTask(false));
    await dispatch(fetchCategory());
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {user ? (
        <>
          <AppBar
            position="fixed"
            open={open}
            sx={{ backgroundColor: theme.palette.background.paper }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  padding: '0 0 0 4px',
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon sx={{ color: 'black', fontSize: '30px' }} />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ color: 'black' }}
              >
                Добро пожаловать! {user?.username}
              </Typography>
              <Button
                sx={{ marginLeft: 4, fontSize: '20px' }}
                variant={'contained'}
                onClick={() => dispatch(openTask(true))}
              >
                New Task
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              {theme.direction !== 'rtl' && (
                <>
                  <Typography
                    variant={'h6'}
                    component={'div'}
                    sx={{
                      fontWeight: 'bold',
                      marginRight: 2,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        color: 'primary',
                      }}
                    >
                      Task Manager
                    </span>
                  </Typography>
                  <IconButton onClick={handleDrawerClose}>
                    <ChevronRightIcon />
                  </IconButton>
                </>
              )}
            </DrawerHeader>
            <Divider />
            <List>
              {mainRoutes.map((item) => (
                <ListItem
                  key={item.id}
                  disablePadding
                  sx={{ display: 'block' }}
                >
                  <Tooltip title={item.tooltip} placement={'right'}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                      component={NavLink}
                      to={`${item.url}`}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        {React.createElement(item.icon)}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
            <Divider />
            {categories.map((item) => (
              <ListItem key={item._id} disablePadding sx={{ display: 'block' }}>
                <Tooltip title={item.name} placement={'right'}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    component={NavLink}
                    to={'category/' + item.name.toLowerCase()}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <AdjustIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name.toLowerCase()}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ))}
            <List>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <Tooltip title="Add new category" placement={'right'}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={() => dispatch(openCategory(true))}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <AddCircleOutlineIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={'Add new category'}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <Tooltip title="Выйти" placement={'right'}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={() => handleLogout()}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={'Выйти'}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </List>
          </Drawer>
        </>
      ) : (
        ''
      )}
      <Box sx={{ flexGrow: 1, paddingTop: 3, paddingBottom: 3 }}>
        <DrawerHeader />

        <Container maxWidth={'xl'}>
          <Grid2
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid2 size={8}>{children}</Grid2>
            <Grid2 size={4}>
              <DateCalendarValue />
            </Grid2>
          </Grid2>
        </Container>
      </Box>
      <NewTaskDialog onSubmit={onTaskSubmit} />
      <CategoryDialog onSubmit={onCategorySubmit} />
    </Box>
  );
};

export default Dashboard;
