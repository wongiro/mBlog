import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AddBlog from './pages/AddBlog';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
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
