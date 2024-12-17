import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { fetchByCategoryTasks } from './tasksThunks.ts';
import { selectTasks } from './tasksSlice.ts';
import TaskShow from '../../components/taskShow/taskShow.tsx';
import { useParams } from 'react-router-dom';

const TaskCategory = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);

  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    if (category) {
      dispatch(fetchByCategoryTasks(category));
    }
  }, [dispatch, category]);

  return <TaskShow tasks={tasks} />;
};

export default TaskCategory;
