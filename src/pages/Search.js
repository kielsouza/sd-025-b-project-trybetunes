import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      isBtnDisabled: true,
    };
  }

  handleChange = (event) => {
    const minimumLength = 2;
    const eventValue = event.target.value;
    if (eventValue.length >= minimumLength) {
      this.setState({
        isBtnDisabled: false,
      });
    } if (eventValue.length < minimumLength) {
      this.setState({
        isBtnDisabled: true,
      });
    }
  };

  render() {
    const { isBtnDisabled } = this.state;
    return (
      <div data-testid="page-search">
        Search
        <Header />
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
            disabled={ isBtnDisabled }
            type="button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
