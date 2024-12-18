import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Typography from '@mui/material/Typography';
import {
  Button,
  CircularProgress,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import {
  selectDeleteTaskLoading,
  selectEditTaskLoading,
  selectFetchOneTaskLoading,
  selectOneTask,
} from './tasksSlice';
import { deleteTask, editTask, fetchOneTask, fetchTasks } from './tasksThunks';
import { TaskMutation } from '../../types';
import { PRIORITIES, STATUS } from '../../constants';
import { selectCategory } from '../category/categorySlice.ts';
import { fetchCategory } from '../category/categoryThunks.ts';

const formatDate = (date: string): string => date.slice(0, 10);

const EditTask = () => {
  const categories = useAppSelector(selectCategory);
  const [task, setTask] = useState<TaskMutation>({
    title: '',
    dueDate: '',
    status: '',
    categoryId: '',
    priority: '',
  });

  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const oneTask = useAppSelector(selectOneTask);
  const editLoading = useAppSelector(selectEditTaskLoading);
  const fetchOneLoading = useAppSelector(selectFetchOneTaskLoading);
  const deleteLoading = useAppSelector(selectDeleteTaskLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneTask(id));
      dispatch(fetchCategory());
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (oneTask) {
      setTask({
        title: oneTask.title,
        dueDate: formatDate(oneTask.dueDate),
        status: oneTask.status,
        priority: oneTask.priority,
        categoryId: oneTask.categoryId,
      });
    }
  }, [oneTask]);

  const onDelete = async () => {
    if (id) {
      await dispatch(deleteTask(id));
      navigate('/');
    }
  };


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(editTask({ id, data: task }));
    await dispatch(fetchTasks());
    navigate('/');
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prevState) => ({ ...prevState, [name]: value }));
  };

  const selectChangeHandler = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setTask((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <Typography variant="h4" sx={{ margin: '10px 0', fontWeight: 'bold' }}>
        Update Task
      </Typography>
      {fetchOneLoading ? (
        <CircularProgress />
      ) : (
        <form onSubmit={onSubmit}>
          <Grid2 container spacing={2} sx={{ width: '500px' }}>
            <Grid2 size={12}>
              <TextField
                label="Title"
                required
                name="title"
                value={task.title}
                onChange={inputChangeHandler}
                fullWidth
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                type="date"
                required
                id="dueDate"
                name="dueDate"
                value={task.dueDate}
                onChange={inputChangeHandler}
                fullWidth
              />
            </Grid2>
            <Grid2 size={12}>
              <FormControl fullWidth>
                <InputLabel id="status">Status</InputLabel>
                <Select
                  id="status"
                  required
                  labelId="status"
                  value={task.status}
                  name="status"
                  label="Status"
                  onChange={selectChangeHandler}
                  variant="outlined"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {STATUS.map((item) => (
                    <MenuItem key={item.id} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12}>
              <FormControl fullWidth>
                <InputLabel id="priority">Priority</InputLabel>
                <Select
                  id="priority"
                  labelId="priority"
                  value={task.priority}
                  name="priority"
                  label="Priority"
                  onChange={selectChangeHandler}
                  variant="outlined"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {PRIORITIES.map((item) => (
                    <MenuItem key={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={12}>
              <FormControl fullWidth>
                <InputLabel id="category">Category</InputLabel>
                <Select
                  id="category"
                  labelId="category"
                  value={task.categoryId}
                  name="categoryId"
                  label="Category"
                  onChange={selectChangeHandler}
                  variant="outlined"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categories.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid2>
          </Grid2>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: '20px' }}
            disabled={editLoading}
          >
            {editLoading ? <CircularProgress size={24} /> : 'Save Changes'}
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: '20px', marginLeft: '20px', backgroundColor: 'red' }}
            disabled={deleteLoading}
            onClick={onDelete}
          >
            {editLoading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </form>
      )}
    </>
  );
};

export default EditTask;
