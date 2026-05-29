// src/pages/register.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImg from '../assets/login.png';
import { authApi, saveSession } from '../services/api';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama:                 '',
    username:             '',
    email:                '',
    password:             '',
    password_confirmation:'',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.password_confirmation) {
      setError('Password dan konfirmasi password tidak cocok!');
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.register(form);
      saveSession(res.token, res.user);
      navigate('/');
      window.location.reload();
    } catch (err: any) {
      const firstError = err?.errors
        ? (Object.values(err.errors)[0] as string[]).join(', ')
        : null;
      setError(firstError ?? err?.message ?? 'Registrasi gagal.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    w-full h-[50px] px-4 border border-[#8fd0ff] rounded-md
    outline-none text-[15px] bg-transparent
    focus:ring-2 focus:ring-[#74c0fc]
  `;

  return (
    <div className="w-full min-h-screen flex overflow-hidden bg-[#f5f5f5]">

      {/* LEFT IMAGE */}
      <div className="hidden lg:block lg:w-1/2">
        <img src={loginImg} alt="register" className="w-full h-full object-cover" />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 min-h-screen bg-[#f7f7f7] relative flex items-center justify-center py-12">

        <button
          onClick={() => navigate('/login')}
          className="absolute top-10 left-10 text-gray-500 hover:text-black transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="w-full max-w-[420px] px-6">
          <h1 className="text-center text-[60px] font-bold text-[#74c0fc] mb-8">
            Register
          </h1>

          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-[16px] font-semibold mb-1 text-black">Nama Lengkap</label>
              <input type="text" name="nama" placeholder="Nama lengkap" value={form.nama} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-[16px] font-semibold mb-1 text-black">Username</label>
              <input type="text" name="username" placeholder="Username unik" value={form.username} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-[16px] font-semibold mb-1 text-black">Email</label>
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-[16px] font-semibold mb-1 text-black">Password</label>
              <input type="password" name="password" placeholder="Minimal 6 karakter" value={form.password} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-[16px] font-semibold mb-1 text-black">Konfirmasi Password</label>
              <input type="password" name="password_confirmation" placeholder="Ulangi password" value={form.password_confirmation} onChange={handleChange} className={inputClass} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full h-[52px] bg-[#67b7f7] hover:bg-[#4da9f3]
                rounded-md text-white text-[20px] font-bold
                transition disabled:opacity-60 disabled:cursor-not-allowed mt-2
              "
            >
              {loading ? 'Mendaftar...' : 'Daftar'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600 text-[15px]">
            Sudah punya akun?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-[#60a5fa] font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;
