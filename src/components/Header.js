import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import LoadingPage from '../pages/LoadingPage';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      userObj: '',
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const userObj = await getUser();
    this.setState({ userObj });
    this.setState({ isLoading: false });
  }

  render() {
    const { userObj, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        { isLoading ? <LoadingPage />
          : (
            <>
              <p data-testid="header-user-name">{ userObj.name }</p>
              <nav id="nav-links">
                <ul>
                  <li>
                    <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
                  </li>
                  <li>
                    <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
                  </li>
                  <li>
                    <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
                  </li>
                </ul>
              </nav>
            </>
          ) }
      </header>
    );
  }
}
export default Header;
