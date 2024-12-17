import {TaskGet} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/store.ts';
import {createTask, deleteTask, editTask, fetchOneTask, fetchSearchTasks, fetchTasks} from './tasksThunks.ts';

interface TasksState {
    tasks: TaskGet[];
    oneTask: TaskGet | null;
    createTaskLoading: boolean;
    editTaskLoading: boolean;
    deleteTaskLoading: boolean;
    fetchTasksLoading: boolean;
    fetchOneTaskLoading: boolean;
}

const initialState: TasksState = {
    tasks: [],
    oneTask: null,
    createTaskLoading: false,
    editTaskLoading: false,
    deleteTaskLoading: false,
    fetchTasksLoading: false,
    fetchOneTaskLoading: false
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
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
            .addCase(createTask.fulfilled, (state) => {
                state.createTaskLoading = false;
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
    }

});


export const tasksReducer = tasksSlice.reducer;

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectOneTask = (state: RootState) => state.tasks.oneTask;
export const selectCreateTaskLoading = (state: RootState) => state.tasks.createTaskLoading;
export const selectFetchTasksLoading = (state: RootState) => state.tasks.fetchTasksLoading;
export const selectFetchOneTaskLoading = (state: RootState) => state.tasks.fetchOneTaskLoading;
export const selectEditTaskLoading = (state: RootState) => state.tasks.editTaskLoading;
export const selectDeleteTaskLoading = (state: RootState) => state.tasks.deleteTaskLoading;