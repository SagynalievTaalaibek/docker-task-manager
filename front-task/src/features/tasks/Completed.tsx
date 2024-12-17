import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchByDashboardTasks } from './tasksThunks.ts';
import { selectTasks } from './tasksSlice.ts';
import TaskShow from '../../components/taskShow/taskShow.tsx';

const Completed = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);

  useEffect(() => {
    dispatch(fetchByDashboardTasks('completed'));
  }, [dispatch]);

  return <TaskShow tasks={tasks} />;
};

export default Completed;
