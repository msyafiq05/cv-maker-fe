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
        if (res.user && res.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
        // =========================================================

        window.location.reload();
      } catch (err: any) {
        console.error('Error login:', err);
        setErrorMsg(err?.message ?? 'Email atau Password salah!');
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMsg('Mohon isi email dan password!');
    }
  };


<<<<<<< Updated upstream
=======
    if (token) {
      setLoading(true);
      // Bersihkan URL dari token terlebih dahulu
      window.history.replaceState({}, document.title, '/login');
      
      // Simpan sementara agar authApi.me() bisa menggunakan token ini
      localStorage.setItem('token', token);
      
      authApi.me()
        .then((res) => {
          saveSession(token, res.user);
          // Langsung redirect dengan full page reload agar state fresh
          window.location.href = '/';
        })
        .catch((err) => {
          console.error('Error fetching Google user:', err);
          setErrorMsg('Gagal login via Google. Silakan coba lagi.');
          localStorage.removeItem('token');
          setLoading(false);
        });
    }
  }, []);
>>>>>>> Stashed changes

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


<<<<<<< Updated upstream
=======
          {/* GOOGLE BUTTON */}
          <button
            type="button"
            onClick={() => window.location.href = 'http://localhost:8000/api/auth/google'}
            className="w-full h-11 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg text-gray-700 font-bold text-xs flex items-center justify-center gap-3 transition-all shadow-sm active:scale-[0.98] uppercase tracking-wider"
          >
            <div className="bg-white rounded-full p-0.5 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
            </div>
            Continue With Google
          </button>
>>>>>>> Stashed changes

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