import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import Layout from './components/layout';

import LandingPage from './pages/landingpage';
import Login from './pages/login';
import Register from './pages/register';
import Templates from './pages/templates';
import Project from './pages/project';
import Profile from './pages/profile';
import PrivacyPolicy from './pages/privacypolicy';
import ForgotPassword from './pages/forgotpassword';
import Signup from './pages/signup';
import FAQ from './pages/faq';
import ContactUs from './pages/contactus';
import AtsTips from './pages/atstips';
import DesignGuide from './pages/designguide';
import TermsOfService from './pages/termsofservice';
import AdminDashboard from './pages/admin'; 

import EditCvStep1 from './pages/EditCvStep1';
import EditCvStep2 from './pages/EditCvStep2';
import EditCvStep3 from './pages/EditCvStep3';
import EditCvStep4 from './pages/EditCvStep4';
import EditCvStep5 from './pages/EditCvStep5';
import DownloadCv from './pages/DownloadCv';
import { CvEditProvider } from './context/CvEditContext';

const CvEditProviderWrapper = () => (
  <CvEditProvider>
    <Outlet />
  </CvEditProvider>
);

const EditRedirect = () => {
  const location = useLocation();
  return <Navigate to="/edit/step1" state={location.state} replace />;
};

function App() {
  return (
    <Router>
      <Routes>

        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/project" element={<Project />} />
          
          {/* CV Edit Steps */}
          <Route element={<CvEditProviderWrapper />}>
            <Route path="/edit" element={<EditRedirect />} />
            <Route path="/edit/step1" element={<EditCvStep1 />} />
            <Route path="/edit/step2" element={<EditCvStep2 />} />
            <Route path="/edit/step3" element={<EditCvStep3 />} />
            <Route path="/edit/step4" element={<EditCvStep4 />} />
            <Route path="/edit/step5" element={<EditCvStep5 />} />
            <Route path="/edit/download" element={<DownloadCv />} />
          </Route>

          <Route path="/profile" element={<Profile />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/ats-tips" element={<AtsTips />} />
          <Route path="/design-guide" element={<DesignGuide />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Route>

        {/* Halaman Login & Register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Halaman Forgot Password */}
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        {/* Halaman Sign Up */}
        <Route 
          path="/signup" 
          element={<Signup />}
        />

        {/* Halaman Admin Dashboard */}
        <Route 
          path="/admin/dashboard" 
          element={<AdminDashboard />} 
        />

      </Routes>
    </Router>
  );
}

export default App;