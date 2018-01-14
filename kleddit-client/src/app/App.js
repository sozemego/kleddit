import React, { Component } from 'react';
import { Provider } from 'react-redux';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { store } from '../state/init';
import { Kleddit } from '../kleddit/Kleddit';
import { StyleRoot } from 'radium';

const theme = getMuiTheme(darkBaseTheme);

class App extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <Provider store={store}>
          <StyleRoot>
            <Kleddit/>
          </StyleRoot>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
