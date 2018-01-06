import React from 'react';
import { RaisedButton } from 'material-ui';

const style = {
  margin: '0px 4px',
};

export const HeaderButton = (props) => <RaisedButton {...props} style={style} primary/>;