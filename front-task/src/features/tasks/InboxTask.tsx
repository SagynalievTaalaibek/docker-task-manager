import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchByDashboardTasks } from './tasksThunks.ts';
import { selectTasks } from './tasksSlice.ts';
import { Box, Divider } from '@mui/material';
import OneTask from './components/OneTask.tsx';

const InboxTask = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);

  useEffect(() => {
    dispatch(fetchByDashboardTasks('inbox'));
  }, [dispatch]);

  return (
    <Box>
      <Divider />
      {tasks.map((item) => (
        <OneTask
          key={item._id}
          title={item.title}
          dueDate={item.dueDate}
          status={item.status}
          _id={item._id}
        />
      ))}
    </Box>
  );
};

export default InboxTask;
