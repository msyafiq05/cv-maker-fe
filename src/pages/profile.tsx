// src/pages/profile.tsx

import { useState, useEffect } from 'react';
import { profileApi, getUser } from '../services/api';

const COUNTRIES = [
  'English', 'Indonesia', 'Malaysia', 'Singapore', 'Japan', 'United States',
  'Australia', 'Germany', 'France', 'Netherlands', 'South Korea', 'India',
];

const Profile = () => {
  const localUser = getUser();

  const [userData, setUserData] = useState({
    nama:          localUser?.nama          ?? '',
    username:      localUser?.username      ?? '',
    email:         localUser?.email         ?? '',
    phone:         localUser?.phone         ?? '',
    country:       localUser?.country       ?? 'English',
    skills:        localUser?.skills        ?? '',
    about:         localUser?.about         ?? '',
    social_media:  localUser?.social_media  ?? '',
    password:      '',
    password_confirmation: '',
  });

  const [loading, setLoading]   = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess]   = useState('');
  const [error, setError]       = useState('');

  useEffect(() => {
    profileApi.get()
      .then((res) => {
        const u = res.data ?? res;
        setUserData({
          nama:         u.nama          ?? '',
          username:     u.username      ?? '',
          email:        u.email         ?? '',
          phone:        u.phone         ?? '',
          country:      u.country       ?? 'English',
          skills:       u.skills        ?? '',
          about:        u.about         ?? '',
          social_media: u.social_media  ?? '',
          password:     '',
          password_confirmation: '',
        });
      })
      .catch(() => {/* pakai data lokal jika gagal */})
      .finally(() => setFetching(false));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (userData.password && userData.password !== userData.password_confirmation) {
      setError('Password dan konfirmasi password tidak cocok!');
      return;
    }

    setLoading(true);
    try {
      const payload: Record<string, string> = {
        nama:         userData.nama,
        username:     userData.username,
        email:        userData.email,
        phone:        userData.phone,
        country:      userData.country,
        skills:       userData.skills,
        about:        userData.about,
        social_media: userData.social_media,
      };
      if (userData.password) {
        payload.password              = userData.password;
        payload.password_confirmation = userData.password_confirmation;
      }

      const res = await profileApi.update(payload);
      const updatedUser = { ...localUser, ...res.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setSuccess('Profil berhasil diperbarui!');
      setUserData(prev => ({ ...prev, password: '', password_confirmation: '' }));
    } catch (err: any) {
      const firstError = err?.errors ? Object.values(err.errors)[0] as string : null;
      setError(firstError ?? err?.message ?? 'Gagal memperbarui profil.');
    } finally {
      setLoading(false);
    }
  };

  const initials = userData.nama ? userData.nama.charAt(0).toUpperCase() : 'U';

  if (fetching) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10rem 0' }}>
        <div style={{
          width: 40, height: 40,
          border: '4px solid #BBE4FB',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .profile-page {
          max-width: 860px;
          margin: 0 auto;
          padding: 2.5rem 2rem 4rem;
          font-family: 'Inter', sans-serif;
        }

        /* ── Avatar Row ── */
        .profile-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }
        .avatar-circle {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: #cce9f7;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          font-weight: 700;
          color: #3aaeea;
          flex-shrink: 0;
        }
        .profile-header-info h2 {
          margin: 0 0 2px;
          font-size: 1.15rem;
          font-weight: 700;
          color: #1a1a2e;
        }
        .profile-header-info p {
          margin: 0;
          font-size: 0.85rem;
          color: #666;
        }

        /* ── Alert ── */
        .alert {
          padding: 0.75rem 1rem;
          border-radius: 10px;
          font-size: 0.875rem;
          margin-bottom: 1.25rem;
          font-weight: 500;
        }
        .alert-error   { background: #fff0f0; border: 1px solid #fca5a5; color: #dc2626; }
        .alert-success { background: #f0fdf4; border: 1px solid #86efac; color: #16a34a; }

        /* ── Form Grid ── */
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.1rem 2rem;
        }
        @media (max-width: 600px) {
          .form-grid { grid-template-columns: 1fr; }
        }

        .field-group label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: #444;
          margin-bottom: 0.3rem;
        }
        .field-input,
        .field-select,
        .field-textarea {
          width: 100%;
          box-sizing: border-box;
          padding: 0.6rem 0.9rem;
          background: #deeef8;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          color: #334155;
          outline: none;
          transition: box-shadow 0.2s;
          font-family: inherit;
        }
        .field-input:focus,
        .field-select:focus,
        .field-textarea:focus {
          box-shadow: 0 0 0 2px rgba(85,179,235,0.4);
        }
        .field-select {
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          padding-right: 2.5rem;
          cursor: pointer;
        }
        .field-textarea {
          resize: none;
          height: 64px;
        }

        /* ── Save Button ── */
        .btn-save {
          margin-top: 1.5rem;
          padding: 0.65rem 2rem;
          background: linear-gradient(135deg, #55B3EB, #3aaeea);
          color: #fff;
          font-weight: 700;
          font-size: 0.9rem;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
        }
        .btn-save:hover   { opacity: 0.9; transform: translateY(-1px); }
        .btn-save:active  { transform: translateY(0); }
        .btn-save:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

        /* ── Email Section ── */
        .email-section {
          margin-top: 2.5rem;
        }
        .email-section h3 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 0.75rem;
        }
        .email-row {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }
        .email-icon {
          width: 32px;
          height: 32px;
          background: #deeef8;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3aaeea;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .email-info strong {
          display: block;
          font-size: 0.88rem;
          color: #1a1a2e;
          font-weight: 600;
        }
        .email-info span {
          font-size: 0.78rem;
          color: #999;
        }
        .add-email-link {
          display: inline-block;
          margin-top: 0.6rem;
          font-size: 0.82rem;
          color: #3aaeea;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
        }
        .add-email-link:hover { text-decoration: underline; }
      `}</style>

      <div className="profile-page">

        {/* ── Profile Header ── */}
        <div className="profile-header">
          <div className="avatar-circle">{initials}</div>
          <div className="profile-header-info">
            <h2>{userData.nama || 'Username'}</h2>
            <p>{userData.email}</p>
          </div>
        </div>

        {/* ── Alerts ── */}
        {error   && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {/* ── Form ── */}
        <form onSubmit={handleSave}>
          <div className="form-grid">

            {/* Full Name */}
            <div className="field-group">
              <label>Full Name</label>
              <input
                type="text" name="nama" value={userData.nama}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="field-input"
              />
            </div>

            {/* Email */}
            <div className="field-group">
              <label>Email</label>
              <input
                type="email" name="email" value={userData.email}
                onChange={handleInputChange}
                placeholder="email@example.com"
                className="field-input"
              />
            </div>

            {/* Username */}
            <div className="field-group">
              <label>Username</label>
              <input
                type="text" name="username" value={userData.username}
                onChange={handleInputChange}
                placeholder="@username"
                className="field-input"
              />
            </div>

            {/* Phone Number */}
            <div className="field-group">
              <label>Phone Number</label>
              <input
                type="tel" name="phone" value={userData.phone}
                onChange={handleInputChange}
                placeholder="08xxxxxxxxxx"
                className="field-input"
              />
            </div>

            {/* Country */}
            <div className="field-group">
              <label>Country</label>
              <select
                name="country" value={userData.country}
                onChange={handleInputChange}
                className="field-select"
              >
                {COUNTRIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Skills */}
            <div className="field-group">
              <label>Skills</label>
              <input
                type="text" name="skills" value={userData.skills}
                onChange={handleInputChange}
                placeholder="Communication, Teamwork, Problem Solving"
                className="field-input"
              />
            </div>

            {/* About */}
            <div className="field-group">
              <label>About</label>
              <textarea
                name="about" value={userData.about}
                onChange={handleInputChange}
                placeholder="UI/UX Designer with a strong interest in creating intuitive and user friendly..."
                className="field-textarea"
              />
            </div>

            {/* Social Media */}
            <div className="field-group">
              <label>Social Media</label>
              <input
                type="text" name="social_media" value={userData.social_media}
                onChange={handleInputChange}
                placeholder="Instagram : @username"
                className="field-input"
              />
            </div>

          </div>

          <button type="submit" disabled={loading} className="btn-save">
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </form>

        {/* ── My email Address ── */}
        <div className="email-section">
          <h3>My email Address</h3>
          <div className="email-row">
            <div className="email-icon">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <div className="email-info">
              <strong>{userData.email || '-'}</strong>
              <span>1 month ago</span>
            </div>
          </div>
          <a className="add-email-link" href="#">+ Add Email Address</a>
        </div>

      </div>
    </>
  );
};

export default Profile;