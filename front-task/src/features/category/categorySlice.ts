import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { CategoryGet } from '../../types';
import { fetchCategory, fetchOneCategory } from './categoryThunks.ts';

interface CategoryState {
  categories: CategoryGet[];
  category: CategoryGet | null;
  isOpen: boolean;
  isFetch: boolean;
}

const initialState: CategoryState = {
  categories: [],
  category: null,
  isOpen: false,
  isFetch: false,
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
