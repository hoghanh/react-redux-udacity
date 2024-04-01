import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Button,
} from '@mui/material';

import Header from './Header';

function CustomTabPanel(props) {
  const { value, index, data, users, questions } = props;

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div hidden={value !== index}>
        {data?.map(
          (item, index) =>
            questions[item] &&
            questions[item].author && (
              <Card
                sx={{ width: 400, margin: 3, borderTop: '3px solid blue' }}
                key={index}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      src={users[questions[item].author]?.avatarURL}
                      alt='user-avatar'
                    />
                  }
                  title={`${users[questions[item].author]?.name} asked:`}
                  style={{ backgroundColor: 'lightblue' }}
                />

                <CardContent>
                  <Typography variant='body2'>
                    <b>Your choice is:</b> <br />
                    {questions[item].optionOne.text} ...
                  </Typography>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      marginTop: '10px',
                    }}
                  >
                    <Button
                      variant='contained'
                      component={Link}
                      to={`/question/${item}`}
                    >
                      {value === 0 ? 'Vote Poll' : 'Result'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
        )}
      </div>
    </div>
  );
}

const Home = (props) => {
  const [selected, setSelected] = useState(0);

  const handleChange = (e, newValue) => {
    setSelected(newValue);
  };

  const sortCondition = (a, b) => {
    return (
      new Date(props.questions[b]?.timestamp).getTime() -
      new Date(props.questions[a]?.timestamp).getTime()
    );
  };

  let answered = Object.keys(props.users[props.authUser].answers).sort(
    sortCondition
  );
  const question = Object.keys(props.questions).sort(sortCondition);
  let unanswered = question.filter((question) => !answered.includes(question));

  return (
    <div>
      <Header />
      <Box
        sx={{
          width: 500,
          margin: '20px auto',
          border: '1px solid #d4d4d5',
          borderRadius: 2,
        }}
      >
        <Tabs
          value={selected}
          onChange={handleChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label='Unanswered' />
          <Tab label='Answered' />
        </Tabs>

        <CustomTabPanel
          value={selected}
          index={0}
          data={unanswered}
          users={props.users}
          questions={props.questions}
        />
        <CustomTabPanel
          value={selected}
          index={1}
          data={answered}
          users={props.users}
          questions={props.questions}
        />
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authUser: state.authUser,
  questions: state.questions,
  users: state.users,
});

export default connect(mapStateToProps)(Home);
