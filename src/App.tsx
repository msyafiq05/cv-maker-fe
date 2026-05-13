import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout'; 
import LandingPage from './pages/landingpage';
import Login from './pages/login'; // Pastikan import ini ada
import Templates from './pages/templates';
import Project from './pages/project';
import EditCV from './pages/editcv';
import Profile from './pages/profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/project" element={<Project />} />
          <Route path="/edit" element={<EditCV />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Halaman Login asli King di sini */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;