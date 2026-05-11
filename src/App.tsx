import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingpage';
import Login from './pages/login';
import Templates from './pages/templates';
import Project from './pages/project';
import EditCV from './pages/editcv';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/project" element={<Project />} />
        <Route path="/edit" element={<EditCV />} />
      </Routes>
    </Router>
  );
}

export default App;