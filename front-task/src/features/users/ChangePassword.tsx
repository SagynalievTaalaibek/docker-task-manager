import React, { ChangeEvent } from 'react';
import { Grid2, TextField } from '@mui/material';

interface Props {
  password: string;
  inputChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ChangePassword: React.FC<Props> = ({password, inputChangeHandler }) => {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <TextField
          fullWidth
          label="Пароль"
          type='password'
          name="password"
          value={password}
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

export default ChangePassword;