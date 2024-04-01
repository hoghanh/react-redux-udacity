import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { Box, Tabs, Tab, Typography, Avatar, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { setAuthUser } from '../actions/authUser';

const Header = (props) => {
  const [value, setValue] = useState(0);
  const currentUser = props.users?.[props.authId] || null;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    switch (location?.pathname) {
      case '/add-poll':
        setValue(2);
        break;
      case '/leader-board':
        setValue(1);
        break;
      case '/':
      default:
        setValue(0);
        break;
    }

    if (!currentUser) {
      navigate('/login');
    }
  }, [location?.pathname]);

  const handleLogout = (e) => {
    props.dispatch(setAuthUser(null));
    navigate('/login');
  };

  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <Tabs value={value}>
          <Tab label='Home' component={Link} to='/' />
          <Tab label='Leader Board' component={Link} to='/leader-board' />

          <Tab label='New Poll' component={Link} to='/add-poll' />
        </Tabs>
        {currentUser !== undefined && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={currentUser?.avatarURL}
              alt={currentUser?.name}
              sx={{ mr: 2 }}
            />
            <Typography sx={{ mr: 2 }}>{currentUser?.name}</Typography>
            <Button onClick={handleLogout}>
              <LogoutIcon />
            </Button>
          </div>
        )}
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  authId: state.authUser,
  users: state.users,
});

export default connect(mapStateToProps)(Header);
