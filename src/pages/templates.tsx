// src/pages/templates.tsx

import { useNavigate } from 'react-router-dom';

const Templates = () => {
  const navigate = useNavigate();

  const templateData = [
    { id: 1, name: 'Professional Blue' },
    { id: 2, name: 'Minimalist Black' },
    { id: 3, name: 'Modern Creative' },
    { id: 4, name: 'ATS Friendly' },
    { id: 5, name: 'Executive Elegance' },
  ];

  return (
    <>
      {/* MAIN CONTENT ONLY - Navbar & Footer otomatis dipanggil dari Layout.tsx */}
      <div className="py-20 px-8">
        <h1 className="text-center text-5xl font-black text-sky-400 mb-16 tracking-widest uppercase italic">
          TEMPLATE
        </h1>
        
        {/* Grid layout disamakan persis dengan project.tsx */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {templateData.map((item) => (
            <div 
              key={item.id} 
              className="relative group cursor-pointer border-2 border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
            >
              {/* Placeholder Gambar & Teks di Dalam Card - Mengikuti style project.tsx */}
              <div 
                onClick={() => navigate('/edit', { state: { templateId: item.id } })} 
                className="w-full h-[400px] bg-slate-50 flex items-center justify-center text-slate-400 font-medium p-4 text-center uppercase tracking-widest text-sm transition group-hover:bg-slate-100/50"
              >
                [ {item.name} ]
              </div>
              
              {/* Hover Overlay: Menampilkan tombol "Use Template" yang manis khas menu pemilihan template */}
              <div 
                onClick={() => navigate('/edit', { state: { templateId: item.id } })}
                className="absolute inset-0 bg-sky-500/10 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center pointer-events-none"
              >
                <div className="bg-white text-sky-500 px-5 py-2 rounded-xl font-bold shadow-md text-xs uppercase tracking-wider border border-sky-100">
                  Use Template
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Templates;