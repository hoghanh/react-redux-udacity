import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { handleInitialData } from './actions/shared';

import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import Home from './components/Home';
import NewPoll from './components/NewPoll';
import LeaderBoard from './components/LeaderBoard';
import Question from './components/Question';

const App = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    props.dispatch(handleInitialData()).then(() => {
      setIsAuthenticated(props.authUser !== null);
    });
  }, [props.authUser]);

  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path='/'
            element={isAuthenticated ? <Home /> : <Login />}
          />
          <Route
            exact
            path='/add-poll'
            element={isAuthenticated ? <NewPoll /> : <Login />}
          />
          <Route
            exact
            path='/leader-board'
            element={isAuthenticated ? <LeaderBoard /> : <Login />}
          />
          <Route
            exact
            path='/question/:id'
            element={isAuthenticated ? <Question /> : <Login />}
          />
          <Route
            exact
            path='/leader-board/:id'
            element={isAuthenticated ? <Question /> : <Login />}
          />
          <Route exact path='/login' element={<Login />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
};

const mapStateToProps = (state) => ({ authUser: state.authUser });

export default connect(mapStateToProps)(App);
