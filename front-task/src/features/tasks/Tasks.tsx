import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { TaskMutation } from '../../types';
import { STATUS } from '../../constants.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { createTask, fetchTasks } from './tasksThunks.ts';
import { selectTasks } from './tasksSlice.ts';
import OneTask from './OneTask.tsx';

const Tasks = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState<TaskMutation>({
    title: '',
    dueDate: '',
    status: 'pending',
  });

  const tasks = useAppSelector(selectTasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTask((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const selectChangeHandler = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onTaskSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await dispatch(createTask(task));

    setTask({
      title: '',
      dueDate: '',
      status: '',
    });

    setOpen(false);

    await dispatch(fetchTasks());
  };

  return (
    <>
      <Box>
        <Button
          sx={{ mb: 5, fontSize: '20px' }}
          variant={'contained'}
          onClick={handleClickOpen}
        >
          New Task
        </Button>
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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Task</DialogTitle>
          <DialogContent>
            <form onSubmit={onTaskSubmit}>
              <Grid2 container spacing={2} sx={{ width: '500px' }}>
                <Grid2 size={12}>
                  <TextField
                    label="Title"
                    required
                    name="title"
                    value={task.title}
                    onChange={inputChangeHandler}
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
                  />
                </Grid2>
                <Grid2 size={12}>
                  <FormControl fullWidth>
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                      id="status"
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
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant={'contained'}>
                  Create
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export default Tasks;
