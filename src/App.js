// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Notes from './components/NotesPage/Notes';
import About from './components/About';
import NoteState from './createcontext/Notes/NoteState';

function App() {
  return (
    <Router>
      <Navbar />
      <NoteState>
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/" element={<About />} />
      </Routes>
      </NoteState>
    </Router>
  );
}

export default App;
