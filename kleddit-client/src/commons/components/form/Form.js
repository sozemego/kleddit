import React, { Component } from 'react';
import Divider from 'material-ui/Divider';

const styles = {
  formContainer: {
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'center',
    'alignItems': 'center',
    'margin': 'auto',
    'border': '1px solid rgba(0, 0, 0, 1)',
    'borderRadius': '2px',
    'backgroundColor': 'rgba(37, 37, 37, 1)',
    'boxShadow': '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
  },
  formHeader: {
    'display': 'flex',
    'width': '100%',
    'backgroundColor': 'black',
    'justifyContent': 'center',
    'fontSize': '1.5rem',
  },
  formTitle: {
    'padding': '6px 6px',
    'backgroundColor': 'black',
  },
  formDivider: {
    'width': '100%',
  },
  formChildrenContainer: {
    'display': 'flex',
    'flexDirection': 'column',
    'padding': '0px 6px 0px 6px',
    'alignItems': 'center',
  },
};

export class Form extends Component {

  render() {
    const {
      title,
      children,
    } = this.props;

    if (React.Children.toArray(children).length === 0) {
      console.warn('Form without children, you probably did not want this.');
    }

    return (
      <div style={styles.formContainer}>
        {title ?
         <div style={styles.formHeader}>
           <span style={styles.formTitle}>{title}</span>
         </div>
          : null
        }
        <Divider style={styles.formDivider}/>
        <div style={styles.formChildrenContainer}>
          {this.props.children}
        </div>
      </div>
    );
  }

}