import { NavLink } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const AnonymousMenu = () => {
  return (
    <>
      <Box sx={{ alignItems: 'end' }}>
        <Button
          variant="outlined"
          color="inherit"
          component={NavLink}
          to="/register"
          sx={{ marginRight: '10px', fontWeight: 'bolder', fontSize: '16px' }}
        >
          Sing up
        </Button>

        <Button
          variant="outlined"
          color="inherit"
          component={NavLink}
          to="/login"
          sx={{ fontWeight: 'bolder', fontSize: '16px' }}
        >
          Sing in
        </Button>
      </Box>
    </>
  );
};

export default AnonymousMenu;
