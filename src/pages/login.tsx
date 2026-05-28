// src/pages/Login.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImg from '../assets/login.png';
import { authApi, saveSession } from '../services/api';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  // ─── Login dengan Email & Password ──────────────────────────
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Mohon isi email dan password!');
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.login({ email, password });
      saveSession(res.data.token, res.data.user);
      navigate('/');
      window.location.reload();
    } catch (err: any) {
      setError(err?.message ?? 'Login gagal. Periksa email dan password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex overflow-hidden bg-[#f5f5f5]">

      {/* LEFT IMAGE */}
      <div className="hidden lg:block lg:w-1/2 h-full">
        <img
          src={loginImg}
          alt="login"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 h-full bg-[#f7f7f7] relative flex items-center justify-center">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-10 left-10 text-gray-500 hover:text-black transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* FORM */}
        <div className="w-full max-w-[420px] px-6">

          {/* TITLE */}
          <h1 className="text-center text-[72px] font-bold text-[#74c0fc] mb-12">
            Login
          </h1>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>

            {/* EMAIL */}
            <div className="mb-6">
              <label className="block text-[18px] font-semibold mb-2 text-black">
                Email
              </label>

              <input
                type="email"
                placeholder="Input Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full
                  h-[50px]
                  px-4
                  border
                  border-[#8fd0ff]
                  rounded-md
                  outline-none
                  text-[16px]
                  bg-transparent
                  focus:ring-2
                  focus:ring-[#74c0fc]
                "
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-2">
              <label className="block text-[18px] font-semibold mb-2 text-black">
                Password
              </label>

              <input
                type="password"
                placeholder="Input Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full
                  h-[50px]
                  px-4
                  border
                  border-[#8fd0ff]
                  rounded-md
                  outline-none
                  text-[16px]
                  bg-transparent
                  focus:ring-2
                  focus:ring-[#74c0fc]
                "
              />
            </div>

            {/* FORGOT PASSWORD */}
            <div className="flex justify-end mb-8">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-[#60a5fa] text-[14px] hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-[52px]
                bg-[#67b7f7]
                hover:bg-[#4da9f3]
                rounded-md
                text-white
                text-[22px]
                font-bold
                transition
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading ? 'Memproses...' : 'Login'}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-[1px] bg-gray-400"></div>
            <span className="font-bold text-[18px]">OR</span>
            <div className="flex-1 h-[1px] bg-gray-400"></div>
          </div>

          {/* GOOGLE BUTTON */}
          <button
            className="
              w-full
              h-[52px]
              bg-[#67b7f7]
              hover:bg-[#4da9f3]
              rounded-md
              text-white
              font-semibold
              text-[18px]
              flex
              items-center
              justify-center
              gap-3
              transition
            "
          >
            <div className="bg-white rounded-full p-1">
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
            </div>
            Continue With Google
          </button>

          {/* REGISTER -> SEKARANG GARIS INI SUDAH TERARAH KE /signup */}
          <p className="text-center mt-8 text-gray-600 text-[15px]">
            Not Registered Yet?{' '}
            <span
              onClick={() => navigate('/signup')} // <-- BERHASIL DIUBAH KE /signup
              className="text-[#60a5fa] font-semibold cursor-pointer hover:underline"
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