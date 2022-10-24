import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import LoadingPage from './LoadingPage';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      nameValue: '',
      isBtnDisabled: true,
      isLoading: false,
      apiData: [],
      searchBtn: false,
    };
  }

  handleChange = (event) => {
    const minimumLength = 2;
    const eventValue = event.target.value;
    if (eventValue.length >= minimumLength) {
      this.setState({
        nameValue: eventValue,
        isBtnDisabled: false,
      });
    } if (eventValue.length < minimumLength) {
      this.setState({
        isBtnDisabled: true,
      });
    }
  };

  handleClick = async () => {
    let { nameValue } = this.state;
    await this.setState({
      isLoading: true,
      apiData: [],
      searchBtn: true,
    });
    const apiResponse = await searchAlbumsAPI(nameValue);
    nameValue = '';
    this.setState({
      isLoading: false,
      apiData: apiResponse,
      searchBtn: true,
    });
  };

  render() {
    const {
      isBtnDisabled,
      searchBtn,
      nameValue,
      isLoading,
      apiData,
    } = this.state;
    return (
      <div data-testid="page-search">
        Search
        <Header />
        { isLoading ? (
          <LoadingPage />
        ) : (
          <form>
            <label htmlFor="name-input">
              Artista:
              <input
                data-testid="search-artist-input"
                id="name-input"
                type="text"
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="search-artist-button"
              onClick={ this.handleClick }
              disabled={ isBtnDisabled }
              type="button"
            >
              Pesquisar
            </button>
          </form>
        )}
        { searchBtn
          ? <div>{`Resultado de álbuns de: ${nameValue}`}</div>
          : null }

        { apiData.length > 0
          ? apiData.map((result, index) => (
            <li key={ index }>
              <Link
                to={ `/album/${result.collectionId}` }
                data-testid={ `link-to-album-${result.collectionId}` }
              >
                {result.collectionName}
              </Link>
            </li>
          ))
          : <p>Nenhum álbum foi encontrado</p> }
      </div>
    );
  }
}

export default Search;
