import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { CategoryGet, CategoryMutation } from '../../types';

export const fetchCategory = createAsyncThunk<CategoryGet[]>(
  'category/fetchCategory',
  async () => {
    const response = await axiosApi.get<CategoryGet[]>('/category');
    return response.data;
  },
);

export const fetchOneCategory = createAsyncThunk<CategoryGet, string>(
  'category/fetchOneCategory',
  async (id) => {
    const response = await axiosApi.get<CategoryGet>(`/category/${id}`);
    return response.data;
  },
);

export const createCategory = createAsyncThunk<{ message: string }, CategoryMutation>(
  'category/createCategory',
  async (data) => {
    const response = await axiosApi.post('/category', data);
    return response.data;
  },
);

export const editTask = createAsyncThunk<
  void,
  { id: string; data: CategoryMutation }
>('category/editTask', async ({ id, data }) => {
  await axiosApi.patch(`/category/${id}`, data);
});

// Удаление задачи
export const deleteTask = createAsyncThunk<void, string>(
  'category/deleteTask',
  async (id) => {
    await axiosApi.delete(`/category/${id}`);
  },
);
