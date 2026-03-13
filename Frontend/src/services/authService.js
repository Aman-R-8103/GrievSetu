import axios from 'axios';

// ─── Configurable API base URL ───────────────────────────────────
// Change this to match your backend server address
const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// ─── Auth API calls ──────────────────────────────────────────────

/**
 * Login with username and password.
 * Backend expects: POST /login  { name: string, password: string }
 * Returns: { message: string, token: string }
 */
export async function loginUser(name, password) {
    const response = await api.post('/login', { name, password });
    return response.data;
}

/**
 * Register a new user.
 * Backend expects: POST /register  { name, email, password, confirm_password }
 * Returns: { message: string }
 */
export async function registerUser(name, email, password, confirm_password) {
    const response = await api.post('/register', { name, email, password, confirm_password });
    return response.data;
}

// ─── Token helpers ───────────────────────────────────────────────

const TOKEN_KEY = 'grievsetu_auth_token';
const USER_KEY = 'grievsetu_user';

export function saveToken(token, username) {
    localStorage.setItem(TOKEN_KEY, token);
    if (username) localStorage.setItem(USER_KEY, username);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getUser() {
    return localStorage.getItem(USER_KEY);
}

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

export function isAuthenticated() {
    return !!getToken();
}
