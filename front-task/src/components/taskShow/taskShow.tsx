import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import OneTask from '../../features/tasks/components/OneTask.tsx';
import { TaskGet } from '../../types';
import Filter from '../../features/filter/Filter.tsx';
import { useAppDispatch } from '../../app/hooks.ts';
import { fetchSearchTasks } from '../../features/tasks/tasksThunks.ts';

interface TaskShowProps {
  tasks: TaskGet[];
}

const TaskShow: React.FC<TaskShowProps> = ({ tasks }) => {
  const dispatch = useAppDispatch();

  const handleSearch = async (searchTerm: string) => {
    await dispatch(fetchSearchTasks(searchTerm));
  };

  return (
    <Box>
      <Filter isLoading={false} onSearch={handleSearch} />
      <Typography variant={'h4'} sx={{ fontWeight: 'bold' }}>
        Doing
      </Typography>
      <Divider />
      {tasks
        .filter((item) => item.status === 'in_progress')
        .map((item) => (
          <OneTask
            key={item._id}
            title={item.title}
            dueDate={item.dueDate}
            status={item.status}
            _id={item._id}
          />
        ))}
      <Typography variant={'h4'} sx={{ fontWeight: 'bold', mt: 4 }}>
        To Doo
      </Typography>
      <Divider />
      {tasks
        .filter((item) => item.status === 'pending')
        .map((item) => (
          <OneTask
            key={item._id}
            title={item.title}
            dueDate={item.dueDate}
            status={item.status}
            _id={item._id}
          />
        ))}
      <Typography variant={'h4'} sx={{ fontWeight: 'bold', mt: 4 }}>
        Done
      </Typography>
      {tasks
        .filter((item) => item.status === 'completed')
        .map((item) => (
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

export default TaskShow;