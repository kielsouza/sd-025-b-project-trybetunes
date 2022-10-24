import React, { Component } from 'react';
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
          : (<p data-testid="header-user-name">{ userObj.name }</p>) }
      </header>
    );
  }
}
export default Header;
