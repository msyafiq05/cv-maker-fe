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

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && username && email && password && verifyPassword) {
      if (password !== verifyPassword) {
        alert('Password dan Verify Password tidak cocok!');
        return;
      }
      alert('Registrasi berhasil!');
      navigate('/login');
    } else {
      alert('Mohon isi semua field!');
    }
  };

  return (
  
    <div className="w-full h-screen flex overflow-hidden bg-[#f5f5f5]">

      {/* LEFT SIDE: IMAGE */}
      <div className="hidden lg:block lg:w-1/2 h-full">
        <img
          src={signupImg}
          alt="Sign up illustration"
          className="w-full h-full object-cover" 
        />
      </div>

      {/* RIGHT SIDE: FORM SIGN UP */}
      <div className="w-full lg:w-1/2 h-full bg-white relative flex items-center justify-center">

        {/* FORM CONTAINER */}
        <div className="w-full max-w-[440px] px-6">

          {/* TITLE */}
          <h1 className="text-center text-[64px] font-bold text-[#74c0fc] mb-6">
            Sign up
          </h1>

          <form onSubmit={handleSignup} className="space-y-4">
            
            {/* NAME */}
            <div>
              <label className="block text-[16px] font-semibold mb-1 text-black">
                Name
              </label>
              <input
                type="text"
                placeholder="Input Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-[46px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[15px] bg-transparent focus:ring-2 focus:ring-[#74c0fc]"
              />
            </div>

            {/* USERNAME */}
            <div>
              <label className="block text-[16px] font-semibold mb-1 text-black">
                Username
              </label>
              <input
                type="text"
                placeholder="Input Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-[46px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[15px] bg-transparent focus:ring-2 focus:ring-[#74c0fc]"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-[16px] font-semibold mb-1 text-black">
                Email
              </label>
              <input
                type="email"
                placeholder="Input Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-[46px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[15px] bg-transparent focus:ring-2 focus:ring-[#74c0fc]"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-[16px] font-semibold mb-1 text-black">
                Password
              </label>
              <input
                type="password"
                placeholder="Input Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[46px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[15px] bg-transparent focus:ring-2 focus:ring-[#74c0fc]"
              />
            </div>

            {/* VERIFY PASSWORD */}
            <div className="pb-2">
              <label className="block text-[16px] font-semibold mb-1 text-black">
                Verify Password
              </label>
              <input
                type="password"
                placeholder="Input Verify Password"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
                className="w-full h-[46px] px-4 border border-[#8fd0ff] rounded-md outline-none text-[15px] bg-transparent focus:ring-2 focus:ring-[#74c0fc]"
              />
            </div>

            {/* SIGN UP BUTTON */}
            <button
              type="submit"
              className="w-full h-[50px] bg-[#67b7f7] hover:bg-[#4da9f3] rounded-md text-white text-[20px] font-bold transition"
            >
              Sign up
            </button>
          </form>

          {/* FOOTER LINK */}
          <p className="text-center mt-6 text-gray-600 text-[14px]">
            Already have account?{' '}
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

export default Signup;