import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { REACTIONS } from '../../../constants';

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
      animation: 'x 0.45s ease',
      animationName: inHoverAnimation,
      animationFillMode: 'forwards',
    },
  },
};

export class ReactionImage extends Component {

  constructor(props) {
    super(props);
  }

  onClick = () => {
    const {
      onClick,
      type,
    } = this.props;
    onClick(type);
  };

  render() {
    const {
      onClick,
    } = this;

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
      }}
           onClick={onClick}
      >
        <img src={src} alt={alt} style={style}/>
      </div>
    );
  }

}

ReactionImage.propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(REACTIONS)),
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

ReactionImage.defaultProps = {};

export default Radium(ReactionImage);