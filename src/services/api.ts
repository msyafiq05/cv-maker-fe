// request ke backend

const BASE_URL = 'http://127.0.0.1:8000/api';

// ─── Helper: ambil token dari localStorage ───────────────────
function getToken(): string | null {
  return localStorage.getItem('token');
}

// ─── Helper: buat header dengan / tanpa Authorization ────────
function headers(isAuth = true): HeadersInit {
  const h: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (isAuth) {
    const token = getToken();
    if (token) h['Authorization'] = `Bearer ${token}`;
  }
  return h;
}

// ─── Helper: handle response ──────────────────────────────────
async function handleResponse(res: Response) {
  const json = await res.json();
  if (!res.ok) throw json; // lempar error supaya bisa di-catch
  return json;
}

// ================================================================
// AUTH
// ================================================================

export const authApi = {
  register: (data: {
    nama: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
  }) =>
    fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: headers(false),
      body: JSON.stringify(data),
    }).then(handleResponse),

  login: (data: { email: string; password: string }) =>
    fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: headers(false),
      body: JSON.stringify(data),
    }).then(handleResponse),

  logout: () =>
    fetch(`${BASE_URL}/logout`, {
      method: 'POST',
      headers: headers(),
    }).then(handleResponse),

  me: () =>
    fetch(`${BASE_URL}/me`, {
      headers: headers(),
    }).then(handleResponse),

  forgotPassword: (email: string) =>
    fetch(`${BASE_URL}/forgot-password`, {
      method: 'POST',
      headers: headers(false),
      body: JSON.stringify({ email }),
    }).then(handleResponse),

  resetPassword: (data: {
    reset_token: string;
    password: string;
    password_confirmation: string;
  }) =>
    fetch(`${BASE_URL}/reset-password`, {
      method: 'POST',
      headers: headers(false),
      body: JSON.stringify(data),
    }).then(handleResponse),
};

// ================================================================
// PROFILE
// ================================================================

export const profileApi = {
  get: () =>
    fetch(`${BASE_URL}/profile`, { headers: headers() }).then(handleResponse),

  update: (data: Partial<{
    nama: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
  }>) =>
    fetch(`${BASE_URL}/profile`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),
};

// ================================================================
// TEMPLATES
// ================================================================

export const templateApi = {
  getAll: () =>
    fetch(`${BASE_URL}/templates`, { headers: headers(false) }).then(handleResponse),

  getById: (id: number) =>
    fetch(`${BASE_URL}/templates/${id}`, { headers: headers(false) }).then(handleResponse),
};

// ================================================================
// CV PROJECTS
// ================================================================

export const projectApi = {
  getAll: () =>
    fetch(`${BASE_URL}/cv-projects`, { headers: headers() }).then(handleResponse),

  getById: (id: number) =>
    fetch(`${BASE_URL}/cv-projects/${id}`, { headers: headers() }).then(handleResponse),

  create: (data?: { judul_cv?: string; template_id?: number }) =>
    fetch(`${BASE_URL}/cv-projects`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data ?? { judul_cv: 'Untitled Resume' }),
    }).then(handleResponse),

  update: (id: number, data: { judul_cv?: string; template_id?: number }) =>
    fetch(`${BASE_URL}/cv-projects/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  delete: (id: number) =>
    fetch(`${BASE_URL}/cv-projects/${id}`, {
      method: 'DELETE',
      headers: headers(),
    }).then(handleResponse),

  incrementDownload: (id: number) =>
    fetch(`${BASE_URL}/cv-projects/${id}/download`, {
      method: 'POST',
      headers: headers(),
    }).then(handleResponse),
};

// ================================================================
// PERSONAL DETAIL
// ================================================================

export const personalDetailApi = {
  get: (projectId: number) =>
    fetch(`${BASE_URL}/cv-projects/${projectId}/personal-detail`, {
      headers: headers(),
    }).then(handleResponse),

  upsert: (projectId: number, data: Record<string, string>) =>
    fetch(`${BASE_URL}/cv-projects/${projectId}/personal-detail`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),
};

// ================================================================
// EMPLOYMENT HISTORY
// ================================================================

export const employmentApi = {
  getAll: (projectId: number) =>
    fetch(`${BASE_URL}/cv-projects/${projectId}/employments`, {
      headers: headers(),
    }).then(handleResponse),

  create: (projectId: number, data: Record<string, string>) =>
    fetch(`${BASE_URL}/cv-projects/${projectId}/employments`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  update: (projectId: number, id: number, data: Record<string, string>) =>
    fetch(`${BASE_URL}/cv-projects/${projectId}/employments/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  delete: (projectId: number, id: number) =>
    fetch(`${BASE_URL}/cv-projects/${projectId}/employments/${id}`, {
      method: 'DELETE',
      headers: headers(),
    }).then(handleResponse),
};

// ================================================================
// EDUCATION
// ================================================================

export const educationApi = {
  getAll: (projectId: number) =>
    fetch(`${BASE_URL}/cv-projects/${projectId}/educations`, {
      headers: headers(),
    }).then(handleResponse),

  create: (projectId: number, data: Record<string, string>) =>
    fetch(`${BASE_URL}/cv-projects/${projectId}/educations`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  update: (projectId: number, id: number, data: Record<string, string>) =>
    fetch(`${BASE_URL}/cv-projects/${projectId}/educations/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  delete: (projectId: number, id: number) =>
    fetch(`${BASE_URL}/cv-projects/${projectId}/educations/${id}`, {
      method: 'DELETE',
      headers: headers(),
    }).then(handleResponse),
};

// ================================================================
// SKILLS
// ================================================================

export const skillApi = {
  getAll: (projectId: number) =>
    fetch(`${BASE_URL}/cv-projects/${projectId}/skills`, {
      headers: headers(),
    }).then(handleResponse),

  create: (projectId: number, data: Record<string, string>) =>
    fetch(`${BASE_URL}/cv-projects/${projectId}/skills`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  update: (projectId: number, id: number, data: Record<string, string>) =>
    fetch(`${BASE_URL}/cv-projects/${projectId}/skills/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  delete: (projectId: number, id: number) =>
    fetch(`${BASE_URL}/cv-projects/${projectId}/skills/${id}`, {
      method: 'DELETE',
      headers: headers(),
    }).then(handleResponse),
};

// ================================================================
// ORGANIZATIONS
// ================================================================

export const organizationApi = {
  getAll: (projectId: number) =>
    fetch(`${BASE_URL}/cv-projects/${projectId}/organizations`, {
      headers: headers(),
    }).then(handleResponse),

  create: (projectId: number, data: Record<string, string>) =>
    fetch(`${BASE_URL}/cv-projects/${projectId}/organizations`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  update: (projectId: number, id: number, data: Record<string, string>) =>
    fetch(`${BASE_URL}/cv-projects/${projectId}/organizations/${id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
    }).then(handleResponse),

  delete: (projectId: number, id: number) =>
    fetch(`${BASE_URL}/cv-projects/${projectId}/organizations/${id}`, {
      method: 'DELETE',
      headers: headers(),
    }).then(handleResponse),
};

// ================================================================
// ADMIN
// ================================================================

export const adminApi = {
  getDashboardStats: () =>
    fetch(`${BASE_URL}/admin/dashboard-stats`, { headers: headers() }).then(handleResponse),

  getUsers: (search?: string) => {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
    return fetch(`${BASE_URL}/admin/users${query}`, { headers: headers() }).then(handleResponse);
  },

  deleteUser: (id: number) =>
    fetch(`${BASE_URL}/admin/users/${id}`, {
      method: 'DELETE',
      headers: headers(),
    }).then(handleResponse),
};

// ─── Utility: simpan & hapus sesi login ─────────────────────
export const saveSession = (token: string, user: object) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('isLoggedIn', 'true');
};

export const clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('isLoggedIn');
};

export const getUser = () => {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
};
