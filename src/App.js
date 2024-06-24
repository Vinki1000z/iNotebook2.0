// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Notes from './components/NotesPage/Notes';
import Login from './components/AuthPage/Login';
import SignUp from './components/AuthPage/SignUp';
import About from './components/About';
import NoteState from './createcontext/Notes/NoteState';

function App() {
  return (
    <Router>
      <Navbar />
      <NoteState>
      <Routes>
        <Route path="/" element={<Login />} />        
        <Route path="/signup" element={<SignUp/>} />        
        <Route path="/home" element={<Notes />} />
        <Route path="/about" element={<About />} />        

      </Routes>
      </NoteState>
    </Router>
  );
}

export default App;
