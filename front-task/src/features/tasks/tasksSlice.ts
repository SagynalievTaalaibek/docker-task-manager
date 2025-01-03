import { TaskGet } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import {
  createTask,
  deleteTask,
  editTask,
  fetchByCategoryTasks,
  fetchByDashboardTasks,
  fetchOneTask,
  fetchSearchTasks,
  fetchTasks,
} from './tasksThunks.ts';

interface TasksState {
  tasks: TaskGet[];
  oneTask: TaskGet | null;
  createTaskLoading: boolean;
  editTaskLoading: boolean;
  deleteTaskLoading: boolean;
  fetchTasksLoading: boolean;
  fetchOneTaskLoading: boolean;
  isOpen: boolean;
  error: string;
}

const initialState: TasksState = {
  tasks: [],
  oneTask: null,
  createTaskLoading: false,
  editTaskLoading: false,
  deleteTaskLoading: false,
  fetchTasksLoading: false,
  fetchOneTaskLoading: false,
  isOpen: false,
  error: '',
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    openTask(state, action) {
      state.isOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.fetchTasksLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.fetchTasksLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.fetchTasksLoading = false;
      })
      .addCase(fetchSearchTasks.pending, (state) => {
        state.fetchTasksLoading = true;
      })
      .addCase(fetchSearchTasks.fulfilled, (state, action) => {
        state.fetchTasksLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchSearchTasks.rejected, (state) => {
        state.fetchTasksLoading = false;
      })

      .addCase(fetchByDashboardTasks.pending, (state) => {
        state.fetchTasksLoading = true;
      })
      .addCase(fetchByDashboardTasks.fulfilled, (state, action) => {
        state.fetchTasksLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchByDashboardTasks.rejected, (state) => {
        state.fetchTasksLoading = false;
      })

      .addCase(fetchByCategoryTasks.pending, (state) => {
        state.fetchTasksLoading = true;
      })
      .addCase(fetchByCategoryTasks.fulfilled, (state, action) => {
        state.fetchTasksLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchByCategoryTasks.rejected, (state) => {
        state.fetchTasksLoading = false;
      })
      // Fetch one task
      .addCase(fetchOneTask.pending, (state) => {
        state.fetchOneTaskLoading = true;
      })
      .addCase(fetchOneTask.fulfilled, (state, action) => {
        state.fetchOneTaskLoading = false;
        state.oneTask = action.payload;
      })
      .addCase(fetchOneTask.rejected, (state) => {
        state.fetchOneTaskLoading = false;
      })
      // Create task
      .addCase(createTask.pending, (state) => {
        state.createTaskLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.createTaskLoading = false;
        state.error = action.payload.message || '';
      })
      .addCase(createTask.rejected, (state) => {
        state.createTaskLoading = false;
      })

      //Edit task
      .addCase(editTask.pending, (state) => {
        state.editTaskLoading = true;
      })
      .addCase(editTask.fulfilled, (state) => {
        state.editTaskLoading = false;
      })
      .addCase(editTask.rejected, (state) => {
        state.editTaskLoading = false;
      })
      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.deleteTaskLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.deleteTaskLoading = false;
      })
      .addCase(deleteTask.rejected, (state) => {
        state.deleteTaskLoading = false;
      });
  },
});

export const tasksReducer = tasksSlice.reducer;
export const { openTask } = tasksSlice.actions;

export const selectIsOpen = (state: RootState) => state.tasks.isOpen;

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectOneTask = (state: RootState) => state.tasks.oneTask;
export const selectCreateTaskLoading = (state: RootState) =>
  state.tasks.createTaskLoading;
export const selectFetchTasksLoading = (state: RootState) =>
  state.tasks.fetchTasksLoading;
export const selectFetchOneTaskLoading = (state: RootState) =>
  state.tasks.fetchOneTaskLoading;
export const selectEditTaskLoading = (state: RootState) =>
  state.tasks.editTaskLoading;
export const selectDeleteTaskLoading = (state: RootState) =>
  state.tasks.deleteTaskLoading;
export const selectTaskError = (state: RootState)  => state.tasks.error;
