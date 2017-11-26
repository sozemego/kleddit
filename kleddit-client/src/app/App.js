import React, {Component} from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMuiTheme, MuiThemeProvider} from 'material-ui/styles';

import './App.css';
import {store} from '../state/init';
import RegisterUserContainer from '../user/register/RegisterUserContainer';
import ProfileContainer from '../user/profile/ProfileContainer';
import HeaderContainer from '../header/HeaderContainer';
import LoginFormContainer from '../user/login/LoginFormContainer';
import MainPageContainer from '../main/MainPageContainer';

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div style={{height: '100%'}}>
            <HeaderContainer/>
            <Router>
              <div className="app-container">
                <Route exact path="/register" component={RegisterUserContainer}/>
                <Route exact path="/profile" component={ProfileContainer}/>
                <Route exact path="/login" component={LoginFormContainer}/>
                <Route exact path="/" component={MainPageContainer}/>
              </div>
            </Router>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

// export default withTheme(theme)(App);
export default App;
