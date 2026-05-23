import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImg from '../assets/login.png';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  
  // State untuk OTP (6 digit)
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  // State untuk Step 3 (Password Baru)
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // STEP 1: Kirim Email
  const handleSendOtp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      alert('Masukkan email terlebih dahulu!');
      return;
    }
    setStep(2);
  };

  // STEP 2: Handle Input OTP
  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Otomatis pindah ke kotak berikutnya
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  // STEP 2: Verifikasi OTP (Pindah ke Step 3)
  const handleVerifyOtp = () => {
    const finalOtp = otp.join('');
    if (finalOtp.length !== 6) {
      alert('Masukkan kode OTP lengkap!');
      return;
    }
    setStep(3);
  };

  // STEP 3: Simpan Password Baru (Pindah ke Step 4 / Success)
  const handleUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      alert('Semua field password wajib diisi!');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Konfirmasi password tidak cocok!');
      return;
    }
    
    setStep(4);
  };

  return (
    <div className="w-full h-screen flex overflow-hidden bg-white">

      {/* ================= LEFT IMAGE ================= */}
      <div className="hidden lg:block lg:w-1/2 h-full">
        <img
          src={loginImg}
          alt="forgot-password"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ================= RIGHT CONTENT ================= */}
      <div className="w-full lg:w-1/2 h-full relative flex items-center justify-center bg-white">

        {/* BACK BUTTON */}
        {step < 4 && (
          <button
            onClick={() => {
              if (step === 1) navigate('/login');
              else setStep(step - 1);
            }}
            className="absolute top-8 left-8 text-gray-400 hover:text-black transition"
          >
            <svg xmlns="http://www.w3.org/2000/xl" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* ================= CONTAINER ================= */}
        <div className="w-full max-w-[550px] px-8 text-left">

          {/* TITLE - Diubah ke text-left */}
          <h1 className="text-[54px] font-bold text-[#7ec8f8] whitespace-nowrap mb-2 text-left">
            {step === 3 && "Set a new password"}
            {step === 4 && "Successfull"}
            {step < 3 && "Forgot Password"}
          </h1>

          {/* SUBTITLE / DESKRIPSI - Diubah ke text-left agar sejajar */}
          <p className="text-[17px] text-gray-400 font-medium mb-12 text-left leading-relaxed">
            {step === 1 && "Please enter your email to reset the password"}
            {step === 2 && "We sent you a code to your email, please check your email!"}
            {step === 3 && (
              <>
                Create a new password. Ensure it differs from previous ones <br /> for security
              </>
            )}
            {step === 4 && "Congratulations! Your password has been changed."}
          </p>

          {/* ================= STEP 1: INPUT EMAIL ================= */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="text-left">
              <div className="mb-8">
                <label className="block text-[18px] font-bold mb-3 text-black">Email</label>
                <input
                  type="email"
                  placeholder="Input Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[56px] border border-[#8fd0ff] rounded-xl px-4 text-[18px] outline-none focus:ring-2 focus:ring-[#74c0fc]"
                />
              </div>
              <button type="submit" className="w-full h-[58px] bg-[#74c0fc] hover:bg-[#5bb6f5] text-white text-[20px] font-bold rounded-xl transition shadow-md">
                Reset password
              </button>
            </form>
          )}

          {/* ================= STEP 2: INPUT OTP ================= */}
          {step === 2 && (
            <div className="w-full">
              <div className="flex justify-between gap-2 mb-10">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    className="w-[65px] h-[65px] border-2 border-gray-200 rounded-xl text-center text-[24px] font-bold outline-none focus:border-[#74c0fc] focus:ring-1 focus:ring-[#74c0fc] transition-all"
                  />
                ))}
              </div>

              <button
                onClick={handleVerifyOtp}
                className="w-full h-[58px] bg-[#74c0fc] hover:bg-[#5bb6f5] text-white text-[20px] font-bold rounded-xl transition shadow-md"
              >
                Reset password
              </button>

              <p className="text-[16px] text-gray-400 mt-8 text-center">
                Haven't got the email yet?{' '}
                <span className="text-[#74c0fc] font-bold cursor-pointer hover:underline">
                  Resent email
                </span>
              </p>
            </div>
          )}

          {/* ================= STEP 3: SET NEW PASSWORD ================= */}
          {step === 3 && (
            <form onSubmit={handleUpdatePassword} className="text-left">
              <div className="mb-6">
                <label className="block text-[18px] font-bold mb-3 text-black">Password</label>
                <input
                  type="password"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-[56px] border border-gray-200 rounded-xl px-4 text-[18px] outline-none focus:border-[#74c0fc] focus:ring-1 focus:ring-[#74c0fc] transition-all"
                />
              </div>

              <div className="mb-10">
                <label className="block text-[18px] font-bold mb-3 text-black">Confirm password</label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-[56px] border border-gray-200 rounded-xl px-4 text-[18px] outline-none focus:border-[#74c0fc] focus:ring-1 focus:ring-[#74c0fc] transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full h-[58px] bg-[#74c0fc] hover:bg-[#5bb6f5] text-white text-[20px] font-bold rounded-xl transition shadow-md"
              >
                Update password
              </button>
            </form>
          )}

          {/* ================= STEP 4: SUCCESS PAGE ================= */}
          {step === 4 && (
            <div className="w-full">
              <button
                onClick={() => navigate('/login')}
                className="w-full h-[58px] bg-[#74c0fc] hover:bg-[#5bb6f5] text-white text-[20px] font-bold rounded-xl transition shadow-md"
              >
                Back to login
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;