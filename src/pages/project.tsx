import { Link, useNavigate } from 'react-router-dom';

const Project = () => {
  const navigate = useNavigate();

  // Data dummy project, nanti bisa ditarik dari database/state
  const projectData = [
    { id: 1, title: 'My CV Project 1' },
    { id: 2, title: 'My CV Project 2' },
    { id: 3, title: 'My CV Project 3' },
    { id: 4, title: 'My CV Project 4' },
    { id: 5, title: 'My CV Project 5' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
      {/* NAVBAR */}
      <nav className="bg-sky-400 px-8 py-4 flex items-center justify-between shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 border-2 border-white rounded-lg flex items-center justify-center text-white font-bold text-xl italic">
            CV
          </div>
          <span className="text-2xl font-bold text-white tracking-tight uppercase">CV MAKER</span>
        </div>
        <div className="flex items-center gap-8 font-semibold text-slate-800">
          <Link to="/" className="hover:text-white transition text-sm text-slate-700">Home</Link>
          <Link to="#" className="hover:text-white transition text-sm text-slate-700">About us</Link>
          <Link to="/templates" className="hover:text-white transition text-sm text-slate-700">Template</Link>
          <Link to="/project" className="hover:text-white transition text-sm underline underline-offset-4 font-bold">Project</Link>
          
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
          YOUR PROJECT
        </h1>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {projectData.map((item) => (
            <div 
              key={item.id} 
              className="relative group cursor-pointer border-2 border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
            >
              {/* Placeholder Gambar Project CV */}
              <div 
                onClick={() => navigate('/edit')} 
                className="w-full h-[400px] bg-slate-50 flex items-center justify-center text-slate-400 font-medium p-4 text-center"
              >
                [ {item.title} ]
              </div>
              
              {/* Hover Overlay (Option buttons) */}
              <div className="absolute top-3 right-3 bg-white px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 flex items-center gap-3 border border-slate-100">
                <button className="text-slate-600 hover:text-yellow-400 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                  </svg>
                </button>
                <button className="text-slate-600 hover:text-sky-500 transition">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  </svg>
                </button>
              </div>
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
        <div className="max-w-7xl mx-auto px-8 border-t border-white/30 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold uppercase tracking-widest">
          <p className="opacity-70">© 2026 CV Maker. All Right Reserved</p>
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

export default Project;