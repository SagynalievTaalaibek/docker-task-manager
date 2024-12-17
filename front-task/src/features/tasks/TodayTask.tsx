import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchTasks } from './tasksThunks.ts';
import { selectTasks } from './tasksSlice.ts';
import TaskShow from '../../components/taskShow/taskShow.tsx';

const TodayTask = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return <TaskShow tasks={tasks} />;
};

export default TodayTask;
