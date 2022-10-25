import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { songName, preview } = this.props;
    return (
      <div>
        <p>{ songName }</p>
        <audio data-testid="audio-component" src={ preview } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  songName: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
};

export default MusicCard;
