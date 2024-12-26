import { createAsyncThunk } from '@reduxjs/toolkit';
import { unsetUser } from './userSlice';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';
import {
  ChangePasswordData,
  GlobalError,
  LoginMutation,
  RegisterMutation,
  RegisterResponse,
  SendOtpPayload,
  ValidationError,
} from '../../types';

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterMutation,
  { rejectValue: ValidationError }
>('users/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post('/users', userData);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const login = createAsyncThunk<
  RegisterResponse,
  LoginMutation,
  { rejectValue: GlobalError }
>('users/login', async (loginMutation, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<RegisterResponse>(
      '/users/sessions',
      loginMutation,
    );
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 401) {
      console.log('THIUNKS');
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const logout = createAsyncThunk<void, undefined>(
  'users/logout',
  async (_, { dispatch }) => {
    await axiosApi.delete('users/sessions');
    dispatch(unsetUser());
  },
);

/// Change Password
export const sendEmail = createAsyncThunk<
  string,
  string,
  { rejectValue: GlobalError }
>('changePassword/sendEmail', async (email) => {
  const response = await axiosApi.post('/users/send-otp', { email });
  return response.data;
});

export const sendOtp = createAsyncThunk<
  string,
  SendOtpPayload,
  { rejectValue: GlobalError }
>('changePassword/sendOtp', async ({ email, otp }) => {
  const response = await axiosApi.post('/users/compare-otp', { email, otp });
  return response.data;
});

export const changePassword = createAsyncThunk<
  string,
  ChangePasswordData,
  { rejectValue: GlobalError }
>('changePassword/changePassword', async ({ email, password }) => {
  const response = await axiosApi.post('/users/change-password', {
    email,
    password,
  });
  return response.data;
});
