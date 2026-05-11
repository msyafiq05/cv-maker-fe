import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [view, setView] = useState<'login' | 'signup' | 'forgot' | 'otp' | 'reset' | 'success'>('login');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const LeftPanel = ({ isSignup = false }) => (
    <div className={`hidden lg:flex w-1/2 items-center justify-center relative overflow-hidden ${isSignup ? 'bg-sky-100' : 'bg-slate-100'}`}>
      {isSignup ? (
        <div className="w-full h-full flex items-center justify-center p-20">
          <div className="w-full max-w-md aspect-square bg-white rounded-3xl shadow-xl border-2 border-dashed border-sky-300 flex items-center justify-center text-sky-400 font-black uppercase tracking-widest">
            Sign Up Illustration
          </div>
        </div>
      ) : (
        <div className="absolute w-[120%] h-[120%] -rotate-12 flex flex-wrap gap-6 opacity-70 pointer-events-none p-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-64 h-96 bg-white shadow-2xl rounded-2xl border border-slate-200 p-6 shrink-0">
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                  <div className="grow space-y-2">
                    <div className="h-3 bg-slate-200 rounded-full w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded-full w-1/2"></div>
                  </div>
               </div>
               <div className="space-y-4">
                  <div className="h-3 bg-slate-100 rounded-full"></div>
                  <div className="h-3 bg-slate-100 rounded-full"></div>
                  <div className="h-3 bg-slate-100 rounded-full w-5/6"></div>
                  <div className="h-32 bg-sky-50 rounded-xl mt-4"></div>
               </div>
            </div>
          ))}
        </div>
      )}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-10 left-10 p-3 bg-white rounded-full shadow-lg text-slate-600 hover:text-sky-500 transition group"
      >
        <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
      </button>
    </div>
  );

  const renderContent = () => {
    switch (view) {
      case 'login':
        return (
          <div className="w-full max-w-md animate-in fade-in slide-in-from-right-4 duration-500">
            <h1 className="text-8xl font-black text-sky-300 mb-12 text-center tracking-tighter uppercase">Login</h1>
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); navigate('/templates'); }}>
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Email</label>
                <input type="email" placeholder="Input Email" className="w-full px-6 py-5 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-sky-400 outline-none transition-all font-bold" required />
              </div>
              <div className="space-y-2 relative">
                <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Password</label>
                <input type="password" placeholder="Input Password" className={`w-full px-6 py-5 rounded-2xl border-2 bg-slate-50 focus:bg-white outline-none transition-all font-bold ${error ? 'border-red-400' : 'border-slate-100 focus:border-sky-400'}`} required />
                <div className="flex justify-between items-center mt-3 px-1">
                  {error && <span className="text-red-500 font-black text-xs uppercase">Wrong password</span>}
                  <button type="button" onClick={() => setView('forgot')} className="text-sky-400 font-black text-xs uppercase hover:underline ml-auto tracking-widest">Forgot Password?</button>
                </div>
              </div>
              <button type="submit" className="w-full bg-sky-400 text-white font-black py-5 rounded-2xl text-xl hover:bg-sky-500 shadow-xl shadow-sky-100 transition-all uppercase tracking-widest">Login</button>
              
              <div className="flex items-center gap-4 py-2">
                <div className="grow h-[2px] bg-slate-100"></div>
                <span className="font-black text-slate-300 text-sm uppercase tracking-widest">OR</span>
                <div className="grow h-[2px] bg-slate-100"></div>
              </div>

              <button type="button" className="w-full flex items-center justify-center gap-4 bg-white border-2 border-slate-100 text-slate-600 font-black py-5 rounded-2xl text-lg hover:border-sky-400 transition-all uppercase tracking-widest">
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" className="w-6 h-6" alt="G" />
                Continue With Google
              </button>

              <p className="text-center font-bold text-slate-400 uppercase text-xs tracking-widest">
                Not Registered Yet? <button type="button" onClick={() => setView('signup')} className="text-sky-400 font-black hover:underline">Sign Up</button>
              </p>
            </form>
          </div>
        );

      case 'signup':
        return (
          <div className="w-full max-w-md animate-in fade-in slide-in-from-right-4 duration-500">
            <h1 className="text-8xl font-black text-sky-300 mb-10 text-center tracking-tighter uppercase">Sign up</h1>
            <form className="space-y-4">
              {['Name', 'Username', 'Email'].map((field) => (
                <div key={field} className="space-y-1">
                  <label className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1">{field}</label>
                  <input type="text" placeholder={`Input ${field}`} className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-sky-400 outline-none transition-all font-bold" />
                </div>
              ))}
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1">Password</label>
                <input type="password" placeholder="Input Password" className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-sky-400 outline-none transition-all font-bold" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-700 uppercase tracking-widest ml-1">Verify Password</label>
                <input type="password" placeholder="Input Verify Password" className="w-full px-5 py-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-sky-400 outline-none transition-all font-bold" />
              </div>
              <button type="button" onClick={() => setView('login')} className="w-full bg-sky-400 text-white font-black py-5 rounded-2xl text-lg mt-6 hover:bg-sky-500 shadow-xl shadow-sky-100 transition-all uppercase tracking-widest">Sign up</button>
              <p className="text-center font-bold text-slate-400 uppercase text-xs tracking-widest mt-6">
                Already have account? <button type="button" onClick={() => setView('login')} className="text-sky-400 font-black hover:underline">Login</button>
              </p>
            </form>
          </div>
        );

      case 'forgot':
        return (
          <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
             <button onClick={() => setView('login')} className="mb-8 text-slate-400 hover:text-slate-800 transition flex items-center gap-2 font-black uppercase text-xs tracking-widest">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
              Back
            </button>
            <h1 className="text-6xl font-black text-sky-300 mb-4 tracking-tighter uppercase leading-tight">Forgot <br/>Password</h1>
            <p className="text-slate-400 font-bold mb-12 uppercase text-xs tracking-widest">Please enter your email to reset the password</p>
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Email</label>
                <input type="email" placeholder="Input Email" className="w-full px-6 py-5 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-sky-400 outline-none transition-all font-bold" />
              </div>
              <button onClick={() => setView('otp')} className="w-full bg-sky-400 text-white font-black py-5 rounded-2xl text-xl hover:bg-sky-500 shadow-xl shadow-sky-100 transition-all uppercase tracking-widest">Reset password</button>
            </div>
          </div>
        );

      case 'otp':
        return (
          <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
            <h1 className="text-6xl font-black text-sky-300 mb-4 tracking-tighter uppercase leading-tight">Forgot <br/>Password</h1>
            <p className="text-slate-400 font-bold mb-12 uppercase text-xs tracking-widest">We sent you a code to your email, please check your email!</p>
            <div className="flex justify-between gap-3 mb-12">
              {[...Array(6)].map((_, i) => (
                <input key={i} type="text" maxLength={1} className="w-full aspect-square text-center text-3xl font-black border-2 border-slate-100 bg-slate-50 rounded-2xl focus:border-sky-400 focus:bg-white outline-none transition-all" />
              ))}
            </div>
            <button onClick={() => setView('reset')} className="w-full bg-sky-400 text-white font-black py-5 rounded-2xl text-xl hover:bg-sky-500 shadow-xl shadow-sky-100 transition-all uppercase tracking-widest">Reset password</button>
            <p className="text-center font-bold mt-8 text-slate-400 uppercase text-xs tracking-widest">
              Haven't got the email yet? <button className="text-sky-400 font-black hover:underline">Resent email</button>
            </p>
          </div>
        );

      case 'reset':
        return (
          <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
            <h1 className="text-6xl font-black text-sky-300 mb-4 tracking-tighter uppercase leading-tight">Set a new <br/>password</h1>
            <p className="text-slate-400 font-bold mb-12 uppercase text-xs tracking-widest">Create a new password. Ensure it differs from previous ones</p>
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setView('success'); }}>
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Password</label>
                <input type="password" placeholder="Enter your new password" className="w-full px-6 py-5 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-sky-400 outline-none transition-all font-bold" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Confirm password</label>
                <input type="password" placeholder="Re-enter password" className="w-full px-6 py-5 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-sky-400 outline-none transition-all font-bold" required />
              </div>
              <button type="submit" className="w-full bg-sky-400 text-white font-black py-5 rounded-2xl text-xl hover:bg-sky-500 shadow-xl shadow-sky-100 transition-all uppercase tracking-widest">Update password</button>
            </form>
          </div>
        );

      case 'success':
        return (
          <div className="w-full max-w-md text-center animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h1 className="text-7xl font-black text-sky-300 mb-4 tracking-tighter uppercase">Successfull</h1>
            <p className="text-slate-400 text-lg font-bold mb-12 uppercase tracking-widest px-4">Congratulations! Your password has been changed.</p>
            <button onClick={() => setView('login')} className="w-full bg-sky-400 text-white font-black py-5 rounded-2xl text-xl hover:bg-sky-500 shadow-xl shadow-sky-100 transition-all uppercase tracking-widest">Back to login</button>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans overflow-hidden">
      <LeftPanel isSignup={view === 'signup'} />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-20 relative">
        {renderContent()}
      </div>
    </div>
  );
};

export default Login;