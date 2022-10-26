import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import LoadingPage from './LoadingPage';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      isLoading: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const apiUser = await getUser();
    this.setState({ isLoading: false });
    this.setState({ userData: apiUser });
  }

  render() {
    const { isLoading, userData } = this.state;
    return (
      <div data-testid="page-profile">
        Profile
        <Header />
        { isLoading ? (
          <LoadingPage />
        ) : (
          <div>
            <div>
              <img
                data-testid="profile-image"
                src={ userData.image }
                alt={ userData.name }
              />
            </div>
            <div>
              {userData.name}
            </div>
            <div>
              {userData.email}
            </div>
            <div>
              {userData.description}
            </div>
            <div>
              <Link to="/profile/edit">
                Editar perfil
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
