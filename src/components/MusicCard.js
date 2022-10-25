import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import LoadingPage from '../pages/LoadingPage';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favCheck: false,
      favSongs: [],
    };
  }

  favClick = async ({ target }) => {
    const { checked } = target;
    const { songObj } = this.props;
    const { favSongs } = this.state;
    this.setState({ isLoading: true, favCheck: checked });
    const apiMusic = await addSong(songObj);
    this.setState({
      isLoading: false,
      favSongs: [...favSongs, apiMusic],
    });
  };

  render() {
    const { isLoading, favCheck } = this.state;
    const { songObj } = this.props;
    const { songName, preview, trackId } = songObj;
    return (
      <div>
        { isLoading ? (
          <LoadingPage />
        ) : (
          <div>
            <p>{ songName }</p>
            <audio data-testid="audio-component" src={ preview } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
            </audio>
            <label htmlFor="favorite-input">
              ❤
              <input
                id="favorite-input"
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.favClick }
                checked={ favCheck }
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  songObj: shape({
    songName: PropTypes.string,
    preview: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
