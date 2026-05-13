import { useState } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState({
    fullName: 'Alexa Rawles',
    email: 'alexarawles@gmail.com',
    username: '@alexxarw_',
    phone: '081249837470',
    country: 'English',
    skills: 'Communication, Teamwork, Problem Solving',
    about: 'UI/UX Designer with a strong interest in creating intuitive and user friendly',
    socialMedia: 'Instagram : @alexxarw'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* MAIN CONTENT ONLY - Navbar & Footer ditangani Layout.tsx */}
      <div className="max-w-7xl mx-auto w-full px-8 py-12">
        
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-12">
          <div className="w-24 h-24 bg-slate-200 rounded-full overflow-hidden border-4 border-white shadow-md">
            <img src="https://via.placeholder.com/150" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{userData.fullName}</h1>
            <p className="text-slate-500 font-medium text-lg">{userData.email}</p>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
          <div className="space-y-2">
            <label className="block font-bold text-slate-700 text-lg">Full Name</label>
            <input 
              type="text" name="fullName" value={userData.fullName} onChange={handleInputChange}
              className="w-full px-5 py-4 bg-sky-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-sky-200 transition text-slate-600 font-medium" 
            />
          </div>
          <div className="space-y-2">
            <label className="block font-bold text-slate-700 text-lg">Email</label>
            <input 
              type="email" name="email" value={userData.email} onChange={handleInputChange}
              className="w-full px-5 py-4 bg-sky-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-sky-200 transition text-slate-600 font-medium" 
            />
          </div>
          <div className="space-y-2">
            <label className="block font-bold text-slate-700 text-lg">Username</label>
            <input 
              type="text" name="username" value={userData.username} onChange={handleInputChange}
              className="w-full px-5 py-4 bg-sky-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-sky-200 transition text-slate-600 font-medium" 
            />
          </div>
          <div className="space-y-2">
            <label className="block font-bold text-slate-700 text-lg">Phone Number</label>
            <input 
              type="text" name="phone" value={userData.phone} onChange={handleInputChange}
              className="w-full px-5 py-4 bg-sky-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-sky-200 transition text-slate-600 font-medium" 
            />
          </div>
          <div className="space-y-2 relative">
            <label className="block font-bold text-slate-700 text-lg">Country</label>
            <select 
              name="country" value={userData.country} onChange={handleInputChange}
              className="w-full px-5 py-4 bg-sky-50 rounded-xl border-none outline-none appearance-none focus:ring-2 focus:ring-sky-200 transition cursor-pointer text-slate-600 font-medium"
            >
              <option>English</option>
              <option>Indonesia</option>
            </select>
            <div className="absolute right-5 top-[52px] pointer-events-none text-slate-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
          <div className="space-y-2">
            <label className="block font-bold text-slate-700 text-lg">Skills</label>
            <input 
              type="text" name="skills" value={userData.skills} onChange={handleInputChange}
              className="w-full px-5 py-4 bg-sky-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-sky-200 transition text-slate-600 font-medium" 
            />
          </div>
          <div className="space-y-2">
            <label className="block font-bold text-slate-700 text-lg">About</label>
            <input 
              type="text" name="about" value={userData.about} onChange={handleInputChange}
              className="w-full px-5 py-4 bg-sky-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-sky-200 transition text-slate-600 font-medium" 
            />
          </div>
          <div className="space-y-2">
            <label className="block font-bold text-slate-700 text-lg">Social Media</label>
            <input 
              type="text" name="socialMedia" value={userData.socialMedia} onChange={handleInputChange}
              className="w-full px-5 py-4 bg-sky-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-sky-200 transition text-slate-600 font-medium" 
            />
          </div>
        </div>

        {/* Email Address Section */}
        <div className="mt-20 space-y-8">
          <h2 className="text-2xl font-bold text-slate-800">My email Address</h2>
          <div className="flex items-start gap-5">
            <div className="p-4 bg-sky-100 text-sky-500 rounded-full shadow-sm">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-slate-800 text-lg">{userData.email}</p>
              <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">1 month ago</p>
            </div>
          </div>
          <button className="text-sky-400 font-extrabold text-lg hover:underline block ml-16">+ Add Email Address</button>
        </div>
        
      </div>
    </>
  );
};

export default Profile;