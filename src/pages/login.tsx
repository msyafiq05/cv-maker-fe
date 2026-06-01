import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImg from '../assets/login.png';
import { authApi, saveSession } from '../services/api';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && password) {
      setLoading(true);
      try {
        const res = await authApi.login({ email, password });
        saveSession(res.token, res.user);

        // =========================================================
        // BAGIAN PENAMBAHAN UNTUK MENYAMBUNGKAN KE HALAMAN ADMIN
        // =========================================================
        // Menyimpan flag status login agar singkron dengan Navbar.tsx
        localStorage.setItem('isLoggedIn', 'true');

        if (res.user && res.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
        // =========================================================

        window.location.reload();
      } catch (err: unknown) {
        const e = err as { message?: string };
        console.error('Error login:', e);
        setErrorMsg(e?.message ?? 'Email atau Password salah!');
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMsg('Mohon isi email dan password!');
    }
  };

  return (
    <div className="w-full min-h-screen flex bg-[#f5f5f5] overflow-x-hidden select-none">

      {/* LEFT SIDE: IMAGE PREVIEW (Hanya muncul di layar laptop/PC besar) */}
      <div className="hidden lg:block lg:w-1/2 h-screen sticky top-0">
        <img
          src={loginImg}
          alt="login preview"
          className="w-full h-full object-cover object-left"
        />
      </div>

      {/* RIGHT SIDE: FORM LOGIN */}
      <div className="w-full lg:w-1/2 min-h-screen bg-[#f7f7f7] relative flex items-center justify-center px-6 md:px-16 py-[5vh]">

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
        <div className="w-full max-w-[380px] flex flex-col justify-center py-6">

          {/* TITLE */}
          <h1 className="text-center text-3xl md:text-4xl font-extrabold text-[#74c0fc] mb-6 tracking-wide uppercase">
            Login
          </h1>

          {/* BOX ERROR MESSAGE */}
          {errorMsg && (
            <div className="text-red-500 text-xs font-semibold mb-4 text-center bg-red-100 p-2.5 rounded-md border border-red-200 animate-fade-in">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="w-full">

            {/* EMAIL */}
            <div className="mb-4">
              <label className="block text-xs font-bold mb-1.5 text-gray-800 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                placeholder="Input Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 border border-[#8fd0ff] rounded-lg outline-none text-xs bg-white focus:ring-2 focus:ring-[#74c0fc] transition-all shadow-sm font-medium"
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-2">
              <label className="block text-xs font-bold mb-1.5 text-gray-800 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                placeholder="Input Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-4 border border-[#8fd0ff] rounded-lg outline-none text-xs bg-white focus:ring-2 focus:ring-[#74c0fc] transition-all shadow-sm font-medium"
              />
            </div>

            {/* FORGOT PASSWORD */}
            <div className="flex justify-end mb-5">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-[#60a5fa] text-[11px] font-bold hover:underline bg-transparent border-none outline-none"
              >
                Forgot Password?
              </button>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#67b7f7] hover:bg-[#4da9f3] rounded-lg text-white text-sm font-bold transition-all shadow-md active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed uppercase tracking-wider"
            >
              {loading ? 'Memproses...' : 'Login'}
            </button>
          </form>

          {/* REGISTER */}
          <p className="text-center mt-5 text-gray-500 text-xs font-semibold">
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