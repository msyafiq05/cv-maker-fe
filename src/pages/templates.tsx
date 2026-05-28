// src/pages/templates.tsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { templateApi, projectApi } from '../services/api';

interface Template {
  id: number;
  nama_template: string;
  gambar_preview: string | null;
}

const Templates = () => {
  const navigate = useNavigate();

  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading]     = useState(true);
  const [creating, setCreating]   = useState<number | null>(null); // id template yang sedang diproses

  useEffect(() => {
    templateApi.getAll()
      .then((res) => setTemplates(res.data))
      .catch(() => {
        // Jika API gagal (misal belum ada data), tampilkan template dummy
        setTemplates([
          { id: 1, nama_template: 'Professional Blue',   gambar_preview: null },
          { id: 2, nama_template: 'Minimalist Black',    gambar_preview: null },
          { id: 3, nama_template: 'Modern Creative',     gambar_preview: null },
          { id: 4, nama_template: 'ATS Friendly',        gambar_preview: null },
          { id: 5, nama_template: 'Executive Elegance',  gambar_preview: null },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  // ─── Klik template → buat project baru dengan template ini ──
  const handleSelectTemplate = async (templateId: number) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    setCreating(templateId);
    try {
      const res = await projectApi.create({
        judul_cv:    'Untitled Resume',
        template_id: templateId,
      });
      navigate('/edit', { state: { projectId: res.data.id, templateId } });
    } catch {
      alert('Gagal membuat project. Pastikan kamu sudah login.');
    } finally {
      setCreating(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-40">
        <div className="w-10 h-10 border-4 border-sky-300 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <main className="py-20 px-8">
        <h1 className="text-center text-5xl font-black text-sky-400 mb-16 tracking-widest uppercase italic">
          TEMPLATE
        </h1>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {templates.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectTemplate(item.id)}
              className="group cursor-pointer relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border-4 border-slate-100 shadow-md group-hover:shadow-2xl group-hover:border-sky-300 transition-all duration-300">
                {item.gambar_preview ? (
                  <img
                    src={item.gambar_preview}
                    alt={item.nama_template}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  // Placeholder jika tidak ada gambar
                  <div className="w-full h-full bg-gradient-to-br from-sky-50 to-slate-100 flex items-center justify-center">
                    <svg className="w-20 h-20 text-sky-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                )}

                {/* Overlay saat hover */}
                <div className="absolute inset-0 bg-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {creating === item.id ? (
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <div className="bg-white px-8 py-3 rounded-full font-black text-sky-500 shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform uppercase tracking-widest text-sm">
                      Use Template
                    </div>
                  )}
                </div>
              </div>
              
              <p className="mt-6 text-center font-black text-slate-600 group-hover:text-sky-500 transition-colors uppercase text-sm tracking-widest">
                {item.nama_template}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Templates;