import './App.css';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AddBlog from './pages/AddBlog';
import NotFound from './pages/NotFound';
import Header from './components/Header/Header';

import './style.css';
import './mediaQuerry.css';

function App() {

  const [active, setActive] = useState("home");

  return (
    <div className="App">
    <Header  setActive={setActive} active={active}/>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="*" element={<NotFound />} />
     </Routes>
    </div>
  );
}

export default App;
