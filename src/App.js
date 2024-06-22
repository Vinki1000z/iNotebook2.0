// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Notes from './components/Notes';
import About from './components/About';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
