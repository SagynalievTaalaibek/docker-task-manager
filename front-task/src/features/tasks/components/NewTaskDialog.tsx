import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { openTask, selectIsOpen } from '../tasksSlice.ts';
import { PRIORITIES, STATUS } from '../../../constants.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { TaskMutation } from '../../../types';
import { selectCategory } from '../../category/categorySlice.ts';
import { fetchCategory } from '../../category/categoryThunks.ts';

interface Props {
  onSubmit: (task: TaskMutation) => void;
}

const NewTaskDialog: React.FC<Props> = ({ onSubmit }) => {
  const isOpen = useAppSelector(selectIsOpen);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategory);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const [task, setTask] = useState<TaskMutation>({
    title: '',
    dueDate: '',
    status: 'pending',
    priority: 'medium',
    categoryId: '',
  });

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

    onSubmit(task);

    setTask({
      title: '',
      dueDate: '',
      status: '',
      priority: '',
      categoryId: '',
    });

    dispatch(openTask(false));
  };

  return (
    <Dialog open={isOpen} onClose={() => dispatch(openTask(false))}>
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
          <DialogActions>
            <Button onClick={() => dispatch(openTask(false))}>Cancel</Button>
            <Button type="submit" variant={'contained'}>
              Create
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskDialog;