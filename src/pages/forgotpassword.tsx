import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImg from '../assets/login.png';
import { authApi } from '../services/api';

const ForgotPassword = () => {
  const navigate = useNavigate();
  
  // State UI
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  
  // State untuk OTP (6 digit) - Akan digunakan sebagai reset_token
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  // State untuk Password Baru
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // STEP 1: Kirim Email -> Dapat OTP / Token
  const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Masukkan email terlebih dahulu!');
      return;
    }

    setLoading(true);
    try {
      // Panggil API Backend
      const res = await authApi.forgotPassword(email);
      // Backend mengembalikan reset_token (di production dikirim via email)
      setSuccess('Kode OTP / Token telah dikirim. Silakan cek email Anda.');
      setStep(2);
    } catch (err: any) {
      setError(err?.message ?? 'Email tidak ditemukan atau terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Handle Input OTP
  const handleOtpChange = (value: string, index: number) => {
    // Hanya izinkan angka
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
    setError('');
    const finalOtp = otp.join('');
    if (finalOtp.length !== 6) {
      setError('Masukkan kode OTP lengkap (6 digit)!');
      return;
    }
    setStep(3);
  };

  // STEP 3: Simpan Password Baru -> Hit API Reset Password
  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!newPassword || !confirmPassword) {
      setError('Semua field wajib diisi!');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Konfirmasi password tidak cocok!');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password minimal 6 karakter!');
      return;
    }

    setLoading(true);
    const finalOtp = otp.join(''); // OTP 6 digit digunakan sebagai reset_token
    try {
      await authApi.resetPassword({
        reset_token: finalOtp,
        password: newPassword,
        password_confirmation: confirmPassword,
      });
      setSuccess('Password berhasil direset!');
      setStep(4); // Pindah ke halaman Success
    } catch (err: any) {
      setError(err?.message ?? 'Token / OTP tidak valid atau sudah kadaluarsa.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex overflow-hidden bg-white">
      {/* LEFT IMAGE */}
      <div className="hidden lg:block lg:w-1/2 h-full">
        <img src={loginImg} alt="forgot-password" className="w-full h-full object-cover" />
      </div>

      {/* RIGHT CONTENT */}
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
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div className="w-full max-w-[550px] px-8 text-left">
          {/* TITLE */}
          <h1 className="text-[54px] font-bold text-[#7ec8f8] whitespace-nowrap mb-2 text-left">
            {step === 3 && "Set a new password"}
            {step === 4 && "Successfull"}
            {step < 3 && "Forgot Password"}
          </h1>

          {/* SUBTITLE / DESKRIPSI */}
          <p className="text-[17px] text-gray-400 font-medium mb-8 text-left leading-relaxed">
            {step === 1 && "Please enter your email to reset the password"}
            {step === 2 && "We sent you a code to your email, please check your email!"}
            {step === 3 && (
              <>
                Create a new password. Ensure it differs from previous ones <br /> for security
              </>
            )}
            {step === 4 && "Congratulations! Your password has been changed."}
          </p>

          {/* MENAMPILKAN PESAN ERROR / SUCCESS SECARA GLOBAL */}
          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm font-medium">
              {success}
            </div>
          )}

          {/* STEP 1: INPUT EMAIL */}
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
              <button 
                type="submit" 
                disabled={loading}
                className="w-full h-[58px] bg-[#74c0fc] hover:bg-[#5bb6f5] text-white text-[20px] font-bold rounded-xl transition shadow-md disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Reset password'}
              </button>
            </form>
          )}

          {/* STEP 2: INPUT OTP */}
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
                Verify OTP
              </button>

              <p className="text-[16px] text-gray-400 mt-8 text-center">
                Haven't got the email yet?{' '}
                <span 
                  className="text-[#74c0fc] font-bold cursor-pointer hover:underline"
                  onClick={() => { setStep(1); setError(''); }}
                >
                  Resend email
                </span>
              </p>
            </div>
          )}

          {/* STEP 3: SET NEW PASSWORD */}
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
                disabled={loading}
                className="w-full h-[58px] bg-[#74c0fc] hover:bg-[#5bb6f5] text-white text-[20px] font-bold rounded-xl transition shadow-md disabled:opacity-60"
              >
                {loading ? 'Updating...' : 'Update password'}
              </button>
            </form>
          )}

          {/* STEP 4: SUCCESS PAGE */}
          {step === 4 && (
            <div className="w-full mt-8">
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