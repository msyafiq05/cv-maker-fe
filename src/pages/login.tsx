import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Di sini King bisa kasih validasi sederhana
    if (email !== "" && password !== "") {
      // PROSES KRUSIAL: Simpan status login di browser
      localStorage.setItem('isLoggedIn', 'true');
      
      // Tendang balik ke Landing Page
      navigate('/');
      
      // Refresh sebentar biar Navbar-nya sadar kalau status sudah berubah
      window.location.reload();
    } else {
      alert("King, tolong isi email dan passwordnya dulu!");
    }
  };

  return (
    <div className="min-h-screen bg-sky-400 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-[40px] p-12 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-sky-400 tracking-tighter uppercase italic">Welcome Back</h1>
          <p className="text-slate-400 font-bold mt-2 uppercase text-xs tracking-widest">Login to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-[0.2em] ml-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="king@ub.ac.id" 
              className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-sky-400 focus:bg-white transition font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-700 uppercase tracking-[0.2em] ml-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl outline-none focus:border-sky-400 focus:bg-white transition font-medium"
            />
          </div>

          <div className="flex justify-end">
            <span className="text-xs font-bold text-sky-400 hover:underline cursor-pointer">Forgot Password?</span>
          </div>

          <button 
            type="submit"
            className="w-full bg-sky-400 text-white font-black py-5 rounded-2xl text-lg shadow-xl shadow-sky-100 hover:bg-sky-500 transition uppercase tracking-widest mt-4"
          >
            Login
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-400 font-bold">
            Don't have an account? <span className="text-sky-400 hover:underline cursor-pointer">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;