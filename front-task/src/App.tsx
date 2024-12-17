import { Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import NotFound from './components/NotFound';
import Login from './features/users/Login';
import Register from './features/users/Register';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/userSlice';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import TodayTask from './features/tasks/TodayTask.tsx';
import EditTask from './features/tasks/EditTask.tsx';
import BaseLayout from './components/Dashboard/BaseLayout.tsx';
import InboxTask from './features/tasks/InboxTask.tsx';
import NextTask from './features/tasks/NextTask.tsx';
import Completed from './features/tasks/Completed.tsx';

const App = () => {
  const user = useAppSelector(selectUser);

  return (
    <>
      <CssBaseline />
      <BaseLayout>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAllowed={!!user}>
                <TodayTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inbox"
            element={
              <ProtectedRoute isAllowed={!!user}>
                <InboxTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/next-seven"
            element={
              <ProtectedRoute isAllowed={!!user}>
                <NextTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/completed"
            element={
              <ProtectedRoute isAllowed={!!user}>
                <Completed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/date/:date"
            element={<ProtectedRoute isAllowed={!!user}>Date</ProtectedRoute>}
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
      </BaseLayout>
    </>
  );
};

export default App;
