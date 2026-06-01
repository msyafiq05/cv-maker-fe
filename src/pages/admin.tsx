import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { adminApi, authApi } from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  cv_count: number;
  last_access: string | null;
  avatar: string | null;
}

interface DashboardStats {
  total_users: number;
  new_users_since_last_week: number;
  active_templates: number;
  total_downloads: number;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    total_users: 0,
    new_users_since_last_week: 0,
    active_templates: 0,
    total_downloads: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');

  // States for Add User Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newUser, setNewUser] = useState({
    nama: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const fetchDashboardData = async () => {
    try {
      const statsResponse = await adminApi.getDashboardStats();
      if (statsResponse.status === 'success') {
        setStats(statsResponse.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await adminApi.getUsers(searchQuery);
        if (response.status === 'success') {
          setUsers(response.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const timer = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleDeleteUser = async (id: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus user ini?')) {
      try {
        const response = await adminApi.deleteUser(id);
        if (response.status === 'success') {
          setUsers(users.filter((user) => user.id !== id));
          setStats(prev => ({ ...prev, total_users: prev.total_users - 1 }));
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Gagal menghapus user');
      }
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newUser.password !== newUser.password_confirmation) {
      alert('Password dan Konfirmasi Password tidak cocok!');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await authApi.register(newUser);
      if (response.message) {
        setIsModalOpen(false);

        // Tambahkan langsung ke tabel untuk UI update yang instan
        if (response.user) {
          const addedUser: User = {
            id: response.user.id,
            name: response.user.nama,
            email: response.user.email,
            cv_count: 0,
            last_access: 'Baru saja',
            avatar: response.user.avatar || null
          };
          setUsers(prev => [addedUser, ...prev]);
          setStats(prev => ({
            ...prev,
            total_users: prev.total_users + 1,
            new_users_since_last_week: prev.new_users_since_last_week + 1
          }));
        }

        setNewUser({ nama: '', username: '', email: '', password: '', password_confirmation: '' });

        // Panggil fetch di background untuk memastikan konsistensi data
        fetchDashboardData();
        adminApi.getUsers(searchQuery).then(res => {
          if (res.status === 'success') setUsers(res.data);
        }).catch(console.error);

        alert('User added successfully!');
      }
    } catch (error: any) {
      console.error('Error adding user:', error);
      alert(error?.message || 'Failed to add user');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans antialiased">

      {/* 1. NAVBAR */}
      <Navbar />

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-8 py-16">

        {/* HEADER & CARDS SECTION - FLEX LAYOUT */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start mb-16 gap-10">

          {/* KIRI: HEADING UTAMA DUA WARNA */}
          <div className="mt-2 lg:mt-6 flex-shrink-0 text-center lg:text-left">
            <h1 className="text-[54px] font-bold leading-tight tracking-tight">
              <span className="text-[#5DADE2]">Hello Admin !</span>
              <br />
              <span className="text-[#4680B4]">CV Maker</span>
            </h1>
            <p className="text-gray-500 text-sm mt-3 font-normal tracking-wide">
              Manage your CV Maker website
            </p>
          </div>

          {/* KANAN: SECTION 3 CARD OVERVIEW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-[600px]">

            {/* Card 1: Total Registered Users */}
            <div className="bg-[#eaf5ff] border border-[#4a85bb]/40 rounded-xl pt-6 pb-5 px-4 flex flex-col items-center justify-between min-h-[220px] w-full shadow-sm">
              <div className="text-[#334155]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-[16px] font-bold text-[#334155] text-center leading-tight mt-2">
                Total Registered<br />Users
              </h3>
              <span className="text-[52px] font-bold text-[#4A85BB] tracking-tight leading-none my-1">
                {stats.total_users}
              </span>
              <p className="text-[10px] font-bold text-[#475569] tracking-wide">Since Last Week ({stats.new_users_since_last_week})</p>
            </div>

            {/* Card 2: Active CV Templates */}
            <div className="bg-[#eaf5ff] border border-[#4a85bb]/40 rounded-xl pt-6 pb-5 px-4 flex flex-col items-center justify-between min-h-[220px] w-full shadow-sm">
              <div className="text-[#334155]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-[16px] font-bold text-[#334155] text-center leading-tight mt-2">
                Active CV<br />Templates
              </h3>
              <span className="text-[52px] font-bold text-[#4A85BB] tracking-tight leading-none my-1">
                {stats.active_templates}
              </span>
              <div className="h-4"></div>
            </div>

            {/* Card 3: Total CV Downloads */}
            <div className="bg-[#eaf5ff] border border-[#4a85bb]/40 rounded-xl pt-6 pb-5 px-4 flex flex-col items-center justify-between min-h-[220px] w-full shadow-sm">
              <div className="text-[#334155]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-[16px] font-bold text-[#334155] text-center leading-tight mt-2">
                Total CV<br />Downloads
              </h3>
              <span className="text-[52px] font-bold text-[#4A85BB] tracking-tight leading-none my-1">
                {stats.total_downloads}
              </span>
              <div className="h-4"></div>
            </div>

          </div>
        </div>

        {/* SECTION: USER MANAGEMENT TABLE */}
        <section className="mt-16">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-[38px] font-bold text-[#4682B4] tracking-tight leading-none">
              User Management
            </h2>

            <div className="flex items-center gap-4">
              {/* Tombol Tambah User */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#4682B4] hover:bg-[#3A6D99] text-white px-4 py-1.5 rounded-md text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
                Add User
              </button>

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
                      CV Created
                    </span>
                  </th>
                  <th className="py-3 px-2 pb-4 font-bold">
                    <span className="inline-flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      last access
                    </span>
                  </th>
                  <th className="py-3 px-2 pb-4 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="align-middle border-b border-gray-100">
                    <td className="py-5 px-2 flex items-center space-x-3">
                      <img src={user.avatar || 'https://via.placeholder.com/40'} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                      <span className="text-gray-800 font-medium">{user.name}</span>
                    </td>
                    <td className="py-5 px-2 text-gray-600">{user.email}</td>
                    <td className="py-5 px-2 text-center text-gray-800 font-medium">{user.cv_count}</td>
                    <td className="py-5 px-2 text-gray-500 font-light">{user.last_access || '-'}</td>
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

      {/* MODAL TAMBAH USER */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-7 relative animate-fade-in-up">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#4682B4]">Add New User</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={newUser.nama}
                  onChange={e => setNewUser({ ...newUser, nama: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#4682B4] focus:ring-1 focus:ring-[#4682B4] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  required
                  placeholder="Enter a unique username"
                  value={newUser.username}
                  onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#4682B4] focus:ring-1 focus:ring-[#4682B4] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#4682B4] focus:ring-1 focus:ring-[#4682B4] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="Enter password"
                  value={newUser.password}
                  onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#4682B4] focus:ring-1 focus:ring-[#4682B4] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="Confirm password"
                  value={newUser.password_confirmation}
                  onChange={e => setNewUser({ ...newUser, password_confirmation: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#4682B4] focus:ring-1 focus:ring-[#4682B4] text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-sm font-medium text-white bg-[#4682B4] rounded-md hover:bg-[#3A6D99] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    'Add User'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;