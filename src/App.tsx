import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';

import LandingPage from './pages/landingpage';
import Login from './pages/login';
import Templates from './pages/templates';
import Project from './pages/project';
import EditCV from './pages/editcv';
import Profile from './pages/profile';
import PrivacyPolicy from './pages/privacypolicy';
import ForgotPassword from './pages/forgotpassword';
import Signup from './pages/signup';

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
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Route>

        {/* Halaman Login */}
        <Route path="/login" element={<Login />} />

        {/* Halaman Forgot Password */}
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Halaman Sign Up */}
        <Route 
          path="/signup" 
          element={<Signup />} // <-- 2. TAMBAH ROUTE SIGNUP DI SINI
        />

      </Routes>
    </Router>
  );
}

export default App;