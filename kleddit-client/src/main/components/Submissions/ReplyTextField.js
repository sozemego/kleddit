import React from 'react';
import { LoadingClickableWrapper } from '../../../commons/components/LoadingClickable';
import { TextField as MaterialUiTextField } from 'material-ui';

const TextField = (props) => {
  return <MaterialUiTextField {...props}/>; //TODO dont do this, have a loading text field just
};

export const ReplyTextField = LoadingClickableWrapper(TextField);
