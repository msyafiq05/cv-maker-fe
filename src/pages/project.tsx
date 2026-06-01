import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { projectApi } from '../services/api';

interface CvProject {
  id: number;
  judul_cv: string;
  template_id: number | null;
  created_at: string;
}

const Project = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [projects, setProjects]   = useState<CvProject[]>([]);
  const [loading, setLoading]     = useState(true);
  const [creating, setCreating]   = useState(false);
  const [error, setError]         = useState('');

  // ─── Scroll to top if location state has scrollToTop ───────────
  useEffect(() => {
    if (location.state?.scrollToTop) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // ─── Ambil semua CV project milik user ───────────────────────
  useEffect(() => {
    projectApi.getAll()
      .then((res) => setProjects(res.data))
      .catch(() => setError('Gagal memuat project. Pastikan kamu sudah login.'))
      .finally(() => setLoading(false));
  }, []);

  // ─── Buat CV project baru ────────────────────────────────────
  const handleCreateNew = async () => {
    setCreating(true);
    try {
      const res = await projectApi.create({ judul_cv: 'Untitled Resume' });
      const newProject: CvProject = res.data;
      navigate('/edit', { state: { projectId: newProject.id } });
    } catch {
      setError('Gagal membuat project baru.');
    } finally {
      setCreating(false);
    }
  };

  // ─── Hapus CV project ────────────────────────────────────────
  const handleDelete = async (e: React.MouseEvent, projectId: number) => {
    e.stopPropagation();
    if (!confirm('Yakin ingin menghapus CV ini?')) return;

    try {
      await projectApi.delete(projectId);
      setProjects(prev => prev.filter(p => p.id !== projectId));
    } catch {
      alert('Gagal menghapus project.');
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
      <div className="py-20 px-8">
        <h1 className="text-center text-5xl font-black text-sky-400 mb-4 tracking-widest uppercase italic">
          YOUR PROJECT
        </h1>

        {error && (
          <p className="text-center text-red-400 mb-8">{error}</p>
        )}

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {/* Tombol Buat CV Baru */}
          <div
            onClick={handleCreateNew}
            className="relative group cursor-pointer border-2 border-dashed border-sky-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
          >
            <div className="w-full h-[400px] bg-sky-50 flex flex-col items-center justify-center text-sky-300 hover:text-sky-400 transition gap-3">
              {creating ? (
                <div className="w-8 h-8 border-4 border-sky-300 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4"></path>
                  </svg>
                  <span className="font-semibold text-sm uppercase tracking-widest">Buat CV Baru</span>
                </>
              )}
            </div>
          </div>

          {/* Daftar CV yang sudah ada */}
          {projects.map((item) => (
            <div
              key={item.id}
              className="relative group cursor-pointer border-2 border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
            >
              <div
                onClick={() => navigate('/edit', { state: { projectId: item.id } })}
                className="w-full h-[400px] bg-slate-50 flex flex-col items-center justify-center text-slate-400 font-medium p-4 text-center gap-3"
              >
                {/* Icon CV */}
                <svg className="w-16 h-16 text-sky-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span className="uppercase tracking-widest text-sm">{item.judul_cv}</span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute top-3 right-3 bg-white px-3 py-1.5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 flex items-center gap-3 border border-slate-100">
                {/* Edit */}
                <button
                  onClick={() => navigate('/edit', { state: { projectId: item.id } })}
                  className="text-slate-400 hover:text-sky-500 transition"
                  title="Edit"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                {/* Hapus */}
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className="text-slate-400 hover:text-red-500 transition"
                  title="Hapus"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
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