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
  selectEditTaskLoading,
  selectFetchOneTaskLoading,
  selectOneTask,
} from './tasksSlice';
import { editTask, fetchOneTask } from './tasksThunks';
import { TaskMutation } from '../../types';
import { STATUS } from '../../constants';

const formatDate = (date: string): string => date.slice(0, 10);

const EditTask = () => {
  const [task, setTask] = useState<TaskMutation>({
    title: '',
    dueDate: '',
    status: '',
  });

  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const oneTask = useAppSelector(selectOneTask);
  const editLoading = useAppSelector(selectEditTaskLoading);
  const fetchOneLoading = useAppSelector(selectFetchOneTaskLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneTask(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (oneTask) {
      setTask({
        title: oneTask.title,
        dueDate: formatDate(oneTask.dueDate),
        status: oneTask.status,
      });

      console.log(oneTask);
    }
  }, [oneTask]);


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(editTask({ id, data: task }));
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
        </form>
      )}
    </>
  );
};

export default EditTask;
