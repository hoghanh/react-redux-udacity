import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Button,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  Box,
  LinearProgress,
} from '@mui/material';

import Header from './Header';
import PageNotFound from './PageNotFound';
import { saveAnswer } from '../actions/shared';

const Question = (props) => {
  const { id } = useParams();
  const [value, setValue] = useState(0);

  const question = props.questions[id];
  const { optionOne, optionTwo } = question;

  const totalVotes = optionOne.votes.length + optionTwo.votes.length;
  const isOptionOne = optionOne.votes.includes(props.authUser);

  const questionAnswered = Object.keys(
    props.users[props.authUser]?.answers
  ).includes(question?.id);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const submitAnswer = (event) => {
    props.dispatch(saveAnswer(props.authUser, id, value));
  };

  const calculatePercentage = (voteAmount) =>
    Number(((voteAmount / totalVotes) * 100).toFixed(0));

  if (!question) {
    return <PageNotFound />;
  }

  return (
    <>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ width: 500, margin: 3, borderTop: '3px solid blue' }}>
          <CardHeader
            avatar={
              <Avatar
                src={props.users[question.author].avatarURL}
                alt='user-avatar'
              />
            }
            title={`${props.users[question.author].name} asked:`}
            style={{ backgroundColor: 'lightblue' }}
          />
          {questionAnswered ? (
            <CardContent>
              <Typography variant='h6'>
                <b>Your choice is:</b>
              </Typography>

              <Box
                sx={{
                  width: 400,
                  height: 75,
                  borderRadius: 1,
                  margin: '10px auto',
                  padding: 2,
                  backgroundColor: isOptionOne ? 'lightgreen' : 'mistyrose',
                }}
              >
                <Typography style={{ textAlign: 'center' }}>
                  {question.optionOne.text}
                </Typography>
                <Typography
                  variant='h6'
                  style={{ textAlign: 'center', color: 'darkblue' }}
                >{`${optionOne.votes.length} out of ${totalVotes} votes`}</Typography>
                <LinearProgress
                  variant='determinate'
                  value={calculatePercentage(optionOne.votes.length)}
                />
                {isOptionOne && (
                  <Typography style={{ textAlign: 'center' }}>
                    -------------- Your Vote --------------
                  </Typography>
                )}
              </Box>
              <Box
                sx={{
                  width: 400,
                  height: 75,
                  borderRadius: 1,
                  margin: '10px auto',
                  padding: 2,
                  backgroundColor: !isOptionOne ? 'lightgreen' : 'mistyrose',
                }}
              >
                <Typography style={{ textAlign: 'center' }}>
                  {question.optionTwo.text}
                </Typography>

                <Typography
                  variant='h6'
                  style={{ textAlign: 'center', color: 'darkblue' }}
                >{`${optionTwo.votes.length} out of ${totalVotes} votes`}</Typography>
                <LinearProgress
                  variant='determinate'
                  value={calculatePercentage(optionTwo.votes.length)}
                />
                {!isOptionOne && (
                  <Typography style={{ textAlign: 'center' }}>
                    -------------- Your Vote --------------
                  </Typography>
                )}
              </Box>
            </CardContent>
          ) : (
            <CardContent>
              <Typography variant='h6'>
                <b>Your choice is:</b>
              </Typography>
              <FormControl>
                <RadioGroup
                  name='controlled-radio-buttons-group'
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value='optionOne'
                    control={<Radio />}
                    label={question.optionOne.text}
                  />
                  <FormControlLabel
                    value='optionTwo'
                    control={<Radio />}
                    label={question.optionTwo.text}
                  />
                </RadioGroup>
              </FormControl>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '10px',
                }}
              >
                <Button
                  variant='contained'
                  onClick={submitAnswer}
                  disabled={!value}
                >
                  Submit
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  authUser: state.authUser,
  questions: state.questions,
  users: state.users,
});

export default connect(mapStateToProps)(Question);
