import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favArray: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  componentDidUpdate() {
    this.getFavorites();
  }

  getFavorites = async () => {
    const apiResponse = await getFavoriteSongs();
    this.setState({
      favArray: apiResponse,
    });
    const savedArr = JSON.parse(localStorage.getItem('favorite_songs'));
    this.setState({
      favArray: savedArr,
    });
  };

  render() {
    const { favArray } = this.state;
    return (
      <div data-testid="page-favorites">
        Favorites
        <Header />
        <div>
          {favArray.map((result) => (
            <div key={ result.trackId }>
              <MusicCard
                songObj={ result }
                songName={ result.trackName }
                preview={ result.previewUrl }
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Favorites;
