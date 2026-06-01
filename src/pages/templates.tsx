import { useNavigate } from 'react-router-dom';
import BlackWhiteTemplates from '../components/templates/BlackWhiteTemplates';

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
    <>
      {/* MAIN CONTENT ONLY - Navbar & Footer ditangani oleh Layout.tsx */}
      <main className="py-20 px-8">
        <h1 className="text-center text-5xl font-black text-sky-400 mb-16 tracking-widest uppercase italic">
          TEMPLATE
        </h1>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {templateData.map((item) => (
            <div 
              key={item.id} 
              onClick={() => navigate('/edit', { state: { templateId: item.id } })}
              className="group cursor-pointer relative"
            >
              {/* Gambar Template & Hover Effect */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border-4 border-slate-100 shadow-md group-hover:shadow-2xl group-hover:border-sky-300 transition-all duration-300">
                {item.id === 2 ? (
                  <div className="pointer-events-none absolute top-0 left-0 w-[800px] h-[1130px]" style={{ transform: 'scale(0.29)', transformOrigin: 'top left' }}>
                    <BlackWhiteTemplates />
                  </div>
                ) : (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                
                {/* Overlay Biru Transparan saat Hover */}
                <div className="absolute inset-0 bg-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white px-8 py-3 rounded-full font-black text-sky-500 shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform uppercase tracking-widest text-sm">
                    Use Template
                  </div>
                </div>
              </div>
              
              {/* Judul Template */}
              <p className="mt-6 text-center font-black text-slate-600 group-hover:text-sky-500 transition-colors uppercase text-sm tracking-widest">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Templates;