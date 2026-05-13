import { useNavigate } from 'react-router-dom';

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
    <>
      {/* MAIN CONTENT ONLY - Navbar & Footer otomatis dipanggil dari Layout.tsx */}
      <div className="py-20 px-8">
        <h1 className="text-center text-5xl font-black text-sky-400 mb-16 tracking-widest uppercase italic">
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
                className="w-full h-[400px] bg-slate-50 flex items-center justify-center text-slate-400 font-medium p-4 text-center uppercase tracking-widest text-sm"
              >
                [ {item.title} ]
              </div>
              
              {/* Hover Overlay (Option buttons) */}
              <div className="absolute top-3 right-3 bg-white px-3 py-1.5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 flex items-center gap-3 border border-slate-100">
                <button className="text-slate-400 hover:text-yellow-400 transition" title="Edit">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                  </svg>
                </button>
                <button className="text-slate-400 hover:text-sky-500 transition" title="Options">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Project;