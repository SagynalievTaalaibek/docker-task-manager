import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Box, Container, Grid2, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectChangePasswordError, selectSendEmailLoading } from './changePasswordSlice.ts';
import { ChangePasswordData, SendOtpPayload } from '../../types';
import { changePassword, sendEmail, sendOtp } from './userThunks.ts';
import SendOtp from './SendOtp.tsx';
import ChangePassword from './ChangePassword.tsx';


const SendEmail = () => {
  const dispatch = useAppDispatch();
  const [isEmailSended, setIsEmailSended] = useState(false);
  const [isOtpSended, setIsOtpSended] = useState(false);
  const error = useAppSelector(selectChangePasswordError);
  const loading = useAppSelector(selectSendEmailLoading);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<SendOtpPayload>({
    email: '',
    otp: '',
  });
  const [changePasswordData, setChangePasswordData] = useState<ChangePasswordData>({
    email: '',
    password: '',
  });
  console.log(otp);
  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (!isEmailSended && !isOtpSended) {
      setEmail(value);
    } else if (isEmailSended) {
      setOtp((prevState) => ({
        ...prevState,
        [name]: value,
        email: email,
      }));
    } else if (isOtpSended) {
      setChangePasswordData((prevState) => ({
        ...prevState,
        [name]: value,
        email: email,
      }));
    }
  };

  const submitFormHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (!isEmailSended && !isOtpSended) {
      await dispatch(sendEmail(email)).unwrap();
      setIsEmailSended(true);
    } else if (isEmailSended) {
      await dispatch(sendOtp(otp)).unwrap();
      setIsEmailSended(false);
      setIsOtpSended(true);
    } else if (isOtpSended) {
      await dispatch(changePassword(changePasswordData)).unwrap();
      navigate('/');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{mt: 5}}>
      <Typography component="h1" variant="h5" sx={{fontWeight: 'bold', textAlign: 'center'}}>
        Task Manager
      </Typography>
      {error && (
        <Alert severity="error" sx={{mt: 3, width: '100%'}}>
          {error.error}
        </Alert>
      )}
      <Box component="form" onSubmit={submitFormHandler} sx={{mt: 3, width: '100%'}}>
        <Grid2 container spacing={2}>
          {isEmailSended &&
            <Typography>Otp был отправлен на Вашу почту</Typography>
          }
          {isOtpSended &&
            <Typography>Смените пароль</Typography>
          }
          <Grid2 size={12}>
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              autoComplete="current-username"
              value={email}
              onChange={inputChangeHandler}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px',
                },
                marginBottom: '10px'
              }}
              disabled={isEmailSended}
            />
          </Grid2>
        </Grid2>
        {isEmailSended && <SendOtp otp={otp.otp} inputChangeHandler={inputChangeHandler}/>}
        {isOtpSended &&
          <ChangePassword
            password={changePasswordData.password} inputChangeHandler={inputChangeHandler}/>}
        <LoadingButton
          loading={loading}
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            color: 'black',
            borderRadius: '30px',
            p: 1.5,
            fontSize: '20px'
          }}
        >
          Next
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default SendEmail;