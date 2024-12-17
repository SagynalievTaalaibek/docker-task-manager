import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
import {logout} from '../../features/users/userThunks';
import {Box, Button, Menu, MenuItem} from '@mui/material';
import {UserGet} from '../../types';

interface Props {
    user: UserGet;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = async () => {
        await dispatch(logout());
        navigate('/login');
    };

    return (
        <>
            <Box>
                <Button color="inherit" onClick={handleClick}
                        sx={{fontSize: "20px", fontWeight: 'bold', color: 'white'}}>
                    Hello, {user.username}!
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    keepMounted
                >
                    <MenuItem onClick={() => navigate('/')}>Tasks</MenuItem>
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Menu>
            </Box>
        </>
    );
};

export default UserMenu;
