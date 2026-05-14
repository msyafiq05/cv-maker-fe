// src/pages/ForgotPassword.tsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginImg from '../assets/login.png';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState('');

  const [otp, setOtp] = useState(['', '', '', '']);

  // STEP 1
  const handleSendOtp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      alert('Masukkan email terlebih dahulu!');
      return;
    }

    setStep(2);
  };

  // STEP 2
  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerifyOtp = () => {
    const finalOtp = otp.join('');

    if (finalOtp.length !== 4) {
      alert('Masukkan kode OTP lengkap!');
      return;
    }

    alert('OTP berhasil diverifikasi!');
    navigate('/login');
  };

  return (
    <div className="w-full h-screen flex overflow-hidden bg-[#f7f7f7]">

      {/* ================= LEFT IMAGE ================= */}
      <div className="hidden lg:block lg:w-1/2 h-full">
        <img
          src={loginImg}
          alt="forgot-password"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ================= RIGHT CONTENT ================= */}
      <div className="w-full lg:w-1/2 h-full relative flex items-center justify-center bg-[#f5f5f5]">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate('/login')}
          className="absolute top-8 left-8 text-gray-500 hover:text-black transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* ================= CONTAINER ================= */}
        <div className="w-full max-w-[520px] px-8">

          {/* TITLE */}
          <h1 className="text-[68px] font-bold text-[#7ec8f8] whitespace-nowrap leading-none mb-4">
            Forgot Password
          </h1>

          {/* SUBTITLE */}
          <p className="text-[18px] text-gray-400 font-semibold mb-14">
            Please enter your email to reset the password
          </p>

          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <form onSubmit={handleSendOtp}>

              {/* EMAIL */}
              <div className="mb-8">

                <label className="block text-[18px] font-bold mb-3 text-black">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Input Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full
                    h-[56px]
                    border
                    border-[#8fd0ff]
                    rounded-md
                    px-4
                    text-[18px]
                    outline-none
                    bg-transparent
                    focus:ring-2
                    focus:ring-[#74c0fc]
                  "
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="
                  w-full
                  h-[58px]
                  bg-[#74c0fc]
                  hover:bg-[#5bb6f5]
                  text-white
                  text-[20px]
                  font-bold
                  rounded-md
                  transition
                "
              >
                Reset password
              </button>

            </form>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <div>

              {/* OTP INPUT */}
              <div className="flex justify-center gap-4 mb-10">

                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleOtpChange(e.target.value, index)
                    }
                    className="
                      w-[60px]
                      h-[60px]
                      border
                      border-[#8fd0ff]
                      rounded-md
                      text-center
                      text-[24px]
                      outline-none
                      focus:ring-2
                      focus:ring-[#74c0fc]
                    "
                  />
                ))}

              </div>

              {/* BUTTON */}
              <button
                onClick={handleVerifyOtp}
                className="
                  w-full
                  h-[58px]
                  bg-[#74c0fc]
                  hover:bg-[#5bb6f5]
                  text-white
                  text-[20px]
                  font-bold
                  rounded-md
                  transition
                "
              >
                Reset password
              </button>

              {/* RESEND */}
              <p className="text-center text-[14px] text-gray-400 mt-6">
                Haven't got the email yet?{' '}
                <span className="text-[#74c0fc] cursor-pointer hover:underline">
                  Resend OTP
                </span>
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;