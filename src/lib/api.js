import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // 예: https://odengi-server.onrender.com
    withCredentials: false,
});

// --- 토큰 유틸 ---
let accessToken = localStorage.getItem("accessToken") || null;

const stripQuotes = (s = "") => String(s).trim().replace(/^"(.*)"$/, "$1");
const toBearer = (t = "") => {
    const s = stripQuotes(t);
    return s.startsWith("Bearer ") ? s : `Bearer ${s}`;
};

export function saveToken(token, persist = true) {
    accessToken = stripQuotes(token);
    if (persist) localStorage.setItem("accessToken", accessToken);
    else sessionStorage.setItem("accessToken", accessToken);
}

export function clearToken() {
    accessToken = null;
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("accessToken");
}

export function getToken() {
    return (
        accessToken ||
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken")
    );
}

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = toBearer(token);
    }
    return config;
});

export default api;
