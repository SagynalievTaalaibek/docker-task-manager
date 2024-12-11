import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/userSlice';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';
import { Box, Container, styled, Typography } from '@mui/material';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <Box
      component="header"
      position="sticky"
      sx={{ mb: 2, backgroundColor: '#8cd687' }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            p: '10px 0',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: 'bold', color: 'white' }}
            >
              <Link to="/">My Task Manager</Link>
            </Typography>
          </Box>
          <Box>{user ? <UserMenu user={user} /> : <AnonymousMenu />}</Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AppToolbar;
