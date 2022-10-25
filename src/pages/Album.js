import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      apiMusics: [],
      artistName: '',
      albumName: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const apiResponse = await getMusics(id);
    this.setState({
      apiMusics: apiResponse,
      artistName: apiResponse[0].artistName,
      albumName: apiResponse[0].collectionName,
    });
  }

  render() {
    const {
      apiMusics,
      artistName,
      albumName,
    } = this.state;
    return (
      <div data-testid="page-album">
        Album
        <Header />
        <div key="artist-and-collection">
          <h4 data-testid="artist-name">{ artistName }</h4>
          <h4 data-testid="album-name">{ albumName }</h4>
          {
            apiMusics.map((result, index) => (
              index > 0
                ? (
                  <div key={ (index + 1) }>
                    <MusicCard
                      songObj={ result }
                      songName={ result.trackName }
                      preview={ result.previewUrl }
                      trackId={ result.trackId }
                    />
                  </div>
                ) : null
            ))
          }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
