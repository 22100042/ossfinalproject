import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    textDecoration: 'none',
  };

  const navStyle = {
    display: 'flex',
    gap: '1rem',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#333',
  };

  return (
    <header style={headerStyle}>
      <div>
        {}
        <Link to="/" style={logoStyle}>
          Pohang Hospital Explorer
        </Link>
      </div>
      <nav style={navStyle}>
        <Link to="/search" style={linkStyle}>
          Search Hospitals
        </Link>
        <Link to="/reviews" style={linkStyle}>
          Submit Review
        </Link>
        <Link to="/reservations" style={linkStyle}>
          Reservations
        </Link>
      </nav>
    </header>
  );
}

export default Header;
