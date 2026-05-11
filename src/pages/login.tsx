import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  // State untuk ngatur tampilan: 'login', 'signup', 'forgot', 'otp', 'reset', 'success'
  const [view, setView] = useState('login');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Panel Kiri (Ilustrasi)
  const LeftPanel = ({ isSignup = false }) => (
    <div className={`hidden lg:flex w-1/2 items-center justify-center relative overflow-hidden ${isSignup ? 'bg-sky-100' : 'bg-slate-100'}`}>
      {isSignup ? (
        <div className="w-full h-full flex items-center justify-center p-20">
            {/* Ganti src dengan file image ilustrasi King */}
            <img src="/signup-illustration.png" alt="Illustration" className="max-w-full h-auto object-contain" />
        </div>
      ) : (
        <div className="absolute w-[120%] h-[120%] -rotate-12 flex flex-wrap gap-4 opacity-70 pointer-events-none p-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-64 h-96 bg-white shadow-2xl rounded-lg border border-slate-200 p-4 shrink-0">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                  <div className="grow space-y-2">
                    <div className="h-2 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-2 bg-slate-200 rounded w-1/3"></div>
                  </div>
               </div>
               <div className="space-y-3">
                  <div className="h-2 bg-slate-100 rounded"></div>
                  <div className="h-2 bg-slate-100 rounded"></div>
                  <div className="h-2 bg-slate-100 rounded w-4/5"></div>
               </div>
            </div>
          ))}
        </div>
      )}
      <button 
        onClick={() => view === 'login' ? navigate('/') : setView('login')}
        className="absolute top-8 left-8 text-slate-500 hover:text-slate-800 transition"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      </button>
    </div>
  );

  const renderContent = () => {
    switch (view) {
      case 'login':
        return (
          <div className="w-full max-w-md">
            <h1 className="text-7xl font-bold text-sky-300 mb-12 text-center tracking-tight">Login</h1>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-lg font-bold text-slate-800">Email</label>
                <input type="email" placeholder="Input Email" className="w-full px-4 py-4 rounded-xl border-2 border-sky-200 focus:border-sky-400 outline-none transition" />
              </div>
              <div className="space-y-2 relative">
                <label className="text-lg font-bold text-slate-800">Password</label>
                <input type="password" placeholder="Input Password" className={`w-full px-4 py-4 rounded-xl border-2 outline-none transition ${error ? 'border-red-400' : 'border-sky-200 focus:border-sky-400'}`} />
                <div className="flex justify-between items-center mt-2">
                  {error && <span className="text-red-500 font-bold">Wrong password</span>}
                  <button type="button" onClick={() => setView('forgot')} className="text-sky-400 font-bold hover:underline ml-auto">Forgot Password?</button>
                </div>
              </div>
              <button onClick={(e) => { e.preventDefault(); navigate('/templates'); }} className="w-full bg-sky-400 text-white font-bold py-4 rounded-xl text-xl hover:bg-sky-500 shadow-lg shadow-sky-100 transition">Login</button>
              
              <div className="flex items-center gap-4 py-2">
                <div className="grow h-[2px] bg-slate-800"></div>
                <span className="font-bold text-xl">OR</span>
                <div className="grow h-[2px] bg-slate-800"></div>
              </div>

              <button type="button" className="w-full flex items-center justify-center gap-3 bg-sky-400 text-white font-bold py-4 rounded-xl text-xl hover:bg-sky-500 shadow-lg shadow-sky-100 transition">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" className="w-6 h-6 bg-white p-1 rounded-sm" alt="G" />
                Continue With Google
              </button>

              <p className="text-center font-medium">Not Registered Yet? <button onClick={() => setView('signup')} className="text-sky-400 font-bold hover:underline">Sign Up</button></p>
            </form>
          </div>
        );

      case 'signup':
        return (
          <div className="w-full max-w-md">
            <h1 className="text-7xl font-bold text-sky-300 mb-8 text-center tracking-tight">Sign up</h1>
            <form className="space-y-4">
              {['Name', 'Username', 'Email'].map((field) => (
                <div key={field} className="space-y-1">
                  <label className="font-bold text-slate-800">{field}</label>
                  <input type="text" placeholder={`Input ${field}`} className="w-full px-4 py-3 rounded-xl border-2 border-sky-200 focus:border-sky-400 outline-none transition" />
                </div>
              ))}
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Password</label>
                <input type="password" placeholder="Input Password" className="w-full px-4 py-3 rounded-xl border-2 border-sky-200 focus:border-sky-400 outline-none transition" />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-800">Verify Password</label>
                <input type="password" placeholder="Input Verify Password" className="w-full px-4 py-3 rounded-xl border-2 border-sky-200 focus:border-sky-400 outline-none transition" />
              </div>
              <button onClick={() => setView('login')} className="w-full bg-sky-400 text-white font-bold py-4 rounded-xl text-xl mt-6 hover:bg-sky-500 transition">Sign up</button>
              <p className="text-center font-medium mt-4">Already have account? <button onClick={() => setView('login')} className="text-sky-400 font-bold hover:underline">Login</button></p>
            </form>
          </div>
        );

      case 'forgot':
        return (
          <div className="w-full max-w-md">
            <h1 className="text-6xl font-bold text-sky-300 mb-2">Forgot Password</h1>
            <p className="text-slate-400 font-bold mb-10">Please enter your email to reset the password</p>
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-lg font-bold text-slate-800">Email</label>
                <input type="email" placeholder="Input Email" className="w-full px-4 py-4 rounded-xl border-2 border-sky-200 focus:border-sky-400 outline-none transition" />
              </div>
              <button onClick={() => setView('otp')} className="w-full bg-sky-400 text-white font-bold py-4 rounded-xl text-xl hover:bg-sky-500 transition">Reset password</button>
            </div>
          </div>
        );

      case 'otp':
        return (
          <div className="w-full max-w-md">
            <h1 className="text-6xl font-bold text-sky-300 mb-2">Forgot Password</h1>
            <p className="text-slate-400 font-bold mb-10">We sent you a code to your email, please check your email!</p>
            <div className="flex justify-between gap-2 mb-10">
              {[...Array(6)].map((_, i) => (
                <input key={i} type="text" maxLength={1} className="w-14 h-16 text-center text-2xl font-bold border-2 border-slate-200 rounded-xl focus:border-sky-400 outline-none" />
              ))}
            </div>
            <button onClick={() => setView('reset')} className="w-full bg-sky-400 text-white font-bold py-4 rounded-xl text-xl hover:bg-sky-500 transition">Reset password</button>
            <p className="text-center font-medium mt-6 text-slate-400">Haven't got the email yet? <button className="text-sky-400 font-bold hover:underline">Resent email</button></p>
          </div>
        );

      case 'reset':
        return (
          <div className="w-full max-w-md">
            <h1 className="text-6xl font-bold text-sky-300 mb-2">Set a new password</h1>
            <p className="text-slate-400 font-bold mb-10">Create a new password. Ensure it differs from previous ones for security</p>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-lg font-bold text-slate-800">Password</label>
                <input type="password" placeholder="Enter your new password" className="w-full px-4 py-4 rounded-xl border-2 border-sky-200 focus:border-sky-400 outline-none transition" />
              </div>
              <div className="space-y-2">
                <label className="text-lg font-bold text-slate-800">Confirm password</label>
                <input type="password" placeholder="Re-enter password" className="w-full px-4 py-4 rounded-xl border-2 border-sky-200 focus:border-sky-400 outline-none transition" />
              </div>
              <button onClick={() => setView('success')} className="w-full bg-sky-400 text-white font-bold py-4 rounded-xl text-xl hover:bg-sky-500 transition">Update password</button>
            </form>
          </div>
        );

      case 'success':
        return (
          <div className="w-full max-w-md text-center">
            <h1 className="text-7xl font-bold text-sky-300 mb-4 tracking-tight">Successfull</h1>
            <p className="text-slate-400 text-xl font-bold mb-12">Congratulations! Your password has been changed.</p>
            <button onClick={() => setView('login')} className="w-full bg-sky-400 text-white font-bold py-4 rounded-xl text-xl hover:bg-sky-500 transition shadow-lg shadow-sky-100">Back to login</button>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      <LeftPanel isSignup={view === 'signup'} />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative">
        {renderContent()}
      </div>
    </div>
  );
};

export default Login;