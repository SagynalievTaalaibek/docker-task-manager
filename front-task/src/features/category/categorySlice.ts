import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { CategoryGet } from '../../types';
import {
  createCategory,
  fetchCategory,
  fetchOneCategory,
} from './categoryThunks.ts';

interface CategoryState {
  categories: CategoryGet[];
  category: CategoryGet | null;
  creating: boolean;
  isOpen: boolean;
  isFetch: boolean;
  error: string;
}

const initialState: CategoryState = {
  categories: [],
  category: null,
  creating: false,
  isOpen: false,
  isFetch: false,
  error: '',
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    openCategory(state, action) {
      state.isOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchCategory.pending, (state) => {
        state.isFetch = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.isFetch = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategory.rejected, (state) => {
        state.isFetch = false;
      })

      .addCase(createCategory.pending, (state) => {
        state.creating = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.creating = false;
        state.error = action.payload.message || '';
      })
      .addCase(createCategory.rejected, (state) => {
        state.creating = false;
      })

      // Fetch one task
      .addCase(fetchOneCategory.pending, (state) => {
        state.isFetch = true;
      })
      .addCase(fetchOneCategory.fulfilled, (state, action) => {
        state.isFetch = false;
        state.category = action.payload;
      })
      .addCase(fetchOneCategory.rejected, (state) => {
        state.isFetch = false;
      });
  },
});

export const categoryReducer = tasksSlice.reducer;
export const { openCategory } = tasksSlice.actions;

export const selectIsCategoryOpen = (state: RootState) => state.category.isOpen;

export const selectCategory = (state: RootState) => state.category.categories;
export const selectOneCategory = (state: RootState) => state.category.category;
export const selectError = (state: RootState) => state.category.error;