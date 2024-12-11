// Получение списка задач
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TaskGet, TaskMutation } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchTasks = createAsyncThunk<TaskGet[]>(
  'tasks/fetchTasks',
  async () => {
    const response = await axiosApi.get<TaskGet[]>('/tasks');
    return response.data;
  },
);

export const fetchOneTask = createAsyncThunk<TaskGet, string>(
  'tasks/fetchOneTask',
  async (taskId) => {
    const response = await axiosApi.get<TaskGet>(`/tasks/${taskId}`);
    return response.data;
  },
);

// Создание новой задачи
export const createTask = createAsyncThunk<void, TaskMutation>(
  'tasks/createTask',
  async (taskData) => {
    try {
      await axiosApi.post('/tasks', taskData);
    } catch (error: any) {
      if (error.response.status === 500) {
        console.error('Internal Server Error:', error.message);
      } else if (error.response.status === 422) {
        alert('This email is already registered!');
      }
    }
  },
);

export const editTask = createAsyncThunk<
  void,
  { id: string; data: TaskMutation }
>('tasks/editTask', async ({ id, data }) => {
  await axiosApi.patch(`/tasks/${id}`, data);
});

// Удаление задачи
export const deleteTask = createAsyncThunk<void, string>(
  'tasks/deleteTask',
  async (taskId) => {
    try {
      await axiosApi.delete(`/tasks/${taskId}`);
    } catch (error: any) {
      if (error.response.status === 500) {
        console.error('Internal Server Error:', error.message);
      } else if (error.response.status === 400) {
        alert('This employee is using in another table!');
      }
    }
  },
);
