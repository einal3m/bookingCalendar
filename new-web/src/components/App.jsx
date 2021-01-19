import React from 'react';
import './app.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Calendar from './calendar/calendar';
import Login from  './login/login';
import ReportsList from './reports/reports-list';
import { Provider } from 'react-redux';
import store from '../reducers/store';
import useToken from '../hooks/useToken';

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return (
      <Provider store={store}>
        <Login setToken={setToken} />
      </Provider>
    );
  }

  return (
    <div className="container">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/reports">
              <ReportsList />
            </Route>
            <Route path="/">
              <Calendar />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
