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

export const fetchSearchTasks = createAsyncThunk<TaskGet[], string>(
  'tasks/fetchSearchTasks',
  async (search) => {
    const response = await axiosApi.get<TaskGet[]>(
      `/tasks?taskSearch=true&search=${search}`,
    );
    return response.data;
  },
);

export const fetchByDashboardTasks = createAsyncThunk<TaskGet[], string>(
  'tasks/fetchByDashboardTasks',
  async (search) => {
    const response = await axiosApi.get<TaskGet[]>(
      `/tasks?dashboard=true&dashboardSearch=${search}`,
    );
    return response.data;
  },
);

export const fetchByCategoryTasks = createAsyncThunk<TaskGet[], string>(
  'tasks/fetchByCategoryTasks',
  async (search) => {
    const response = await axiosApi.get<TaskGet[]>(
      `/tasks?category=true&categorySearch=${search}`,
    );
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
export const createTask = createAsyncThunk<{ message: string }, TaskMutation>(
  'tasks/createTask',
  async (taskData) => {
    const response = await axiosApi.post('/tasks', taskData);
    return response.data;
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
    await axiosApi.delete(`/tasks/${taskId}`);
  },
);
