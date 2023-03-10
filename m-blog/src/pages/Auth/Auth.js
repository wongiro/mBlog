import React, { useState } from 'react';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import './Auth.css';

const initialState = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const Auth = ({ setActive }) => {
  const [state, setState] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(false);

  const { email, password, userName, confirmPassword } = state;
  const navigate = useNavigate();

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleAuth = async (event) => {
    event.preventDefault();

    if (!isSignUp) {
        if(email && password){
                const { user } = await signInWithEmailAndPassword(auth, email, password);
                setActive('home');
        }else{
            alert('Please fill all the fields');
        }
    } else {
      if (password !== confirmPassword) {
        alert("Password doesn't match");
      } else if (userName && email && password && confirmPassword) {
       // try {
          const { user } = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(user, { displayName: userName });
          setActive('home');
       /* } catch (error) {
          alert(error.message);
        } */
      } else {
        alert('Please fill all the fields');
      }
    }

    navigate('/');
  };

  return (
    <div className="container">
      <div className="auth">
        <div className="auth-form">{!isSignUp ? 'Sign In' : 'Sign Up'}</div>
        <div className="authentication-form">
          <form className="form" onSubmit={handleAuth}>
            <div className="form-input">
              {isSignUp && (
                <>
                  <input
                    type="text"
                    placeholder="Username"
                    name="userName"
                    value={userName}
                    onChange={handleChange}
                  />
                </>
              )}
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
              {isSignUp && (
                <>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                </>
              )}
            </div>
            <div>
              <button className={`button-btn ${!isSignUp ? 'btn-sign-up' : ''}`} type="submit">
                {!isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </form>
          <div>
            {!isSignUp ? (
              <>
                <div>
                  <p>
                    Don't have an account?{' '}
                    <span onClick={() => setIsSignUp(true)}>Sign Up</span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p>
                    Already have an account?{' '}
                    <span onClick={() => setIsSignUp(false)}>Sign In</span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;