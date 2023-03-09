import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ active, setActive, user, handleLogOut }) => {
  const userId = user?.uid;
  console.log('userId', userId);
  console.log('name', user?.displayName);

  return (
    <nav className="navbar">
      <div className="navbarButtons">
        <div className="navbarList">
          <ul className="navbarListItems">
            <Link to="/">
              <li
                className={`${active === 'home' ? active : ''}`}
                onClick={() => setActive('home')}
              >
                Home
              </li>
            </Link>
            <Link to="/add-blog">
              <li
                className={`${active === 'create' ? active : ''}`}
                onClick={() => setActive('create')}
              >
                Create Blog
              </li>
            </Link>
            <Link to="/about">
              <li
                className={`${active === 'about' ? active : ''}`}
                onClick={() => setActive('about')}
              >
                About
              </li>
            </Link>
          </ul>
        </div>
        <div className="navbarLogin">
          <ul className="navbarLoginItems">
            {userId ? (
              <>
                <div className="profile">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="profile"
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      marginTop: '0',
                    }}
                  />
                </div>
                <p /*style={{ marginTop: '10px', marginLeft: '10px' }}*/>
                  {user?.displayName}
                </p>
                <li className="logout" onClick={handleLogOut}>
                  Logout
                </li>
              </>
            ) : (
              <Link to="/auth">
                <li
                  className={`${active === 'sign in' ? active : ''}`}
                  onClick={() => setActive('sign in')}
                >
                  Sign In
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
