import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import LoadingPage from '../pages/LoadingPage';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favCheck: false,
    };
  }

  async componentDidMount() {
    const { songObj } = this.props;
    const favSongs = await getFavoriteSongs();
    this.setState({
      favCheck: favSongs.some((obj) => obj.trackId === songObj.trackId) });
  }

  favClick = async ({ target }) => {
    const { checked } = target;
    const { songObj } = this.props;
    if (checked) {
      this.setState({ isLoading: true, favCheck: checked });
      await addSong(songObj);
      this.setState({
        isLoading: false,
      });
    } if (!checked) {
      this.setState({ isLoading: true, favCheck: checked });
      await removeSong(songObj);
      this.setState({
        isLoading: false,
      });
    }
  };

  render() {
    const { isLoading, favCheck } = this.state;
    const { songObj, songName } = this.props;
    const { preview, trackId } = songObj;
    return (
      <div>
        { isLoading ? (
          <LoadingPage />
        ) : (
          <div>
            <p>{songName}</p>
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
  songName: PropTypes.string.isRequired,
  songObj: shape({
    preview: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
