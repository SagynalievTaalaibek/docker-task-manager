import { Route, Routes } from 'react-router-dom';
import { Box, Container, CssBaseline } from '@mui/material';
import NotFound from './components/NotFound';
import AppToolbar from './components/AppToolbar/AppToolbar';
import Login from './features/users/Login';
import Register from './features/users/Register';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/userSlice';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import Tasks from './features/tasks/Tasks.tsx';
import EditTask from './features/tasks/EditTask.tsx';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <CssBaseline />
      <AppToolbar />
      <Box component="main">
        <Container maxWidth="xl">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute isAllowed={!!user}>
                  <Tasks />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/task/edit/:id"
              element={
                <ProtectedRoute isAllowed={!!user}>
                  <EditTask />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Box>
    </>
  );
};

export default App;
