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

      setIsSuccess(true);
    } catch (err: any) {
      const firstError = err?.errors
        ? (Object.values(err.errors)[0] as string[]).join(', ')
        : null;
      setError(firstError ?? err?.message ?? 'Registrasi gagal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Menggunakan h-screen dan overflow-hidden agar pas dengan tinggi layar device
    <div className="w-full h-screen flex bg-[#f5f5f5] overflow-hidden select-none">

      {/* ========================================================= */}
      {/* SISI KIRI (BIRU): TEPAT SETENGAH LAYAR (50%)              */}
      {/* ========================================================= */}
      <div className="hidden lg:flex lg:w-1/2 h-full bg-[#7fc7ff] items-center justify-center p-12">
        <img
          src={signupImg}
          alt="Sign up illustration"
          // max-w dan max-h mengontrol agar gambar tidak membesar berlebihan walaupun kontainernya 50%
          className="w-full max-w-[340px] xl:max-w-[400px] max-h-[65vh] object-contain animate-fade-in" 
        />
      </div>

      {/* ========================================================= */}
      {/* SISI KANAN (FORM): TEPAT SETENGAH LAYAR (50%)             */}
      {/* ========================================================= */}
      <div className="w-full lg:w-1/2 h-full bg-white flex items-center justify-center px-6 sm:px-12 md:px-16 py-4">
        
        {!isSuccess ? (
          /* 1. TAMPILAN AWAL: FORM REGISTER */
          <div className="w-full max-w-[360px] max-h-full flex flex-col justify-center animate-fade-in">
            
            <h1 className="text-center text-[32px] sm:text-[36px] md:text-[40px] font-bold text-[#74c0fc] mb-2 md:mb-4 tracking-wide">
              Sign up
            </h1>

            {error && (
              <div className="mb-2 px-4 py-1.5 bg-red-50 border border-red-200 rounded-md text-red-600 text-xs sm:text-sm font-medium">
                {error}
              </div>
            )}

            {/* Jarak antar input form yang dinamis & pas di layar laptop */}
            <form onSubmit={handleSignup} className="w-full space-y-[6px] sm:space-y-[10px] md:space-y-[12px]">
              {/* NAME */}
              <div className="flex flex-col">
                <label className="text-[13px] md:text-[14px] font-semibold mb-0.5 text-black">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Input Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-[36px] sm:h-[38px] md:h-[40px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[13px] md:text-[14px] bg-transparent focus:ring-2 focus:ring-[#74c0fc] transition-all"
                />
              </div>

              {/* USERNAME */}
              <div className="flex flex-col">
                <label className="text-[13px] md:text-[14px] font-semibold mb-0.5 text-black">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Input Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-[36px] sm:h-[38px] md:h-[40px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[13px] md:text-[14px] bg-transparent focus:ring-2 focus:ring-[#74c0fc] transition-all"
                />
              </div>

              {/* EMAIL */}
              <div className="flex flex-col">
                <label className="text-[13px] md:text-[14px] font-semibold mb-0.5 text-black">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Input Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[36px] sm:h-[38px] md:h-[40px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[13px] md:text-[14px] bg-transparent focus:ring-2 focus:ring-[#74c0fc] transition-all"
                />
              </div>

              {/* PASSWORD */}
              <div className="flex flex-col">
                <label className="text-[13px] md:text-[14px] font-semibold mb-0.5 text-black">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Input Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[36px] sm:h-[38px] md:h-[40px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[13px] md:text-[14px] bg-transparent focus:ring-2 focus:ring-[#74c0fc] transition-all"
                />
              </div>

              {/* VERIFY PASSWORD */}
              <div className="flex flex-col">
                <label className="text-[13px] md:text-[14px] font-semibold mb-0.5 text-black">
                  Verify Password
                </label>
                <input
                  type="password"
                  placeholder="Input Verify Password"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  className="w-full h-[36px] sm:h-[38px] md:h-[40px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[13px] md:text-[14px] bg-transparent focus:ring-2 focus:ring-[#74c0fc] transition-all"
                />
              </div>

              {/* SIGN UP BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-[38px] md:h-[42px] bg-[#67b7f7] hover:bg-[#4da9f3] rounded-md text-white text-[15px] md:text-[16px] font-bold transition-all shadow-sm active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Mendaftar...' : 'Sign up'}
                </button>
              </div>
            </form>

            <p className="text-center mt-3 text-gray-500 text-[13px] sm:text-[14px]">
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
          /* 2. TAMPILAN KEDUA: SIGN UP SUCCESS */
          <div className="w-full max-w-[360px] flex flex-col items-center justify-center text-center animate-fade-in px-4">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#67b7f7] leading-tight tracking-wide">
              Successful
            </h2>
            
            <p className="text-gray-400 text-[13px] md:text-[14px] mt-2 mb-6 max-w-[280px] font-medium leading-relaxed">
              Congratulations! Your account has been registered.
            </p>

            <button
              onClick={() => navigate('/login')}
              className="w-full h-[40px] md:h-[44px] bg-[#67b7f7] hover:bg-[#4da9f3] rounded-md text-white text-[14px] md:text-[16px] font-bold transition-all shadow-md shadow-blue-100 active:scale-[0.98]"
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