import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';

const inHoverAnimation = Radium.keyframes({
  '0%': {
    width: '18px',
    height: '18px',
  },
  '100%': {
    width: '22px',
    height: '22px',
  },
});

const outHoverAnimation = Radium.keyframes({
  '0%': {
    width: '22px',
    height: '22px',
  },
  '100%': {
    width: '18px',
    height: '18px',
  },
});

const styles = {
  reactionImage: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    animation: 'x 0.25s ease',
    animationName: outHoverAnimation,
    animationFillMode: 'forwards',
    ':hover': {
      animation: 'x 0.25s ease',
      animationName: inHoverAnimation,
      animationFillMode: 'forwards',
    },
  },
};

export class ReactionImage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {
      hovered,
    } = this.state;

    const {
      src,
      alt,
    } = this.props;

    const style = [styles.reactionImage, hovered ? styles.hoveredReactionImage : null];

    return (
      <div style={{
        width: '22px',
        height: '22px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img src={src} alt={alt} style={style}/>
      </div>
    );
  }

}

ReactionImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

ReactionImage.defaultProps = {};

export default Radium(ReactionImage);