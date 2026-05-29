// src/pages/signup.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signupImg from '../assets/signup.png'; 
import { authApi } from '../services/api';

const Signup = () => {
  const navigate = useNavigate();

  // State untuk form input
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  // State pengontrol: jika true, tampilan otomatis berubah ke "Success Page"
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!name || !username || !email || !password || !verifyPassword) {
      setError('Mohon isi semua field!');
      return;
    }

    if (password !== verifyPassword) {
      setError('Password dan Verify Password tidak cocok!');
      return;
    }

    setLoading(true);
    try {
      await authApi.register({
        nama: name,
        username,
        email,
        password,
        password_confirmation: verifyPassword,
      });

      // Mengubah state menjadi true untuk menampilkan halaman sukses registrasi
      setIsSuccess(true);
    } catch (err: any) {
      // Tampilkan error validasi dari backend
      const firstError = err?.errors
        ? (Object.values(err.errors)[0] as string[]).join(', ')
        : null;
      setError(firstError ?? err?.message ?? 'Registrasi gagal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex bg-[#f5f5f5] overflow-x-hidden select-none">

      {/* LEFT SIDE: BACKGROUND BIRU JALAN TERUS (BERLAKU UNTUK KEDUA HALAMAN) */}
      <div className="hidden lg:flex lg:w-1/2 h-screen sticky top-0 bg-[#7fc7ff] items-center justify-center p-12 xl:p-16">
        <img
          src={signupImg}
          alt="Sign up illustration"
          className="w-full h-auto max-w-[380px] xl:max-w-[440px] object-contain" 
        />
      </div>

      {/* RIGHT SIDE: KONDISIONAL RENDER (FORM / SUCCESS PAGE) */}
      <div className="w-full lg:w-1/2 min-h-screen bg-white relative flex items-center justify-center px-6 md:px-16 py-[4vh]">
        
        {!isSuccess ? (
          /* ========================================================= */
          /* 1. TAMPILAN AWAL: FORM REGISTER                         */
          /* ========================================================= */
          <div className="w-full max-w-[420px] flex flex-col justify-center animate-fade-in">
            <h1 className="text-center text-[48px] md:text-[56px] font-bold text-[#74c0fc] mb-5 tracking-wide">
              Sign up
            </h1>

            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="w-full space-y-[14px]">
              {/* NAME */}
              <div>
                <label className="block text-[15px] md:text-[16px] font-semibold mb-1 text-black">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Input Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-[44px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[14px] md:text-[15px] bg-transparent focus:ring-2 focus:ring-[#74c0fc] transition-all"
                />
              </div>

              {/* USERNAME */}
              <div>
                <label className="block text-[15px] md:text-[16px] font-semibold mb-1 text-black">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Input Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-[44px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[14px] md:text-[15px] bg-transparent focus:ring-2 focus:ring-[#74c0fc] transition-all"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-[15px] md:text-[16px] font-semibold mb-1 text-black">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Input Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[44px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[14px] md:text-[15px] bg-transparent focus:ring-2 focus:ring-[#74c0fc] transition-all"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-[15px] md:text-[16px] font-semibold mb-1 text-black">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Input Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[44px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[14px] md:text-[15px] bg-transparent focus:ring-2 focus:ring-[#74c0fc] transition-all"
                />
              </div>

              {/* VERIFY PASSWORD */}
              <div>
                <label className="block text-[15px] md:text-[16px] font-semibold mb-1 text-black">
                  Verify Password
                </label>
                <input
                  type="password"
                  placeholder="Input Verify Password"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  className="w-full h-[44px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[14px] md:text-[15px] bg-transparent focus:ring-2 focus:ring-[#74c0fc] transition-all"
                />
              </div>

              {/* SIGN UP BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[46px] bg-[#67b7f7] hover:bg-[#4da9f3] rounded-md text-white text-[18px] md:text-[20px] font-bold transition-all shadow-sm active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Mendaftar...' : 'Sign up'}
                </button>
              </div>
            </form>

            <p className="text-center mt-5 text-gray-500 text-[14px]">
              Already have account?{' '}
              <span
                onClick={() => navigate('/login')}
                className="text-[#60a5fa] font-bold cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </div>
        ) : (
          /* ========================================================= */
          /* 2. TAMPILAN KEDUA: SIGN UP SUCCESS (SEKALI COPY PASTE)     */
          /* ========================================================= */
          <div className="w-full max-w-[440px] flex flex-col items-center justify-center text-center animate-fade-in px-4">
            
            {/* Judul Besar Sesuai Desain Figma */}
            <h2 className="text-[40px] md:text-[52px] font-bold text-[#67b7f7] leading-tight tracking-wide">
              Successfull
            </h2>
            
            {/* Sub-text Keterangan */}
            <p className="text-gray-400 text-[14px] md:text-[15px] mt-2 mb-8 max-w-[320px] font-medium leading-relaxed">
              Congratulations! Your account has been registered.
            </p>

            {/* Tombol Utama menuju Login Page */}
            <button
              onClick={() => navigate('/login')}
              className="w-full h-[48px] bg-[#67b7f7] hover:bg-[#4da9f3] rounded-md text-white text-[16px] md:text-[18px] font-bold transition-all shadow-md shadow-blue-100 active:scale-[0.98]"
            >
              Go to login
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Signup;