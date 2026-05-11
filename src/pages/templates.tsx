import { Link, useNavigate } from 'react-router-dom';

const Templates = () => {
  const navigate = useNavigate();

  const templateData = [
    { id: 1, name: 'Professional Blue', image: 'https://via.placeholder.com/400x600' },
    { id: 2, name: 'Minimalist Black', image: 'https://via.placeholder.com/400x600' },
    { id: 3, name: 'Modern Creative', image: 'https://via.placeholder.com/400x600' },
    { id: 4, name: 'ATS Friendly', image: 'https://via.placeholder.com/400x600' },
    { id: 5, name: 'Executive Elegance', image: 'https://via.placeholder.com/400x600' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
      {/* NAVBAR */}
      <nav className="bg-sky-400 px-8 py-4 flex items-center justify-between shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 border-2 border-white rounded-lg flex items-center justify-center text-white font-bold text-xl italic">
            CV
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">CV MAKER</span>
        </div>
        <div className="flex items-center gap-8 font-semibold text-slate-800">
          <Link to="/" className="hover:text-white transition text-sm">Home</Link>
          <Link to="#" className="hover:text-white transition text-sm">About us</Link>
          <Link to="/templates" className="hover:text-white transition text-sm underline underline-offset-4">Template</Link>
          <Link to="/project" className="hover:text-white transition text-sm">Project</Link>
          
          {/* PROFILE CLICK AREA */}
          <div 
            onClick={() => navigate('/profile')} 
            className="flex items-center gap-2 cursor-pointer group ml-4"
          >
            <div className="w-10 h-10 bg-white rounded-full border-2 border-slate-200 overflow-hidden group-hover:border-slate-400 transition shadow-sm">
              <img 
                src="https://via.placeholder.com/150" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <svg className="w-4 h-4 text-slate-800 group-hover:translate-y-0.5 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="grow py-20 px-8">
        <h1 className="text-center text-5xl font-bold text-sky-400 mb-16 tracking-widest uppercase">
          TEMPLATE
        </h1>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {templateData.map((item) => (
            <div 
              key={item.id} 
              onClick={() => navigate('/edit', { state: { templateId: item.id } })}
              className="group cursor-pointer relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-slate-100 shadow-md group-hover:shadow-2xl group-hover:border-sky-300 transition-all duration-300">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white px-6 py-2 rounded-full font-bold text-sky-500 shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform">
                    Use Template
                  </div>
                </div>
              </div>
              <p className="mt-4 text-center font-bold text-slate-600 group-hover:text-sky-500 transition-colors uppercase text-sm tracking-wider">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-sky-400 text-white pt-16 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 border-2 border-white rounded-lg flex items-center justify-center font-bold italic">CV</div>
              <span className="text-xl font-bold italic tracking-tighter">CV MAKER</span>
            </div>
            <p className="text-sm opacity-90 leading-relaxed italic max-w-xs font-bold">
              Helping professionals build their careers through compelling resumes.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-lg tracking-tight">Product</h4>
            <ul className="space-y-3 text-sm opacity-80 font-medium">
              <li><Link to="/templates" className="hover:text-white transition">CV Templates</Link></li>
              <li><Link to="#" className="hover:text-white transition">Preview</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-lg tracking-tight">Support</h4>
            <ul className="space-y-3 text-sm opacity-80 font-medium">
              <li><Link to="#" className="hover:text-white transition">FAQ</Link></li>
              <li><Link to="#" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-lg tracking-tight">Resources</h4>
            <ul className="space-y-3 text-sm opacity-80 font-medium">
              <li><Link to="#" className="hover:text-white transition">ATS-Friendly tips</Link></li>
              <li><Link to="#" className="hover:text-white transition">Design Guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-lg tracking-tight">Legal</h4>
            <ul className="space-y-3 text-sm opacity-80 font-medium">
              <li><Link to="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition">Terms Of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 border-t border-white/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold">
          <p className="opacity-70 uppercase tracking-widest">© 2026 CV Maker. All Right Reserved</p>
          <div className="flex gap-4">
            <div className="p-2 border border-white/30 rounded-full hover:bg-white/10 transition cursor-pointer">IG</div>
            <div className="p-2 border border-white/30 rounded-full hover:bg-white/10 transition cursor-pointer">IN</div>
            <div className="p-2 border border-white/30 rounded-full hover:bg-white/10 transition cursor-pointer">X</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Templates;