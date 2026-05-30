import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Data Dummy untuk Tabel (Sesuai Mockup Figma)
const initialTemplates = [
  { id: 1, name: 'CAHAYA', author: 'Admin User', date: '2026-02-00', status: 'Active', img: 'https://via.placeholder.com/40x55?text=CV1' },
  { id: 2, name: 'KETUT SUSILO', author: 'Admin User', date: '2026-05-18', status: 'Active', img: 'https://via.placeholder.com/40x55?text=CV2' },
  { id: 3, name: 'SAMIRA HADID', author: 'Admin User', date: '2026-03-22', status: 'Active', img: 'https://via.placeholder.com/40x55?text=CV3' },
  { id: 4, name: 'SAMIRA HADID', author: 'Admin User', date: '2026-03-18', status: 'Active', img: 'https://via.placeholder.com/40x55?text=CV4' },
  { id: 5, name: 'SAMIRA HADID', author: 'Admin User', date: '2026-03-16', status: 'Active', img: 'https://via.placeholder.com/40x55?text=CV5' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState(initialTemplates);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex w-full min-h-screen bg-[#f3f9fd] font-sans antialiased select-none">
      
      {/* ========================================================= */}
      {/* 1. SIDEBAR (SISI KIRI)                                    */}
      {/* ========================================================= */}
      <aside className="w-[260px] bg-[#3fa2f6] flex flex-col justify-between text-white flex-shrink-0 sticky top-0 h-screen shadow-lg">
        <div>
          {/* Header Sidebar / Logo */}
          <div className="p-6 flex items-center space-x-3 border-b border-blue-400/30">
            <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center text-xl font-bold">📄</div>
            <span className="text-xl font-extrabold tracking-wide">CV MAKER</span>
          </div>

          {/* Navigasi Menu */}
          <nav className="mt-6 px-3 space-y-1">
            <button className="w-full flex items-center space-x-3 bg-white/15 px-4 py-3 rounded-lg font-semibold transition-all">
              <span>📊</span>
              <span>Dashboard</span>
            </button>
            <button className="w-full flex items-center space-x-3 text-white/80 hover:bg-white/10 px-4 py-3 rounded-lg font-medium transition-all text-left">
              <span>📁</span>
              <span className="flex-1">Template Management</span>
              <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded">+</span>
            </button>
            <button className="w-full flex items-center space-x-3 text-white/80 hover:bg-white/10 px-4 py-3 rounded-lg font-medium transition-all text-left">
              <span>👥</span>
              <span>User Data</span>
            </button>
            <button className="w-full flex items-center space-x-3 text-white/80 hover:bg-white/10 px-4 py-3 rounded-lg font-medium transition-all text-left">
              <span>📈</span>
              <span>Download Analytics</span>
            </button>
          </nav>
        </div>

        {/* Tombol Logout di Bawah Sidebar */}
        <div className="p-4 border-t border-blue-400/30">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 text-white/90 hover:bg-red-500/20 px-4 py-3 rounded-lg font-semibold transition-all text-left"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* KONTEN KANAN (NAVBAR ATAS + MAIN CONTENT)                 */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col overflow-x-hidden">
        
        {/* 2. TOP NAVBAR */}
        <header className="h-[70px] bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <h1 className="text-xl font-bold text-gray-800">Welcome back, Admin!</h1>
          
          {/* Info Akun Admin di Kanan Atas */}
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-[#3fa2f6] overflow-hidden">
              <img 
                src="https://via.placeholder.com/40" 
                alt="Admin Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800 group-hover:text-[#3fa2f6] transition-colors">Admin User</p>
              <p className="text-xs text-gray-400 font-medium">Super Admin</p>
            </div>
            <span className="text-xs text-gray-400 group-hover:translate-y-0.5 transition-transform">▼</span>
          </div>
        </header>

        {/* 3. CORE CONTENT AREA */}
        <main className="p-8 space-y-8 flex-1 max-w-[1400px] w-full mx-auto">
          
          {/* SECTION: DASHBOARD OVERVIEW (4 CARD UTAMA) */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1: Total Registered Users */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-blue-50 text-[#3fa2f6] rounded-full flex items-center justify-center text-xl font-bold mb-3">👥</div>
                <p className="text-xs font-bold text-gray-400 tracking-wide">Total Registered Users</p>
                <h3 className="text-3xl font-black text-gray-800 mt-1">1,250</h3>
                <p className="text-[11px] font-bold text-green-500 mt-1">+5% <span className="text-gray-400 font-medium">since last week</span></p>
              </div>

              {/* Card 2: Active CV Templates */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-blue-50 text-[#3fa2f6] rounded-full flex items-center justify-center text-xl font-bold mb-3">📄</div>
                <p className="text-xs font-bold text-gray-400 tracking-wide">Active CV Templates</p>
                <h3 className="text-3xl font-black text-[#3fa2f6] mt-1">{templates.length}</h3>
              </div>

              {/* Card 3: Total CV Downloads */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-blue-50 text-[#3fa2f6] rounded-full flex items-center justify-center text-xl font-bold mb-3">📥</div>
                <p className="text-xs font-bold text-gray-400 tracking-wide">Total CV Downloads</p>
                <h3 className="text-3xl font-black text-gray-800 mt-1">3,410</h3>
              </div>

              {/* Card 4: CV Formats Graph Placeholder */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                <p className="text-xs font-bold text-gray-400 tracking-wide mb-2">CV Formats (PDF/PNG/JPG)</p>
                {/* Donut Chart Simulation */}
                <div className="relative w-16 h-16 rounded-full border-[6px] border-blue-400 border-t-[#3fa2f6] border-r-blue-200 animate-spin-slow flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white"></div>
                </div>
              </div>

            </div>
          </section>

          {/* TWO COLUMN GRID BELOW OVERVIEW */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
            
            {/* COLUMN KIRI & TENGAH: TABEL RECENT ACTIVITY */}
            <section className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 flex items-center justify-between border-b border-gray-50">
                <h2 className="text-lg font-bold text-gray-800">Recent Template Activity</h2>
                <button className="bg-[#3fa2f6] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-md shadow-blue-100 transition-all flex items-center space-x-1">
                  <span>+</span> <span>Create New Template</span>
                </button>
              </div>

              {/* RENDER TABEL */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/70 text-gray-400 uppercase text-[11px] font-bold tracking-wider border-b border-gray-100">
                      <th className="py-3 px-6">Template Name</th>
                      <th className="py-3 px-4 text-center">Preview</th>
                      <th className="py-3 px-4">Author</th>
                      <th className="py-3 px-4">Created Date</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                    {templates.map((tpl) => (
                      <tr key={tpl.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6 font-bold text-gray-800">{tpl.name}</td>
                        <td className="py-2 px-4">
                          <div className="w-9 h-12 mx-auto border border-gray-200 rounded overflow-hidden shadow-sm bg-gray-50">
                            <img src={tpl.img} alt="preview" className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-500 font-medium">{tpl.author}</td>
                        <td className="py-4 px-4 text-gray-400 font-mono text-xs">{tpl.date}</td>
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 bg-green-50 border border-green-200 text-green-600 rounded-md text-xs font-semibold">
                            {tpl.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center space-x-2 text-gray-400">
                            <button className="hover:text-blue-500 p-1 transition-colors" title="View">👁️</button>
                            <button className="hover:text-yellow-500 p-1 transition-colors" title="Edit">✏️</button>
                            <button className="hover:text-red-500 p-1 transition-colors" title="Delete">🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* COLUMN KANAN: SYSTEM LOGS */}
            <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-4">System Logs</h2>
                <div className="space-y-4">
                  
                  {/* Log Item 1 */}
                  <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="text-xl mt-0.5">🔔</div>
                    <div>
                      <p className="text-sm font-bold text-gray-700">Recent Activity</p>
                      <p className="text-xs text-gray-400 font-medium">Admin User at 9:51 AM</p>
                    </div>
                  </div>

                  {/* Log Item 2 */}
                  <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="text-xl mt-0.5">🔔</div>
                    <div>
                      <p className="text-sm font-bold text-gray-700">Recent Activity</p>
                      <p className="text-xs text-gray-400 font-medium">Admin User at 8:57 PM</p>
                    </div>
                  </div>

                  {/* Log Item 3 */}
                  <div className="flex items-start space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="text-xl mt-0.5">🔔</div>
                    <div>
                      <p className="text-sm font-bold text-gray-700">Recent Activity</p>
                      <p className="text-xs text-gray-400 font-medium">Admin User at 9:51 PM</p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;