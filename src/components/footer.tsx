import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-sky-400 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row justify-between items-start mb-8 gap-10 lg:gap-0">
        {/* Logo Section */}
        <div className="w-full lg:w-1/4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={logo} alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
            </div>
            <span className="text-2xl font-bold text-white tracking-wide">CV MAKER</span>
          </div>
          <p className="text-sm text-white opacity-90 leading-snug italic max-w-[200px]">
            Helping professionals<br/>
            build their careers<br/>
            through compelling resumes.
          </p>
        </div>

        {/* Links Section */}
        <div className="w-full lg:w-1/2 flex flex-wrap lg:flex-nowrap justify-between gap-8 text-gray-900">
          <div>
            <h4 className="font-bold mb-4 text-sm">Product</h4>
            <ul className="space-y-3 text-xs font-medium">
              <li><Link to="/templates" className="hover:text-black transition">CV Templates</Link></li>
              <li><Link to="#" className="hover:text-black transition">Preview</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm">Support</h4>
            <ul className="space-y-3 text-xs font-medium">
              <li><Link to="#" className="hover:text-black transition">FAQ</Link></li>
              <li><Link to="#" className="hover:text-black transition">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm">Resources</h4>
            <ul className="space-y-3 text-xs font-medium">
              <li><Link to="#" className="hover:text-black transition">ATS-Friendly tips</Link></li>
              <li><Link to="#" className="hover:text-black transition">Design Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm">Legal</h4>
            <ul className="space-y-3 text-xs font-medium">
              <li><Link to="/privacy-policy" className="hover:text-black transition">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-black transition">Terms Of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Icons Section */}
        <div className="w-full lg:w-1/4 flex lg:justify-end gap-3 mt-4 lg:mt-0 items-start">
          <a href="#" className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-sm hover:opacity-90 transition">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center text-white shadow-sm hover:opacity-90 transition">
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0" className="w-4 h-4">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
            </svg>
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white shadow-sm hover:opacity-90 transition">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 border-t border-gray-900 pt-6 flex justify-start items-center text-xs font-medium text-gray-900">
        <p>© 2026 CV Maker. All Right Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;