import React, {Component} from 'react';
import {Provider} from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {store} from '../state/init';
import Kleddit from '../kleddit/Kleddit';

const theme = getMuiTheme(darkBaseTheme);

class App extends Component {

  render() {
    return (
        <MuiThemeProvider muiTheme={theme}>
          <Provider store={store}>
            <Kleddit />
          </Provider>
        </MuiThemeProvider>
    );
  }
}

export default App;
