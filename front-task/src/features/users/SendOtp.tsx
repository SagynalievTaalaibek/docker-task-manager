import React, { ChangeEvent } from 'react';
import { Grid2, TextField } from '@mui/material';

interface Props {
  otp: string;
  inputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SendOtp: React.FC<Props> = ({otp, inputChangeHandler }) => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <TextField
          fullWidth
          label="Otp"
          name="otp"
          value={otp}
          onChange={inputChangeHandler}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '30px',
            },
          }}
        />
      </Grid2>
    </Grid2>
  );
};

export default SendOtp;