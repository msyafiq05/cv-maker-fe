// src/pages/login.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImg from '../assets/login.png'; // Pastikan file gambar tumpukan resume ada di folder assets

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      alert('Mohon isi email dan password!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/');
        window.location.reload();
      } else {
        setErrorMsg(data.message || 'Email atau Password salah!');
      }
    } catch (error) {
      console.error('Error login:', error);
      setErrorMsg('Gagal terhubung ke server backend. Pastikan Laravel sudah jalan!');
    }
  };

  return (
    // LOCK SCREEN: Menggunakan h-screen, bg-[#f5f5f5], dan overflow-hidden agar pas 1 halaman penuh & bebas dari scrollbar
    <div className="w-full h-screen flex bg-[#f5f5f5] overflow-hidden select-none">

      {/* LEFT SIDE: RESUME BACKGROUND PREVIEW (Background biru dihapus total, gambar nempel penuh ke kiri layar) */}
      <div className="hidden lg:flex lg:w-1/2 h-screen relative overflow-hidden items-center justify-start">
        <img
          src={loginImg}
          alt="CV Login Preview"
          className="w-full h-full object-cover object-left"
        />
      </div>

      {/* RIGHT SIDE: FORM LOGIN */}
      <div className="w-full lg:w-1/2 h-screen bg-white relative flex items-center justify-center px-6 md:px-16 overflow-hidden">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 md:top-8 md:left-10 text-gray-400 hover:text-black transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 md:w-8 md:h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* FORM CONTAINER */}
        <div className="w-full max-w-[400px] flex flex-col justify-center animate-fade-in">

          {/* TITLE */}
          <h1 className="text-center text-[44px] md:text-[52px] font-bold text-[#74c0fc] mb-6 tracking-wide">
            Login
          </h1>

          {/* BOX ERROR MESSAGE */}
          {errorMsg && (
            <div className="text-red-500 text-xs font-semibold mb-3 text-center bg-red-100 p-2 rounded-md border border-red-200">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="w-full">

            {/* EMAIL */}
            <div className="mb-4">
              <label className="block text-[14px] font-semibold mb-1 text-black">
                Email
              </label>
              <input
                type="email"
                placeholder="Input Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[40px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[14px] bg-transparent focus:ring-2 focus:ring-[#74c0fc] transition-all"
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-1">
              <label className="block text-[14px] font-semibold mb-1 text-black">
                Password
              </label>
              <input
                type="password"
                placeholder="Input Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[40px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[14px] bg-transparent focus:ring-2 focus:ring-[#74c0fc] transition-all"
              />
            </div>

            {/* FORGOT PASSWORD */}
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-[#60a5fa] text-[12px] md:text-[13px] font-semibold hover:underline bg-transparent border-none outline-none"
              >
                Forgot Password?
              </button>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full h-[42px] bg-[#67b7f7] hover:bg-[#4da9f3] rounded-md text-white text-[16px] md:text-[18px] font-bold transition-all shadow-sm active:scale-[0.98]"
            >
              Login
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-[1px] bg-gray-200"></div>
            <span className="font-bold text-[14px] text-gray-400">OR</span>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
          </div>

          {/* GOOGLE BUTTON (Kode SVG Diperbaiki & Full Tag) */}
          <button
            type="button"
            className="w-full h-[42px] bg-[#67b7f7] hover:bg-[#4da9f3] rounded-md text-white font-semibold text-[15px] flex items-center justify-center gap-3 transition-all shadow-sm active:scale-[0.98]"
          >
            <div className="bg-white rounded-full p-1 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
            </div>
            Continue With Google
          </button>

          {/* REGISTER LINK */}
          <p className="text-center mt-5 text-gray-500 text-[14px]">
            Not Registered Yet?{' '}
            <span
              onClick={() => navigate('/signup')}
              className="text-[#60a5fa] font-bold cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;