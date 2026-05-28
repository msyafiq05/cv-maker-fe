// src/pages/signup.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signupImg from '../assets/signup.png'; 

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && username && email && password && verifyPassword) {
      if (password !== verifyPassword) {
        alert('Password dan Verify Password tidak cocok!');
        return;
      }
      setIsSuccess(true);
    } else {
      alert('Mohon isi semua field!');
    }
  };

  return (
    // MENGUNCI LAYAR: Mengubah min-h-screen menjadi h-screen dan menambah overflow-hidden
    <div className="w-full h-screen flex bg-[#f5f5f5] overflow-hidden select-none">

      {/* LEFT SIDE: BACKGROUND BIRU (Tinggi pas h-screen) */}
      <div className="hidden lg:flex lg:w-1/2 h-screen sticky top-0 bg-[#7fc7ff] items-center justify-center p-12 xl:p-16">
        <img
          src={signupImg}
          alt="Sign up illustration"
          className="w-full h-auto max-w-[360px] xl:max-w-[420px] object-contain" 
        />
      </div>

      {/* RIGHT SIDE: Diubah ke h-screen & overflow-hidden agar tidak meluber atau memicu scrollbar */}
      <div className="w-full lg:w-1/2 h-screen bg-white relative flex items-center justify-center px-6 md:px-16 overflow-hidden">
        
        {!isSuccess ? (
          /* ========================================================= */
          /* 1. TAMPILAN UTAMA: FORM REGISTER                         */
          /* ========================================================= */
          <div className="w-full max-w-[400px] flex flex-col justify-center animate-fade-in">
            {/* Mengurangi ukuran text & margin bawah judul agar space lebih efisien */}
            <h1 className="text-center text-[38px] md:text-[44px] font-bold text-[#74c0fc] mb-3 tracking-wide">
              Sign up
            </h1>

            {/* Mengurangi space-y menjadi 2.5 (10px) supaya muat dalam 1 layar */}
            <form onSubmit={handleSignup} className="w-full space-y-[10px]">
              {/* NAME */}
              <div>
                <label className="block text-[14px] font-semibold mb-0.5 text-black">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Input Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-[38px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[14px] bg-transparent focus:ring-2 focus:ring-[#74c0fc] transition-all"
                />
              </div>

              {/* USERNAME */}
              <div>
                <label className="block text-[14px] font-semibold mb-0.5 text-black">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Input Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full h-[38px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[14px] bg-transparent focus:ring-2 focus:ring-[#74c0fc] transition-all"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-[14px] font-semibold mb-0.5 text-black">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Input Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[38px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[14px] bg-transparent focus:ring-2 focus:ring-[#74c0fc] transition-all"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-[14px] font-semibold mb-0.5 text-black">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Input Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[38px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[14px] bg-transparent focus:ring-2 focus:ring-[#74c0fc] transition-all"
                />
              </div>

              {/* VERIFY PASSWORD */}
              <div>
                <label className="block text-[14px] font-semibold mb-0.5 text-black">
                  Verify Password
                </label>
                <input
                  type="password"
                  placeholder="Input Verify Password"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  className="w-full h-[38px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[14px] bg-transparent focus:ring-2 focus:ring-[#74c0fc] transition-all"
                />
              </div>

              {/* SIGN UP BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-[42px] bg-[#67b7f7] hover:bg-[#4da9f3] rounded-md text-white text-[16px] md:text-[18px] font-bold transition-all shadow-sm active:scale-[0.99]"
                >
                  Sign up
                </button>
              </div>
            </form>

            <p className="text-center mt-3 text-gray-500 text-[14px]">
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
          /* 2. TAMPILAN KEDUA: SIGN UP SUCCESS                        */
          /* ========================================================= */
          <div className="w-full max-w-[440px] flex flex-col items-center justify-center text-center animate-fade-in px-4">
            <h2 className="text-[40px] md:text-[52px] font-bold text-[#67b7f7] leading-tight tracking-wide">
              Successfull
            </h2>
            
            <p className="text-gray-400 text-[14px] md:text-[15px] mt-2 mb-8 max-w-[320px] font-medium leading-relaxed">
              Congratulations! Your account has been registered.
            </p>

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