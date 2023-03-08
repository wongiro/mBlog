import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({active, setActive}) => {
  return (
    <nav className='navbar'>
      <div className='navbar-buttons'> 
        <div className='navbar-list'>
          <ul className='navbar-list-items'>
            <Link to="/" onClick={()=> setActive("home")}>
                <li>Home</li>
            </Link>
            <Link to="/add-blog" onClick={()=> setActive("create")}>
                <li >Create Blog</li>
            </Link>
            <Link to="/about" onClick={()=> setActive("about")}>
                <li>About</li>
            </Link>
          </ul>
        </div>
        <div className='navbar-login'>
          <ul className='navbar-login-items'>
            <Link to="/login" onClick={()=> setActive("login")}>
                <li>Login</li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
