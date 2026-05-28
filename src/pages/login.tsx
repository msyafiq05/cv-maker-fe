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
    setErrorMsg('');

    if (!email || !password) {
      alert('Mohon isi email dan password!');
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.login({ email, password });
      saveSession(res.data.token, res.data.user);
      navigate('/');
      window.location.reload();
    } catch (err: any) {
      console.error('Error login:', err);
      setErrorMsg(err?.message ?? 'Email atau Password salah!');
    } finally {
      setLoading(false);
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
      {/* py-[5vh] memaksa padding atas bawah mengikuti skala tinggi device user secara elastis */}
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

        {/* FORM CONTAINER: Lebar dibatasi maksimal 420px agar bentuknya tetap slim dan ideal */}
        <div className="w-full max-w-[420px] flex flex-col justify-center">

          {/* TITLE: Menyesuaikan ukuran agar di device ter-zoom tidak terlihat raksasa */}
          <h1 className="text-center text-[52px] md:text-[64px] font-bold text-[#74c0fc] mb-8 tracking-wide">
            Login
          </h1>

          {/* BOX ERROR MESSAGE */}
          {errorMsg && (
            <div className="text-red-500 text-sm font-semibold mb-4 text-center bg-red-100 p-3 rounded-md border border-red-200 animate-fade-in">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="w-full">

            {/* EMAIL */}
            <div className="mb-5">
              <label className="block text-[16px] md:text-[18px] font-semibold mb-2 text-black">
                Email
              </label>
              <input
                type="email"
                placeholder="Input Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[48px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[15px] bg-transparent focus:ring-2 focus:ring-[#74c0fc] transition-all"
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-2">
              <label className="block text-[16px] md:text-[18px] font-semibold mb-2 text-black">
                Password
              </label>
              <input
                type="password"
                placeholder="Input Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[48px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[15px] bg-transparent focus:ring-2 focus:ring-[#74c0fc] transition-all"
              />
            </div>

            {/* FORGOT PASSWORD */}
            <div className="flex justify-end mb-6">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-[#60a5fa] text-[13px] md:text-[14px] hover:underline bg-transparent border-none outline-none"
              >
                Forgot Password?
              </button>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[48px] bg-[#67b7f7] hover:bg-[#4da9f3] rounded-md text-white text-[18px] md:text-[20px] font-bold transition-all shadow-sm active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Memproses...' : 'Login'}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-[1px] bg-gray-300"></div>
            <span className="font-bold text-[16px] text-gray-500">OR</span>
            <div className="flex-1 h-[1px] bg-gray-300"></div>
          </div>

          {/* GOOGLE BUTTON */}
          <button
            type="button"
            className="w-full h-[48px] bg-[#67b7f7] hover:bg-[#4da9f3] rounded-md text-white font-semibold text-[16px] flex items-center justify-center gap-3 transition-all shadow-sm active:scale-[0.98]"
          >
            <div className="bg-white rounded-full p-1 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
            </div>
            Continue With Google
          </button>

          {/* REGISTER */}
          <p className="text-center mt-6 text-gray-500 text-[14px]">
            Not Registered Yet?{' '}
            <span
              onClick={() => navigate('/signup')}
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