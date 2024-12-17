import React, { useState } from 'react';
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
import { STATUS } from '../../../constants.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { TaskMutation } from '../../../types';

interface Props {
  onSubmit: (task: TaskMutation) => void;
}

const NewTaskDialog: React.FC<Props> = ({ onSubmit }) => {
  const isOpen = useAppSelector(selectIsOpen);
  const dispatch = useAppDispatch();

  const [task, setTask] = useState<TaskMutation>({
    title: '',
    dueDate: '',
    status: 'pending',
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