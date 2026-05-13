import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-sky-400 text-white pt-24 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={logo} alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
            </div>
            <span className="text-2xl font-black italic text-white tracking-tighter uppercase">CV MAKER</span>
          </div>
          <p className="text-sm opacity-90 leading-relaxed font-bold italic max-w-xs uppercase tracking-tighter">
            Helping professionals build their careers through compelling resumes.
          </p>
        </div>
        <div>
          <h4 className="font-black mb-8 text-lg tracking-widest uppercase text-white/80">Product</h4>
          <ul className="space-y-5 text-sm font-bold opacity-90 uppercase">
            <li><Link to="/templates" className="hover:text-white transition">CV Templates</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black mb-8 text-lg tracking-widest uppercase text-white/80">Support</h4>
          <ul className="space-y-5 text-sm font-bold opacity-90 uppercase">
            <li><Link to="#" className="hover:text-white transition">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black mb-8 text-lg tracking-widest uppercase text-white/80">Resources</h4>
          <ul className="space-y-5 text-sm font-bold opacity-90 uppercase">
            <li><Link to="#" className="hover:text-white transition">ATS Tips</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black mb-8 text-lg tracking-widest uppercase text-white/80">Legal</h4>
          <ul className="space-y-5 text-sm font-bold opacity-90 uppercase">
            <li><Link to="#" className="hover:text-white transition">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 border-t border-white/20 pt-12 flex justify-between items-center text-[10px] font-black opacity-70 uppercase tracking-[0.3em]">
        <p>© 2026 CV Maker. All Right Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;