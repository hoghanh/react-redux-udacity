import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Typography,
  CardMedia,
  Card,
  CardContent,
  Select,
  MenuItem,
  Avatar,
} from '@mui/material';
import LoginImage from '../asset/login.png';
import { useState } from 'react';
import { setAuthUser } from '../actions/authUser';

const Login = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setAuthUser(value));

    navigate('/');
  };

  return (
    <div
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        height: '100vh',
        display: 'flex',
        padding: 20,
      }}
    >
      <Card style={{ width: 500, height: 500, margin: '0 auto' }}>
        <CardMedia
          style={{ height: 300 }}
          image={LoginImage}
          title='green iguana'
        />
        <CardContent style={{ display: 'grid', placeItems: 'center' }}>
          <Typography gutterBottom variant='h5' style={{ textAlign: 'center' }}>
            Login to continue
          </Typography>
          <Select
            value={value}
            onChange={handleChange}
            onClose={handleClose}
            onOpen={handleOpen}
            style={{ margin: 10 }}
            fullWidth
          >
            {props.users !== undefined &&
              props.users.map((option) => (
                <MenuItem
                  key={option.id}
                  value={option.id}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={option.avatarURL}
                      alt={option.name}
                      sx={{ mr: 2 }}
                    />
                    <Typography
                      variant='body2'
                      sx={{ fontSize: 14, lineHeight: '16px' }}
                    >
                      {option.name}
                    </Typography>
                  </div>
                </MenuItem>
              ))}
          </Select>
          <Button variant='contained' onClick={handleSubmit}>
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: Object.keys(state.users).map((key) => state.users[key]),
});

export default connect(mapStateToProps, { setAuthUser })(Login);
