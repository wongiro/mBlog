import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About/About';
import AddBlog from './pages/Add Blog/AddBlog';
import NotFound from './pages/NotFound';
import Header from './components/Header/Header';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import Details from './pages/Details/Details';

import './style.css';
import './mediaQuerry.css';
import Auth from './pages/Auth/Auth';

function App() {

  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogOut = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive('login');
    })
    navigate('auth'); 
  };

  return (
    <div className="App">
    <Header  setActive={setActive} active={active} user={user} handleLogOut={handleLogOut}/>
     <Routes>
        <Route path="/" element={<Home />} setActive={setActive} user={user}/>
        <Route path="/details/:id" element={<Details setActive={setActive} />} />
        <Route path="/about" element={<About />} />
        <Route path="/update/:id" element={user?.uid ? <AddBlog user={user} setActive={setActive} /> : <Navigate to="/" />} />
        <Route path="/add-blog" element={user?.uid ? <AddBlog user={user} /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/auth" element={<Auth setActive={setActive}/>} />
     </Routes>
    </div>
  );
}

export default App;
