import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginButton from './Login';
import LogoutButton from './Logout';
import { withAuth0 } from '@auth0/auth0-react';

class Header extends React.Component {
  render() {
    const {isAuthenticated} = this.props.auth0;
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        <NavItem><Link to="/about" className="nav-link">About</Link></NavItem>
        {isAuthenticated && <NavItem ><Link to="/profile" className="nav-link">Profile</Link></NavItem>}
        
        {/* PLACEHOLDER: render a navigation link to the about page */}
        {isAuthenticated ? <LogoutButton/> : <LoginButton/>}
      
      </Navbar>
    );
  }
}

export default withAuth0(Header);
