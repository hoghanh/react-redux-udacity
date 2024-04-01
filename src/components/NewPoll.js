import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import Header from './Header';
import { handleSaveQuestion } from '../actions/shared';

const NewPoll = (props) => {
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    props
      .dispatch(handleSaveQuestion(optionOne, optionTwo, props.authUser))
      .then(() => {
        setOptionOne('');
        setOptionTwo('');
        navigate('/');
      });
  };

  return (
    <>
      <Header />

      <Card
        sx={{
          maxWidth: 600,
          margin: 'auto',
          marginTop: 5,
          borderTop: '3px solid blue',
        }}
      >
        <CardContent>
          <Typography variant='h5' gutterBottom>
            Create a New Poll
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='body1' gutterBottom>
                <strong>Your choice is: </strong>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='optionOne'
                label='Enter option one...'
                value={optionOne}
                onChange={(e) => {
                  setOptionOne(e.target.value);
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='optionTwo'
                label='Enter option two...'
                value={optionTwo}
                onChange={(e) => {
                  setOptionTwo(e.target.value);
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant='contained'
                type='submit'
                data-testid='submit-new-poll'
                disabled={!optionOne || !optionTwo}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps)(NewPoll);
