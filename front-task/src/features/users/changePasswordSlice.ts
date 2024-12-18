import { createSlice } from '@reduxjs/toolkit';
import { sendEmail, sendOtp } from './userThunks.ts';
import { RootState } from '../../app/store.ts';
import { GlobalError } from '../../types';

interface ChangePasswordState {
  email: string;
  sendEmailLoading: boolean;
  sendError: GlobalError | null;
  sendOtpLoading: boolean;
}

const initialState: ChangePasswordState = {
  email: '',
  sendEmailLoading: false,
  sendError: null,
  sendOtpLoading: false,
};

export const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendEmail.pending, (state) => {
      state.sendOtpLoading = true;
    });
    builder.addCase(sendEmail.fulfilled, (state, { payload: data }) => {
      state.sendEmailLoading = false;
      state.email = data;
    });
    builder.addCase(sendEmail.rejected, (state, { payload: error }) => {
      state.sendEmailLoading = false;
      state.sendError = error || null;
    });
    builder.addCase(sendOtp.pending, (state) => {
      state.sendOtpLoading = true;
    });
    builder.addCase(sendOtp.fulfilled, (state) => {
      state.sendOtpLoading = false;
    });
    builder.addCase(sendOtp.rejected, (state, { payload: error }) => {
      state.sendOtpLoading = false;
      state.sendError = error || null;
    });
  },
});

export const changePasswordReducer = changePasswordSlice.reducer;

export const selectSendEmailLoading = (state: RootState) => state.changePassword.sendEmailLoading;
export const selectChangePasswordError = (state: RootState) => state.changePassword.sendError;
export const selectSendOtpLoading = (state: RootState) => state.changePassword.sendOtpLoading;
