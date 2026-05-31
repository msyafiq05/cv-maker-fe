import { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const initialUsers = [
  { id: 1, name: 'User', email: 'Users@gmail.com', cvCount: 1, lastAccess: '1 hour ago', img: 'https://via.placeholder.com/40' },
];

const AdminDashboard = () => {
  // Menggunakan state agar tabel dan data card otomatis singkron secara real-time saat dihapus
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Fungsi Tombol Sampah Berfungsi (Menghapus Data Secara Real-time)
  const handleDeleteUser = (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus user ini?')) {
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    }
  };

  // 2. Kalkulasi Otomatis Nyambung ke Backend / State (Otomatis berkurang/berubah jika user dihapus)
  const totalRegistered = users.length;
  const activeTemplates = 1; // Tinggal disesuaikan dengan jumlah data template dari backend nanti
  const totalDownloads = users.reduce((sum, user) => sum + user.cvCount, 0); // Akumulasi dinamis dari jumlah CV user

  // Filter untuk pencarian data user di tabel
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans antialiased">
      
      {/* 1. NAVBAR */}
      <Navbar />

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-8 py-16">
        
        {/* HEADING UTAMA DUA WARNA */}
        <div className="mb-14">
          <h1 className="text-[54px] font-bold leading-tight tracking-tight">
            <span className="text-[#5DADE2]">Hello Admin !</span> 
            <br />
            <span className="text-[#4680B4]">CV Maker</span>
          </h1>
          <p className="text-gray-500 text-sm mt-3 font-normal tracking-wide">
            Manage your CV Maker website
          </p>
        </div>

        {/* SECTION 3 CARD OVERVIEW (Akurat Sesuai Ukuran Figma & Angka Warna #4A85BB) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-[1000px]">
          
          {/* Card 1: Total Registered Users */}
          <div className="bg-[#eaf5ff] border border-[#4a85bb]/30 rounded-xl pt-10 pb-8 px-6 flex flex-col items-center justify-between min-h-[340px] max-w-[280px] w-full mx-auto shadow-sm">
            <div className="text-[#334155]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-[20px] font-bold text-[#334155] text-center leading-tight mt-3">
              Total Registered<br />Users
            </h3>
            {/* Angka Berwarna Biru Steel #4A85BB Sesuai Figma */}
            <span className="text-[64px] font-bold text-[#4A85BB] tracking-tight leading-none my-2">
              {totalRegistered}
            </span>
            <p className="text-xs font-bold text-[#475569] tracking-wide mt-1">Since Last Week</p>
          </div>

          {/* Card 2: Active CV Templates */}
          <div className="bg-[#eaf5ff] border border-[#4a85bb]/30 rounded-xl pt-10 pb-8 px-6 flex flex-col items-center justify-between min-h-[340px] max-w-[280px] w-full mx-auto shadow-sm">
            <div className="text-[#334155]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-[20px] font-bold text-[#334155] text-center leading-tight mt-3">
              Active CV<br />Templates
            </h3>
            {/* Angka Berwarna Biru Steel #4A85BB Sesuai Figma */}
            <span className="text-[64px] font-bold text-[#4A85BB] tracking-tight leading-none my-2">
              {activeTemplates}
            </span>
            <div className="h-4"></div> {/* Spacer balance */}
          </div>

          {/* Card 3: Total CV Downloads */}
          <div className="bg-[#eaf5ff] border border-[#4a85bb]/30 rounded-xl pt-10 pb-8 px-6 flex flex-col items-center justify-between min-h-[340px] max-w-[280px] w-full mx-auto shadow-sm">
            <div className="text-[#334155]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3 className="text-[20px] font-bold text-[#334155] text-center leading-tight mt-3">
              Total CV<br />Downloads
            </h3>
            {/* Angka Berwarna Biru Steel #4A85BB Sesuai Figma */}
            <span className="text-[64px] font-bold text-[#4A85BB] tracking-tight leading-none my-2">
              {totalDownloads}
            </span>
            <div className="h-4"></div> {/* Spacer balance */}
          </div>

        </section>

        {/* SECTION: USER MANAGEMENT TABLE */}
        <section className="mt-16">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-[38px] font-bold text-[#4682B4] tracking-tight leading-none">
              User Management
            </h2>
            
            {/* Input Search Tipis Minimalis */}
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[260px] pl-9 pr-4 py-1.5 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:border-[#4682B4] placeholder-gray-400"
              />
            </div>
          </div>

          {/* Render Tabel Data User */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-[3px] border-[#D9D9D9] text-gray-800 text-base font-bold">
                  <th className="py-3 px-2 pb-4 font-bold">
                    <span className="inline-flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      User Name
                    </span>
                  </th>
                  <th className="py-3 px-2 pb-4 font-bold">
                    <span className="inline-flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </span>
                  </th>
                  <th className="py-3 px-2 pb-4 font-bold text-center">
                    <span className="inline-flex items-center gap-1.5 justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      CV dibuat
                    </span>
                  </th>
                  <th className="py-3 px-2 pb-4 font-bold">
                    <span className="inline-flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Terakhir Akses
                    </span>
                  </th>
                  <th className="py-3 px-2 pb-4 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="align-middle border-b border-gray-100">
                    <td className="py-5 px-2 flex items-center space-x-3">
                      <img src={user.img} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-gray-800 font-medium">{user.name}</span>
                    </td>
                    <td className="py-5 px-2 text-gray-600">{user.email}</td>
                    <td className="py-5 px-2 text-center text-gray-800 font-medium">{user.cvCount}</td>
                    <td className="py-5 px-2 text-gray-500 font-light">{user.lastAccess}</td>
                    <td className="py-5 px-2 text-center">
                      
                      {/* FUNGSIONAL: Menghubungkan klik tombol ke fungsi handleDeleteUser */}
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1" 
                        title="Delete User"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>

      {/* 3. FOOTER */}
      <Footer />

    </div>
  );
};

export default AdminDashboard;