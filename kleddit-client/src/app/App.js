import React, {Component} from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';
import {store} from '../state/init';
import RegisterUserContainer from '../user/register/RegisterUserContainer';
import ProfileContainer from '../user/profile/ProfileContainer';
import HeaderContainer from '../header/HeaderContainer';
import LoginFormContainer from '../user/login/LoginFormContainer';
import MainPageContainer from '../main/MainPageContainer';
import ErrorDisplay from '../main/ErrorDisplay';

const theme = getMuiTheme(darkBaseTheme);

class App extends Component {

  render() {
    return (
      <Router>
        <MuiThemeProvider muiTheme={theme}>
          <Provider store={store}>
            <div>
              <HeaderContainer/>
              <div className="app-container">
                <Route exact path="/register" component={RegisterUserContainer}/>
                <Route exact path="/profile" component={ProfileContainer}/>
                <Route exact path="/login" component={LoginFormContainer}/>
                <Route exact path="/" component={MainPageContainer}/>
                <ErrorDisplay />
              </div>
            </div>
          </Provider>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
