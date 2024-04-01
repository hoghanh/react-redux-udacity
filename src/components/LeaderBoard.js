import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, TableCell, TableRow, Avatar, Container } from '@mui/material';

import Header from './Header';

const LeaderBoard = (props) => {
  const navigate = useNavigate();

  const sortedUsers = Object.values(props.users).sort((a, b) => {
    const scoreA = Object.keys(a.answers).length + a.questions.length;
    const scoreB = Object.keys(b.answers).length + b.questions.length;
    return scoreB - scoreA;
  });

  useEffect(() => {
    if (!props.authUser) {
      navigate('/login');
    }
  }, [props.authUser, navigate]);

  return (
    <div className='leader-board'>
      <Header />
      <Container component='main' sx={{ marginTop: 8 }}>
        <Table>
          <thead>
            <TableRow style={{ backgroundColor: 'lightblue' }}>
              <TableCell>User</TableCell>
              <TableCell align='center'>Answered</TableCell>
              <TableCell align='center'>Created</TableCell>
              <TableCell align='center'>Total Score</TableCell>
            </TableRow>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar alt='Profile Picture' src={user.avatarURL} />{' '}
                  {user.name}
                </TableCell>
                <TableCell align='center'>
                  {Object.keys(user.answers).length}
                </TableCell>
                <TableCell align='center'>{user.questions.length}</TableCell>
                <TableCell align='center'>
                  <Avatar
                    style={{
                      backgroundColor: 'green',
                      display: 'inline-flex',
                    }}
                  >
                    {Object.keys(user.answers).length + user.questions.length}
                  </Avatar>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authUser: state.authUser,
  questions: state.questions,
  users: state.users,
});

export default connect(mapStateToProps)(LeaderBoard);
