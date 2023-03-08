import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({active, setActive}) => {
  return (
    <nav className='navbar'>
      <div className='navbar-buttons'> 
        <div className='navbar-list'>
          <ul className='navbar-list-items'>
            <Link to="/">
                <li className={'${active === "home" ? "active" : ""}'} onClick={()=> setActive("home")}>Home</li>
            </Link>
            <Link to="/add-blog">
                <li className={'${active === "create" ? "active" : ""}'} onClick={()=> setActive("create")}>Create Blog</li>
            </Link>
            <Link to="/about">
                <li className={'${active === "about" ? "active" : ""}'} onClick={()=> setActive("about")}>About</li>
            </Link>
          </ul>
        </div>
        <div className='navbar-login'>
          <ul className='navbar-login-items'>
            <Link to="/auth">
                <li className={'${active === "sign in" ? "active" : ""}'} onClick={()=> setActive("sign in")}>Sign In</li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
