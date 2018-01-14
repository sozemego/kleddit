import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getReactionsForSubmission } from '../../selectors';

import dislike from './reactions/dislike.png';
import hate from './reactions/hate.png';
import laugh from './reactions/laugh.png';
import like from './reactions/like.png';
import love from './reactions/love.png';
import poop from './reactions/poop.png';
import { REACTIONS } from '../../constants';
import { Chip } from 'material-ui';
import ReactionImage from './reactions/ReactionImage';

const reactionImages = {
  [REACTIONS.DISLIKE]: dislike,
  [REACTIONS.HATE]: hate,
  [REACTIONS.LAUGH]: laugh,
  [REACTIONS.LIKE]: like,
  [REACTIONS.LOVE]: love,
  [REACTIONS.POOP]: poop,
};

const styles = {
  reactionContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    margin: '4px',
  },
  reactionImage: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
};

styles.hoveredReactionImage = Object.assign({}, styles.reactionImage, {
  width: '20px',
  height: '20px',
});

export class Reactions extends Component {

  constructor(props) {
    super(props);
  }

  getPath = (reaction) => reactionImages[reaction];

  createReactions = () => {
    const { getPath } = this;
    const {
      reactions,
    } = this.props;

    return Object.keys(REACTIONS).map((key) => {
      return <div key={key}
                  style={styles.reactionContainer}
      >
        <ReactionImage src={getPath(key)} alt={key}/>
        <span>{reactions[key] || 0}</span>
      </div>;
    });

  };

  render() {
    const { createReactions } = this;

    return (
      <Chip style={{ margin: '2px' }}
            labelStyle={{
              display: 'flex',
              flexDirection: 'row',
            }}>
        {createReactions()}
      </Chip>
    );
  }

}

Reactions.propTypes = {
  submissionId: PropTypes.string.isRequired,
};

Reactions.defaultProps = {};

const mapStateToProps = (state, { submissionId }) => {
  return {
    reactions: getReactionsForSubmission(state, submissionId),
  };
};

export default connect(mapStateToProps, null)(Reactions);

