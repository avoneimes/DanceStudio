import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use(config => { // kiekvienai uzklausai prideda tokena
    const storedUser = localStorage.getItem('user'); // gauna vartotoja is localstorage
    const user = storedUser ? JSON.parse(storedUser) : null;

    // jei yra tokenas, pridedama prie uzklausos headerio
    if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }

    return config;
});

export default API;
