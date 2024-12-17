import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userReducer } from '../features/users/userSlice';
import { tasksReducer } from '../features/tasks/tasksSlice.ts';
import { categoryReducer } from '../features/category/categorySlice.ts';

const usersPersistConfig = {
  key: 'cocktail:users',
  storage: storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  users: persistReducer(usersPersistConfig, userReducer),
  tasks: tasksReducer,
  category:categoryReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
